const moment = require('moment');
const { get: _get} = require('lodash');
const { responseSuccess, getData, isTestOrDevEnv, responseError,
  actionEnum, responseInvalidRequestError, responseServiceError } = require('../util');
const ItemUtil = require('../util/item');
const { Op, seller, category, itemStats, item, watchListItem,
        userSeller, bestItem, sequelize } = require('../database/models');

const {
  CODE_SERVICE_ERROR, STATUS_ACTIVE
} = require('../../app.const');

const orderByConst = {
  'a': 'upload_date desc',
  'b': 'upload_date asc',
  'c': 'views asc',
  'd': 'views desc',
  'e': 'sold asc',
  'f': 'sold desc',
};

exports.getAllItem = async (req, res, next) => {
  try {
    let userId = null;
    console.log('req[user]::: ', req['user']);

    if (req && req['user']) {
      userId = req.user['id'];
    }

    let { title, from, to, page, limit = 50, views = [], solds = [],
      category, sortBy, orderBy= "b", type ='items', segment ='' } = req.body;

    console.log(req.body);

    if (orderBy) {
      orderBy = orderByConst[orderBy.trim()];
    }

    const [fromViews, toViews] = views;
    const [fromSold, toSold] = solds;
    const where = {};
    let fromDate, toDate, queryOrderby = 'upload_date', queryOrder = 'asc';
    const offset = (parseInt(page) - 1) * limit;
    const orderArr = orderBy.trim().split(' ');
    if (orderArr.length === 2) {
      queryOrderby = orderArr[0];
      queryOrder = orderArr[1];
    }

    console.log('queryOrderby::: ', queryOrderby, queryOrder);

    if (toViews || toSold) {
      const or = [];
      fromViews && or.push({
        views: {
          [Op.gte]: fromViews,
          [Op.lte]: toViews,
        }
      });
      fromSold && or.push({
        sold: {
          [Op.gte]: fromSold,
          [Op.lte]: toSold,
        }
      });

      if (or.length > 0) {
        where[Op.or] = or;
      }
    }

    if (title) {
        where.name = {
          [Op.like]: `%${title}%`,
        }
    }

    if (parseInt(category)) {
      where.category_id = category;
    }

    if (from && to) {
        fromDate = moment(from, "MM/DD/yyyy").startOf('day').toDate();
        toDate = moment(to, "MM/DD/yyyy").endOf('day').toDate();

        where.upload_date = {
          [Op.gte]: fromDate,
          [Op.lte]: toDate,
        }
    }

    let includes = [];

    switch (type) {
      case 'items':
        includes = [
          {
            model: seller,
            as: 'seller',
            required: true,
            where: {
              isCommon: true,
            },
          },
        ];
        break;
      case 'watchlist':
        includes.push({
          model: watchListItem,
          as: "watchListItems",
          where: {
            userId: userId
          },
          required: true
        });

        includes.push({
          model: seller,
          as: 'seller',
        });
        break;
      case 'bestproduct':
        includes.push({
          model: bestItem,
          as: "bestItems",
          where: {
            userId: userId
          },
          required: true
        });

        let sellerCond = {
          model: seller,
          as: 'seller',
          required: true,
        };

        if (segment === 'prolist') {
          sellerCond = Object.assign({}, sellerCond, {
            include: [
              {
                model: userSeller,
                as: "userSellers",
                where: {
                  active: true,
                  userId: userId
                },
                required: true
              },
            ],
          });
        } else if (segment === 'dashboard') {
          sellerCond = Object.assign({}, sellerCond, {
            where: {
              isCommon: true,
            },
          });
        }

        includes.push(sellerCond);

        break;
      case 'prolist':
        includes.push({
          model: seller,
          as: 'seller',
          required: true,
          include: [
            {
              model: userSeller,
              as: "userSellers",
              where: {
                active: true,
                userId: userId
              },
              required: true
            },
          ],
        });
        break;
      default:
        includes = [
          {
            model: seller,
            as: 'seller',
          },
        ];
        break;
    }

    const { rows, count } = await ItemUtil.getAllAndCount({
      where,
      page,
      include: includes,
      limit,
      offset: offset,
      order: [
        [queryOrderby, queryOrder]
      ],
      raw: true,
      nest: true,
    });

    console.log('total :::', count);

    return responseSuccess(res, {
      data: rows,
      total: count,
    });
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(err);
  }
};

// Getting info of item
exports.getItemInfo = async (req, res, next) => {
  try {
    let userId = null;
    console.log('req[user]::: ', req['user']);

    if (req && req['user']) {
      userId = req.user['id'];
    }

    console.log(req.query);

    const { itemId } = req.query;

    console.log('itemId: ', itemId);

    const where = {};
    const fromDate = moment().startOf('day').toDate();
    const toDate = moment().subtract(30, 'days').startOf('day').toDate();

    where.item_id = itemId;

    /*where.updated_at = {
      [Op.gte]: fromDate,
      [Op.lte]: toDate,
    }*/

    const stats = await itemStats.findAll({
      where,
      limit: 30,
      sort: [
        'updated_at','asc'
      ],
      attributes: ["views", "sold", "available", "updated_at"],
    });

    return responseSuccess(res, {
      stats: stats
    });
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(err);
  }
};

exports.getWatchlists = async (req, res, next) => {
  try {
    let userId = null;
    console.log('req[user]::: ', req['user']);

    if (req && req['user']) {
      userId = req.user['id'];
    }

    const rs = await watchListItem.findAll({
      where: {
        userId: userId
      },
      attributes: ['itemId']
    });

    console.log('rs::', rs);

    return responseSuccess(res, {
      data: rs
    });

    let { keyword, limit = 20, page = 1  } = req.query;

    limit = Number.parseInt(limit);
    let offset = ((page - 1) * limit);

    console.log(req.query);

    let where = {};
    where.name = {
      [Op.like]: `%${keyword}%`,
    }

    const items = await item.findAndCountAll({
      where,
      sort: [
        'updated_at','asc'
      ],
      limit,
      offset,
      include: [
        {
          model: watchListItem,
          as: "watchListItems",
          attributes: ["userId", "itemId"],
          where: {
            userId: userId
          },
          required: true
        },
      ],
      raw: true,
      nest: true,
    });

    if (items) {
      return responseSuccess(res, {
        data: items.rows,
        total: items.count
      });
    } else {
      return responseSuccess(res, {
        data: [],
        total: 0
      });
    }

  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(err);
  }
};

exports.updateWatchlistItem = async (req, res, next) => {
  try {
    let userId = null;
    console.log('req[user]::: ', req['user']);

    if (req && req['user']) {
      userId = req.user['id'];
    }

    console.log(req.body);
    const { itemId, bookmark } = req.body;

    if (itemId) {
      let rs = {};
      if (bookmark) {
        rs = await watchListItem.findOrCreate({
          where: {
            userId,
            itemId
          },
          defaults: {
            userId: userId,
            itemId: itemId
          }
        });
      } else {
        rs = await watchListItem.destroy({
          where: {
            userId,
            itemId
          }
        })
      }

      return responseSuccess(res, rs);
    }
    
    return responseServiceError(res, [
      {
        code: CODE_SERVICE_ERROR,
        message: "error"
      }
    ]);
    
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(err);
  }
};