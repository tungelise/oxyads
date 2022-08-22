const { retryPromise } = require('./index');
const { item: Item, watchListItem, Op, jobHistInfo } = require('../database/models');
const { searchKeywords } = require('./search-text');
const { highlightText } = require('./highlight');

exports.upsertItem = async (itemData) => {
  const { ebay_id, ...data } = itemData;
  const now = Date.now();

  let item = await Item.findOne({
    where: {
      ebay_id
    },
    raw: true,
  });

  if (!item) {
    const task = async function() {
      let rs = await Item.create({
        ebay_id,
        ...data,
        last_crawled_at: now,
        updated_at: new Date(),
      });
      rs = rs.get({plain: true});
      return rs;
    }

    item =  await retryPromise(task(), 3, 1000);

  } else {
    Item.update(
      {
        last_crawled_at: now,
        updated_at: new Date(),
        ...data,
      },
      {
        where: {
          id: item.id,
        }
      }
    ).catch();
  }

  return item;
};

exports.updateItemLastItem = async (id, itemData) => {
  await Item.update(
    {
      updated_at: new Date(),
      sold: itemData['sold'],
      views: itemData['views'],
    },
    {
      where: {
        id,
      }
    }
  );
}

exports.getAll = async (options) => {
  const { page = 1, limit = 100 } = options;

  options.limit = Number.parseInt(limit);
  options.offset = ((page - 1) * options.limit);

  /*options.order =[
    ['created_at', 'DESC']
  ];*/
  delete options.page;

  return Item.findAll(options);
}

exports.getAllAndCount = async (options) => {
  const { page = 1, limit = 100 } = options;

  options.limit = Number.parseInt(limit);
  options.offset = ((page - 1) * options.limit);

  /*options.order =[
    ['created_at', 'DESC']
  ];*/
  delete options.page;

  return Item.findAndCountAll(options);
}

exports.getWatchListItems = async (options) => {
  let { keyword, limit = 20, page = 1, userId  } = options;
  limit = Number.parseInt(limit);
  let offset = ((page - 1) * limit);
  let where = {};
  where.name = {
    [Op.like]: `%${keyword}%`,
  }

  return await Item.findAndCountAll({
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
  });
}

exports.updateKeywordOnItemName = async (result) => {
  if (result.length > 0) {
    for (let row of result) {
      console.log('checking ', row.name);
      const keywords = await searchKeywords(row.name);
      let newTitle = row.name;
      if (keywords.length > 0) {
        newTitle = highlightText(row.name, keywords);
      }

      if (newTitle.includes("{{") && newTitle.includes("}}")) {
        console.log('update name ', row.name);
        // update into db
        await Item.update({
          name: newTitle,
        },{
          where: {
            id: row.id
          },
        });
      }
    }
  }
}

exports.count = async (options) => {
  return Item.count(options);
}

exports.getKeywordItemLastId = async (options) => {

  options.limit = 1;
  options.offset = 0;

  delete options.page;

  return Item.findAll(options);
}