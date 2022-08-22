const {
  CODE_SERVICE_ERROR, STATUS_ACTIVE, STATUS_DELETED, STATUS_TEMP,
  CODE_PASSWORD_NOT_MATCH, CODE_TOKEN_EXPIRED, 
  CODE_USER_EXISTED, STATUS_USER_ADMIN
} = require('../../app.const');
const db = require('../database/models');
const User = db.user;
const { Op } = require('sequelize');
const Sentry = require('@sentry/node');

exports.getUserInfo = async (userId) => {
  const user = await User.findOne({
    attributes: ["id", "name"],
    where: {
      id: userId,
      status: 1,
    }
  });

  console.log('user : ', user);

  return user;
};

exports.createTempUser = async (email, name, type) => {
  // TODO: send mail invitation
  if (type === 'invitaion') {

  }
  
  return await User.create({
    name: name,
    email: email,
    password: 'default_password',
    status: STATUS_TEMP,
    created_at: new Date(),
  });
};

exports.createNewUser = async (email, userData) => {
  const query = {
    [Op.and]: [
      {
        email: {
          [Op.like]: email,
        },
      },
    ],
  };

  const user = await User.findOne({
    where: query,
    attributes: ['id', 'status'],
  });

  if (user && (user.status === STATUS_ACTIVE
    || user.status === STATUS_DELETED)) {
    return {
      isSuccess: false,
      user: user,
      rs: {
        code: CODE_USER_EXISTED,
        message: 'user existed',
      },
    };
  }

  let customer = null;
  if (!user) {
    customer = await User.create(userData);
  } else if (user.status === STATUS_TEMP) {
    const nbRecordUpdated = await User.update(userData, {
      where: {
        email: email,
      },
    });

    if (nbRecordUpdated > 0) {
      customer = await User.findOne({
        where: {
          email: email,
        }
      });
    }
  }

  console.log('customer : ---', customer);

  return {
    isSuccess: true,
    rs: customer,
  };
};