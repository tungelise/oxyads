const crypto = require('crypto');
const {Strategy} = require('passport-local');
const db = require('../database/models');
const User = db.user;
const {
  STATUS_ACTIVE,
} = require('../../app.const');
const {comparePassword} = require('./bcrypt');
const Sentry = require('@sentry/node');

exports.initPassportLocal = (passport) => {
  passport.use("login", new Strategy({
    usernameField: "email",
    passwordField: "password"
  }, async (email, password, done) => {
    try {
      email = email.trim().toLowerCase();
      const user = await User.findOne({
        where: {
          email,
          status: STATUS_ACTIVE,
        },
        attributes: ["id", "name", "password", "activated_at"]
      });

      if(!user){
        return done(new Error("User not found"), false);
      }

      const validate = await user.comparePassword(password);

      if(!validate ){
        // return done(new Error("Wrong Password"), false);
        // not show clear message
        return done(new Error("invalid"), false);
      }

      /*if (user.resetPasswordAt) {
        user.resetPasswordAt = crypto.createHash("md5").update(String(user.resetPasswordAt)).digest("hex");
      }*/

      delete user.dataValues.password;
      return done(null, user.dataValues);
    } catch (error) {
      Sentry.captureException(error);
      console.log(email, password);
      return done(error);
    }
  }));
};