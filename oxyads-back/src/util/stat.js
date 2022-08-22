const { Op, Sequelize } = require('../database/models');

exports.statByDate = async (year, month, fromDay, toDay) => {
  let query = '', dateToSearch = '';

  for (let i = fromDay; i <= toDay; i++) {
    if (i < 10) {
      dateToSearch = year + '-' + month + '-0' + i;
    } else {
      dateToSearch = year + '-' + month + '-' + i;
    }

    query = "INSERT INTO stat_search_2(date_search, nb_search, nb_show_nft)" +
            " select (select ('" + dateToSearch +"')),";
    query += " (SELECT count(*) as nb_search FROM search_hist where created_at <= '" + dateToSearch +" 23:59:59' and created_at >= '" + dateToSearch + " 00:00:01'),";

    await Sequelize.query(query);
  }
}