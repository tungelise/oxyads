const express = require('express');
const marketController = require('../controllers/market.controller');
const {isAuth} = require('../middlewares/authentication');

const router = express.Router();

router.get('/nfts', [isAuth], marketController.getDiscountItems);

module.exports = router;