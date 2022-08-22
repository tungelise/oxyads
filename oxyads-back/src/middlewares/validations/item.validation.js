const Joi = require('joi').extend(require('@joi/date'));
const { responseError } = require('../../util');

exports.getAllItem = (req, res, next) => {
  const schema = Joi.object({
    // lastId: Joi.number().integer().min(1),
    type: Joi.string().allow('').optional(),
    sortBy: Joi.string().allow('').max(255),
    limit: Joi.number().integer().min(1).max(100).default(50),
    page: Joi.number().integer().min(1).default(1),
    title: Joi.string().allow('').max(255),
    from: Joi.date().format("MM/DD/yyyy"),
    to: Joi.date().format("MM/DD/yyyy"),
    category: Joi.number().allow('').optional(),
    // views: Joi.string().regex(/[0-9]{1,9}-[0-9]{1,9}/).allow('').optional(),
    views: Joi.array().allow('').optional(),
    // solds: Joi.string().regex(/[0-9]{1,9}-[0-9]{1,9}/).allow('').optional(),
    solds: Joi.array().allow('').optional(),
    orderBy: Joi.string().allow('').optional(),
    segment: Joi.string().allow('').optional(),
  });
  const { error } = schema.validate(req.body);

  if (error) {
    return responseError(res, 500, {
      message: error.message || 'Some error occurred.',
    });
  }

  return next();
};
