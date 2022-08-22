const { userSetting: UserSetting, Op } = require('../database/models');

exports.getAllAndCount = async (options) => {
  const { page = 1, limit = 100 } = options;

  options.limit = Number.parseInt(limit);
  options.offset = ((page - 1) * options.limit);

  delete options.page;

  return UserSetting.findAndCountAll(options);
}

