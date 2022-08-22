const moment = require('moment');
const { get: _get} = require('lodash');
const { responseSuccess, getData, isTestOrDevEnv, responseError,
    actionEnum, responseInvalidRequestError, responseServiceError } = require('../util');
const { createNewUser } = require('../util/user');
const { sendConfirmMail, sendResetPasswordMail } = require('../util/mail');
const { sign } = require('../util/jwt');
const { hashPassword, encrypt, decrypt } = require('../util/bcrypt');
const { Op, userSetting, user } = require('../database/models');
const {
  CODE_SERVICE_ERROR, STATUS_ACTIVE,
  CODE_PASSWORD_NOT_MATCH, CODE_TOKEN_EXPIRED, CODE_USER_NOT_ACTIVATED
} = require('../../app.const');
const Sentry = require('@sentry/node');
const { v4 } = require('uuid');
require('dotenv').config();
const expireIn = 60 * 60 * 24 * 7; // 24h * 7 = 1 week

exports.createUser = async (req, res) => {
  try {
    console.log('create user');
    const data = req.body;
    const newData = getData(data, actionEnum.CREATE);

    const userRs = await createNewUser(newData.email, newData);

    if (!userRs.isSuccess) {
      return responseInvalidRequestError(res, [userRs.rs]);
    }

    const userObj = userRs.rs;

    await userSetting.create({
      currency: 'usd',
      country: 'us',
      view_rule: '30:3',
      sold_rule: '3:3',
      user_id: userObj.id
    });

    await sendConfirmMail(userObj.email, {
      confirmLink: `${process.env.WEBAPP_URL}/login?ac=${userObj.activation_code}`
    });

    return responseSuccess(res, userObj, {});
  } catch (e) {
    if (isTestOrDevEnv()) {
      console.log(e);
    }
    Sentry.captureException(e);
    return responseServiceError(res, [
      {
        code: CODE_SERVICE_ERROR,
        message: 'error',
      },
    ]);
  }
};

exports.login = async (req, res) => {
  try {
    const userParam = req.user;

    if (! userParam["activated_at"]) {
      return responseInvalidRequestError(res, [{
        code: CODE_USER_NOT_ACTIVATED,
        message: "user not activated"
      }]);
    }

    delete userParam["activated_at"];

    const maxAge = expireIn * 1000;
    const token = await sign(userParam, expireIn);

    return responseSuccess(res, {
      expireIn,
      user: userParam,
      maxAge: maxAge,
      token: token
    }, {});
  } catch (e) {
    if (isTestOrDevEnv()) {
      console.log(e);
    }
    Sentry.captureException(e);
    return responseServiceError(res, [
      {
        code: CODE_SERVICE_ERROR,
        message: "error"
      }
    ]);
  }
};

exports.logout = async (req, res, next) => {
  try {
    return responseSuccess(res, null);
  } catch (err) {
    Sentry.captureException(err);
    responseError(res, 500, {
      message: 'Some error occurred.',
    });
  }
}

exports.activateUser = async (req, res, next) => {
  const activationCode = req.body.ac;

  let userRs = await user.findOne({
    where: {
      activation_code: activationCode,
      status: 1,
    },
  });

  if (userRs) {
    const rs = await user.update({
      activated_at: new Date(),
    }, {
      where: {
        id: userRs.id
      }
    });

    responseSuccess(res, rs);
  } else {
    responseError(res, 500, {
      message: 'Some error occurred.',
    });
  }
}

exports.forgotPassword = async (req, res, next) => {
  try {
    const email = req.body.email;
    if (email) {
      const userObj = await user.findOne({
        where: {
          email: email.toLowerCase().trim(),
          status: 1
        },
        attributes: ["id", "email"],
      });

      console.log('userObj: ', userObj);

      if (userObj) {
        const nowTm = "t_" + (new Date().getTime());
        const encryptTs = encrypt(nowTm);
        const resetCode = v4();
        userObj.setAttributes({
          reset_password_code: resetCode
        });

        await userObj.save();

        console.log('userObj after: ', userObj);

        const resetLink = `${process.env.WEBAPP_URL}/reset-password/${encryptTs}/${resetCode}`;
        await sendResetPasswordMail(userObj.email, {
          resetLink: resetLink
        });

        console.log('sent mail');
      }
    }

    return responseSuccess(res, {
      done: 1
    });
  } catch (err) {
    if (isTestOrDevEnv()) {
      console.log(err);
    }
    Sentry.captureException(err);
    responseError(res, 500, {
      message: 'Some error occurred.',
    });
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    let {password, password2, token} = req.body;
    let checkTmp = 0;
    let tokenArr = token.split('/');
    let resetPassTimestamp = tokenArr[0];
    token = tokenArr[1];
    if (resetPassTimestamp) {
      // check timestamp
      resetPassTimestamp = decrypt(resetPassTimestamp);
      if (resetPassTimestamp) {
        let tmp = resetPassTimestamp.split('_');
        if (tmp.length > 1) {
          checkTmp = tmp[1];
        }
      }

      if (checkTmp) {
        // link valid during 1 day
        if (((new Date().getTime()) - parseInt(checkTmp)) > 86400000) {
          // link is expired
          return responseInvalidRequestError(res, ["code expired"]);
        }
      }
    }

    if (password.length > 0 && password === password2 && token) {
      const data = await user.update({
        password: hashPassword(password),
      }, {
        where: {
          reset_password_code: token,
        }
      });
      responseSuccess(res, data, {});
    } else {
      // fail
      return responseInvalidRequestError(res, ["password not matched"]);
    }
  } catch (err) {
    Sentry.captureException(err);
    responseError(res, 500, {
      message: 'Some error occurred.',
    });
  }
};

exports.getUserInfo = async (req, res, next) => {
  try {
    let userId = null;

    if (req && req['user']) {
      userId = req.user['id'];
    }

    let userRs = await user.findOne({
      attributes: ["name", "email", "is_pro"],
      where: {
        status: 1,
        id: userId
      },
    });

    return responseSuccess(res, userRs);
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(err);
  }
};

exports.checkHealth = async (req, res, next) => {
  responseSuccess(res, true);
}