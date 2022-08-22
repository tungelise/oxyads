const { itemStats: ItemStats } = require('../database/models');

exports.createItemStats = async (itemStatsData) => {
  const itemStats = new ItemStats(itemStatsData);
  await itemStats.save();
};

exports.getAll = async (options) => {
  const { page = 1, limit = 100, order } = options;

  options.limit = Number.parseInt(limit);
  options.offset = ((page - 1) * options.limit);
  options.order = order ? [
    ['created_at', 'DESC']
  ]: order;
  delete options.page;

  return ItemStats.findAll(options);
}