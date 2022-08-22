const Joi = require('joi');
const { randomStr, responseError } = require('../../util');

exports.createUser = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
  });
  const { error } = schema.validate(req.body);

  if (error) {
    responseError(res, 500, {
      message: error.message || 'Some error occurred.',
    });
  }

  return next();
};

exports.login = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(''),
  });
  const { error } = schema.validate(req.body);

  if (error) {
    responseError(res, 500, {
      message: error.message || 'Some error occurred.',
    });
  }

  return next();
};

exports.forgotPassword = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().required(),
  });
  const { error } = schema.validate(req.body);

  if (error) {
    responseError(res, 500, {
      message: 'Some error occurred.',
    });
  }

  return next();
};

exports.resetPassword = (req, res, next) => {
  const schema = Joi.object({
    password: Joi.string().required(''),
    password2: Joi.string().required(''),
    token: Joi.string().required(''),
  });
  const { error } = schema.validate(req.body);

  if (error) {
    responseError(res, 500, {
      message: error.message || 'Some error occurred.',
    });
  }

  return next();
};