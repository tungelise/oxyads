const omitBy = require('lodash/omitBy');
const isNill = require('lodash/isNil');
const {
  CODE_SERVICE_ERROR, STATUS_ACTIVE,
  CODE_PASSWORD_NOT_MATCH, CODE_TOKEN_EXPIRED,
} = require('../../app.const');
const { hashPassword } = require('./bcrypt');
const { v4 } = require('uuid');
require("dotenv").config();

const actionEnum = {
  CREATE: 'create',
  UPDATE: 'update',
};

exports.actionEnum = actionEnum;

function waitFor(ms){
  return new Promise(resolve => setTimeout(resolve, ms))
}

exports.randomStr = (length) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result.toUpperCase();
};

exports.responseSuccess = (res, data, extra) => {
  const result = {};

  if (data) {
    result['result'] = data;
  }

  Object.assign(result, extra);
  return res.status(200).json(result);
};

exports.responseError = (res, code, error) => {
  const result = {};
  if (error) {
    result['errors'] = [error];
  }
  return res.status(code).json(result);
};

exports.responseUnauthorizedError = (res, error) => {
  const result = {};
  if (error) {
    result['errors'] = [error];
  }
  return res.status(403).json(result);
};

exports.responseInvalidRequestError = (res, errors) => {
  return res.status(400).json({
    errors: errors,
  });
};

exports.responseNotFoundError = (res, error) => {
  const result = {};
  if (error) {
    result['errors'] = [error];
  }
  return res.status(404).json(result);
};

exports.responseServiceError = (res, errors) => {
  return res.status(500).json({
    errors: errors,
  });
};

exports.getData = (data, action) => {
  if (action === actionEnum.UPDATE) {
    delete data.email;
  } else if (action === actionEnum.CREATE) {
    data.activation_code = v4();
    // TODO: add activation expire at
  }

  if (data.email) {
    data.email = data.email.trim().toLowerCase();
  }

  if (data.name) {
    data.name = data.name.trim().toLowerCase();
  }

  if (data.password) {
    data.password = hashPassword(data.password);
  }

  data['status'] = STATUS_ACTIVE;

  return omitBy(data, isNill);
};

exports.isTestOrDevEnv = () => {
  return (process.env.NODE_ENV === "dev" 
    || process.env.NODE_ENV === "development"
    || process.env.NODE_ENV === 'test');
};

exports.redirect = (res, url) => {
  return res.redirect(url);
};

const retryPromise = async (promise, nthTry, delayTime) => {
  try {
    return await promise;
  } catch (e) {
    if (nthTry === 1) {
      return Promise.reject(e);
    }

    await waitFor(1000);

    return retryPromise(promise, nthTry - 1, delayTime);
  }
}

exports.retryPromise = retryPromise;

exports.createSimpleArray = (elemMax) => {
  let rs = [];
  if (elemMax > 0) {
    for (let i = 0; i < elemMax; i++) {
      rs.push(i);
    }
  }

  return rs;
}

exports.getCheckDigit = (num) => {
  const weights = [8, 6, 4, 2, 3, 5, 9, 7];
  const numArr = Array.from(String(num), Number);
  let sum = 0;
  numArr.forEach((n, i) => sum = sum + (n * weights[i]));
  sum = 11 - (sum % 11);
  if (sum == 10) sum = 0;
  else if (sum == 11) sum = 5;
  return sum;
}

exports.makeid = (length) => {
  let result           = '';
  // let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let charactersLength = characters.length;
  for ( let i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() *
      charactersLength));
  }
  return result;
}

exports.getCountry = (countries, c) => {
  if (c['countryCode']) {
    for (let item of countries) {
      if (item['country_code'].toUpperCase() === c['countryCode'].toUpperCase()) {
        return item;
      }
    }
  }

  return null;
}

exports.getZipcode = (zipcodes, c) => {
  let rs = [];
  if (c['shipping_address'] && c['state']) {
    for (let item of zipcodes) {
      if (item['city'].toUpperCase() === c['shipping_address'].toUpperCase()
          && item['state'].toUpperCase() === c['state'].toUpperCase()) {
            rs.push(item);
      }
    }
  }

  return rs;
}

const delay = ms => new Promise(res => setTimeout(res, ms));
exports.delay = delay;

