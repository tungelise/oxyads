const Joi = require('joi').extend(require('@joi/date'));
const { responseError } = require('../../util');

exports.getAllCategory = (req, res, next) => {
  const schema = Joi.object({
    page: Joi.number().integer().min(1).default(1),
  });
  const { error } = schema.validate(req.query);

  if (error) {
    return responseError(res, 500, {
      message: error.message || 'Some error occurred.',
    });
  }

  return next();
};
