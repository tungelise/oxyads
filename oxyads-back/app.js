require("dotenv").config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const bodyParser = require("body-parser");
const Sentry = require("@sentry/node");
const passport = require('passport');
const {initPassportLocal} = require('./src/util/auth');
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'ejs');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

initPassportLocal(passport);

// Route
const itemRoutes = require("./src/routes/item.route");
const categoryRoutes = require("./src/routes/category.route");
const settingRoutes = require("./src/routes/setting.route");
const sellerRoutes = require("./src/routes/seller.route");
const userRoutes = require("./src/routes/user.route");
const marketRoutes = require("./src/routes/market.route");
const videoRoutes = require("./src/routes/video.route");
const nftRoutes = require("./src/routes/nft.route");

app.use(itemRoutes);
app.use(categoryRoutes);
app.use(settingRoutes);
app.use(sellerRoutes);
app.use(userRoutes);
app.use(marketRoutes);
app.use(videoRoutes);
app.use(nftRoutes);

Sentry.init({
  dsn: process.env.SENTRY_API_DNS,
  tracesSampleRate: 1.0,
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
