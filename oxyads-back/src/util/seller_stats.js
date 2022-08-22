const { sellerStats: SellerStats } = require('../database/models');

exports.upsertSellerStats = (sellerStatsData, flagTime) => {
  return SellerStats.findOrCreate({
    where: {
      sellers_id: sellerStatsData.sellers_id,
      created_at: flagTime,
    },
    defaults: sellerStatsData
  })
};