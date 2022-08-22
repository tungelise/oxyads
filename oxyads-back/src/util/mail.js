const handlebars = require('handlebars');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const smtpTransport = require('nodemailer-smtp-transport');
require('dotenv').config();

exports.sendConfirmMail = async (to, data) => {
  const filePath = path.join(__dirname, '../../data/templates/confirmation_account.html');
  const source = fs.readFileSync(filePath, 'utf-8').toString();
  const template = handlebars.compile(source);
  const htmlToSend = template(data);
  const subject = 'Welcome! Confirm Your Email';

  await sendMail(to, subject, htmlToSend);
};

exports.sendResetPasswordMail = async (to, data) => {
  const filePath = path.join(__dirname, '../../data/templates/reset_password.html');
  const source = fs.readFileSync(filePath, 'utf-8').toString();
  const template = handlebars.compile(source);
  const htmlToSend = template(data);
  const subject = 'Your password reset request\n';

  await sendMail(to, subject, htmlToSend);
};

const sendMail = async (to, subject, body) => {
  return new Promise((resolve, reject) => {
    let transporter = nodemailer.createTransport(smtpTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: process.env.MAIL_PORT,
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      },
    }));

    const mailOptions = {
      from: `"${process.env.MAIL_NAME}" <${process.env.MAIL_USERNAME}>`,
      to: to,
      subject: subject,
      html: body,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject(error);
      } else {
        resolve('');
      }
    });
  });
};

exports.sendMail = sendMail;