var BCrypt = require('bcryptjs');
let crypto = require('crypto');

exports.hashPassword = (password) => {
  const salt = BCrypt.genSaltSync(10);
  return BCrypt.hashSync(password, salt);
};

exports.comparePassword = (password, hasPassword) => {
  return BCrypt.compareSync(password, hasPassword);
};

exports.encrypt = (text) => {
  let cipher = crypto.createCipher('aes-256-cbc', process.env.CYPHER_KEY);
  let crypted = cipher.update(text,'utf8','hex')
  crypted += cipher.final('hex');
  return crypted;
};

exports.decrypt = (text) => {
  let decipher = crypto.createDecipher('aes-256-cbc', process.env.CYPHER_KEY);
  let dec = decipher.update(text,'hex','utf8')
  dec += decipher.final('utf8');
  return dec;
};

