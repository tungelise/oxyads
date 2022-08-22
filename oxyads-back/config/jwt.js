const Path = require('path');
const FS = require('fs');

exports.jwtPublicKey = FS.readFileSync(
  Path.resolve(__dirname, "..", "config", "cert", "jwt256.key.pub"),
  "utf8"
);

exports.jwtPrivateKey = FS.readFileSync(
  Path.resolve(__dirname, "..", "config", "cert", "jwt256.key"),
  "utf8"
);
