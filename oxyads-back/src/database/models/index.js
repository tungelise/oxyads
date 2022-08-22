require('dotenv').config();
const path = require('path');
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../../../config/config.js')[env];
const db = {};

let sequelize;
if (config.url) {
  sequelize = new Sequelize(config.url, config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, {
    dialect: config.dialect,
    port: config.port,
    host: config.host,
    logging: config.logging,
  });
}
// sequelize.sync({ force: false });

db.user = require('./user.js')(sequelize, Sequelize);
db.item = require('./item.js')(sequelize, Sequelize);
db.category = require('./category.js')(sequelize, Sequelize);
db.itemStats = require('./items_stats.js')(sequelize, Sequelize);
db.seller = require('./seller.js')(sequelize, Sequelize);
db.sellerStats = require('./seller_stats.js')(sequelize, Sequelize);
db.userSetting = require('./user_setting.js')(sequelize, Sequelize);
db.userSeller = require('./user_seller.js')(sequelize, Sequelize);
db.bestItem = require('./best_item.js')(sequelize, Sequelize);
db.jobHistInfo = require('./job_hist_info.js')(sequelize, Sequelize);
db.serverLoad = require('./server_load.js')(sequelize, Sequelize);
db.processStatus = require('./process_status.js')(sequelize, Sequelize);
db.city = require('./city.js')(sequelize, Sequelize);
db.country = require('./country.js')(sequelize, Sequelize);

for (let [, model] of Object.entries(db)) {
  if (model.associate) {
    model.associate(db);
  }
}
// db['sequelize'] = sequelize;
db.sequelize = sequelize;
// db['Sequelize'] = sequelize;
db.Sequelize = sequelize;
db['Op'] = Sequelize.Op;
// db.Op = sequelize;
module.exports = db;
exports.default = db;