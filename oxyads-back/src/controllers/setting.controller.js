const moment = require('moment');
const { get: _get} = require('lodash');
const { responseSuccess,  } = require('../util');
const ItemUtil = require('../util/item');
const { Op, userSetting } = require('../database/models');

// Getting of user
exports.getSetting = async (req, res, next) => {
  try {
    let userId = null;
    console.log('req[user]::: ', req['user']);

    if (req && req['user']) {
      userId = req.user['id'];
    }

    console.log(req.body);

    const setting = await userSetting.findOne({ where: {
      user_id: userId
    }});

    return responseSuccess(res, {
      setting
    });
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(err);
  }
};

// update setting of user
exports.updateSetting = async (req, res, next) => {
  try {
    let userId = null;
    console.log('req[user]::: ', req['user']);

    if (req && req['user']) {
      userId = req.user['id'];
    }

    console.log(req.body);
    const { currency, country, view_rule, sold_rule} = req.body;

    const a = await userSetting.findOne({ where: {
      user_id: userId
    }});

    let setting;

    if (a) {
      setting = await userSetting.update({
        currency,
        country,
        view_rule,
        sold_rule,
      },{
        where: {
          user_id: userId
        },
      });
    } else {
      setting = await userSetting.create({
        currency,
        country,
        view_rule,
        sold_rule,
        user_id: userId
      });
    }

    return responseSuccess(res, {
      setting
    });
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(err);
  }
};