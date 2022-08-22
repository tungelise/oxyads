const { category: Category } = require('../database/models');

exports.upsertCategory = async (sellerData) => {
  const { ebay_id, name } = sellerData;
  const [seller,] = await Category.findOrCreate({
    where: {
      ebay_id,
    },
    defaults: {
      name,
    }
  });

  return seller.get({ plain: true });
};

exports.findAndCountAll = async (options) => {
  const { page = 1, limit = 100 } = options;

  options.limit = Number.parseInt(limit);
  options.offset = ((page - 1) * options.limit);
  options.order =[
    ['id', 'DESC']
  ];
  delete options.page;

  return  Category.findAndCountAll(options);
};