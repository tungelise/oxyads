const { responseSuccess,  } = require('../util');
const CategoryUtil = require('../util/category');

exports.getDiscountItems = async (req, res, next) => {
  try {
    const { page, limit = 50 } = req.body;
    let data = '';

    return responseSuccess(res, {
      data: data,
      total: limit,
    });
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(err);
  }
};