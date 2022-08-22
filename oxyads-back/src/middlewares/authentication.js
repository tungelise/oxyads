require("dotenv").config();
const JWtHelper = require("../util/jwt");
const crypto = require("crypto");
const db = require("../database/models");
// const { Op, userSetting, user } = require('../database/models');
const User = db.user
const Sentry = require("@sentry/node");
const {CODE_SERVICE_ERROR, STATUS_ACTIVE,
  CODE_PASSWORD_NOT_MATCH, CODE_TOKEN_EXPIRED} = require("../../app.const");
const {randomStr, responseSuccess, responseError,
  responseUnauthorizedError, responseInvalidRequestError, redirect,
  responseNotFoundError, responseServiceError} = require("../util");

// authen socket
exports.authSocket = async (socket) => {
  const token = JWtHelper.getTokenSocket(socket);
  if (!token) {
    return Promise.reject(new Error("Authentication failed"));
  }
  // socket["user"] = req.user;
};

exports.loginHandler = (passport) => {
  return function (req, res, next) {
    passport.authenticate("login", async (err, user, info) => {
      try {
        if(err || !user){
          return next(err);
        }
        req.user = user;
        return next();
      } catch (error) {
        return next(error);
      }
    })(req, res, next);
  };
};

exports.isAuth = async (req, res, next) => {
  // return next();
  try {
    const token = JWtHelper.getToken(req);

    console.log('token isAuth: ', token);

    if (!token) {
      return next(new Error("action denied"));
    }

    const data = await JWtHelper.verify(token);

    /*
    const user = await User.findOne({
      where: {
        id: data["id"],
        status: STATUS_ACTIVE
      },
      attributes: ["resetPasswordAt"],
    });

    if (user.resetPasswordAt) {
      const hash = crypto.createHash("md5")
        .update(user.resetPasswordAt.toString())
        .digest("hex");

      if (!data["resetPasswordAt"] || hash !== data["resetPasswordAt"]) {
        return responseUnauthorizedError(res, new Error("Action denied"));
      }
    }*/

    req.user = data;
    res.locals.userName = data ?  data.name : '';

    return next();
  } catch (e) {
    Sentry.captureException(e);
    return next(new Error("action denied"));
  }
};

exports.redirectUnauthorizedToLogin = async (req, res, next) => {
  try {
    const token = JWtHelper.getTokenFromCookie(req);
    if (!token) {
      return redirect(res, process.env.APP_URL + '/login');
    }
    return next();
  } catch (e) {
    Sentry.captureException(e);
    return responseError(res, [
      {
        code: CODE_SERVICE_ERROR,
        message: "error"
      }
    ]);
  }
};

exports.redirectAuthorizedToDashboard = async (req, res, next) => {
  try {
    const token = JWtHelper.getTokenFromCookie(req);
    if (token) {
      return redirect(res, process.env.APP_URL + '/');
    }
    return next();
  } catch (e) {
    Sentry.captureException(e);
    return responseError(res, [
      {
        code: CODE_SERVICE_ERROR,
        message: "error"
      }
    ]);
  }
};

exports.authorizeResetPassword = async (req, res, next) => {
  try {
    const {password, confirmPassword} = req.body;

    if (confirmPassword !== password) {
      return responseInvalidRequestError(res, [{
        code: CODE_PASSWORD_NOT_MATCH,
        message: "password not matched"
      }]);
    }

    const token = JWtHelper.getToken(req);
    if (!token) {
      return next(new Error("Token is required"));
    }
    const decoded = await JWtHelper.verify(token);
    if (!decoded) {
      return responseInvalidRequestError(res, [{
        code: CODE_TOKEN_EXPIRED,
        message: "token expired"
      }]);
    }

    const type = decoded["tokenType"];
    const resetPasswordAt = decoded["resetPasswordAt"];

    if (type !== "resetPassword" || !resetPasswordAt) {
      return responseUnauthorizedError(res, new Error("action denied"));
    }

    const user = await User.findOne({
      where: {
        id: decoded["id"],
      },
      raw: true,
      attributes: ["resetPasswordAt", "id"]
    });

    if (!user) {
      return responseNotFoundError(res, new Error("User not found"));
    }

    if (user.resetPasswordAt && new Date(resetPasswordAt).getTime() < new Date(user.resetPasswordAt).getTime()) {
      return responseUnauthorizedError(res, new Error("action denied"));
    }
    req.user = user;

    next();
  } catch (e) {
    Sentry.captureException(e);
    return responseServiceError(res, [
      {
        code: CODE_SERVICE_ERROR,
        message: "error"
      }
    ]);
  }
};
