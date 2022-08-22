const Joi = require('joi').extend(require('@joi/date'));
const { responseError } = require('../../util');
const { CRAWL_TYPE } = require('../../../config/constant');

exports.getLinks = (req, res, next) => {
  const schema = Joi.object({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(50),
  });
  const { error } = schema.validate(req.query);

  if (error) {
    return responseError(res, 500, {
      message: error.message || 'Some error occurred.',
    });
  }

  return next();
};

exports.create = (req, res, next) => {
  const schema = Joi.object({
    linkOrSellerId: Joi.string().required(),
    ignore_size: Joi.boolean().required(),
    type: Joi.string().valid(...Object.values(CRAWL_TYPE)).required()
  });
  const { error } = schema.validate(req.body);

  if (error) {
    return responseError(res, 500, {
      message: error.message || 'Some error occurred.',
    });
  }

  return next();
};
