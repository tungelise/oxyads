const { item: Item, watchListItem, Op, jobHistInfo } = require('../database/models');

exports.getKeywordItemLastId = async (options) => {
  options.limit = 1;
  options.offset = 0;

  return jobHistInfo.findOne(options);
}

