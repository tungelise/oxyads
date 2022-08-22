const express = require('express');
const { getAllItem } = require("../middlewares/validations/item.validation");
const itemController = require('../controllers/item.controller');
const {isAuth} = require('../middlewares/authentication');

const router = express.Router();
router.post('/items', [isAuth, getAllItem], itemController.getAllItem);
router.get('/item-info', [isAuth], itemController.getItemInfo);
router.get('/watchlist', [isAuth], itemController.getWatchlists);
router.post('/watchlist', [isAuth], itemController.updateWatchlistItem);

module.exports = router;