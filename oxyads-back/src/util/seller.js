const { retryPromise } = require('./index');
const { seller: Seller} = require('../database/models');

exports.upsertSeller = async (sellerData) => {
  const { ebay_id, ...data } = sellerData;

  const task = async function() {
    const [seller,] = await Seller.findOrCreate({
      where: {
        ebay_id,
      },
      defaults: data
    });

    return seller.get({ plain: true });
  };


  return await retryPromise(task(), 3, 1000);
  //
  //   let seller = await Seller.findOne({
  //   where: {
  //     ebay_id: sellerData.ebay_id,
  //   },
  //   attributes: ['id', 'country', 'updated_at'],
  // });
  //
  // if (!seller) {
  //   seller = new Seller(sellerData);
  //   await seller.save();
  // } else {
  //   const lastUpdatedAt = new Date(seller.updated_at);
  //   if (Date.now() - lastUpdatedAt.getTime() <= 60 * 60 * 1000) {
  //     return seller.dataValues;
  //   }
  //
  //   seller.setAttributes({
  //     country: sellerData.country,
  //     updated_at: new Date(),
  //   });
  //   await seller.save();
  // }
  //
  // return seller.dataValues;
};