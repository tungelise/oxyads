const { get } = require('lodash/get');
const JWT = require('jsonwebtoken');
const { jwtPrivateKey, jwtPublicKey } = require('../../config/jwt');

exports.verify = (token, option) => {
  option = Object.assign(
    {
      algorithm: 'RS256',
    },
    option,
  );
  // no need to specify the algorithm, there is also algorithm in token
  return new Promise((fulfill, reject) => {
    JWT.verify(token, jwtPublicKey, (error, decoded) => {
      if (error) {
        reject(error);
      } else {
        fulfill(decoded);
      }
    });
  });
};

exports.sign = async (payload, expiresIn) => {
  return new Promise((fulfill, reject) => {
    JWT.sign(
      payload,
      jwtPrivateKey,
      {
        algorithm: 'RS256',
        expiresIn: expiresIn,
      },
      (error, token) => {
        if (error) {
          reject(error);
        } else {
          fulfill(token);
        }
      },
    );
  });
};

exports.getToken = (req) => {
  let authorization = null;
  let token = null;
  if (req.query && req.query.token) {
    return req.query.token;
  } else if (req['authorization']) {
    authorization = req['authorization'];
  } else if (req.headers) {
    authorization = req.headers.authorization;
  }
  if (authorization) {
    const tokens = authorization.split('Bearer ');
    if (Array.isArray(tokens) || tokens.length === 2) {
      token = tokens[1];
    }
  }
  return token;
};

exports.getTokenFromCookie = (req) => {
  if (req && req.cookies && req.cookies['token']) {
    return req.cookies['token'];
  }
};

exports.getTokenSocket = (socket) => {
  let token;
  if (get(socket, 'handshake.query') && get(socket, 'handshake.query.token')) {
    return get(socket, 'handshake.query.token');
  }

  const authorization = get(socket, 'handshake.headers.authorization');
  if (authorization) {
    const tokens = authorization.split('Bearer ');
    if (tokens.length === 2) {
      token = tokens[1];
    }
    return token;
  }
};
