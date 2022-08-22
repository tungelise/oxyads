'use strict';
require('dotenv').config();
const { isNumber } = require('lodash');
const Redis = require('redis');

console.log('parseInt(process.env.REDIS_ACTIVE): ', parseInt(process.env.REDIS_ACTIVE));

let redisClient = null;

if (process.env.REDIS_ACTIVE == 1) {
  const redisConfig = {
    host: process.env.REDIS_HOST,
    port: process.env.REDIST_PORT,
  }
  redisClient = Redis.createClient(redisConfig);
}

module.exports = class RedisHelper {

  static setKey(key, value, exp) {
    const encodedKey = encodeURI(key);

    if (isNumber(exp) && exp > 0) {
      redisClient && redisClient.set(encodedKey, `${value}`, 'EX', parseInt(exp));
    } else {
      redisClient && redisClient.set(encodedKey, `${value}`);
    }
  }

  static hsetKey(key, field, value, exp = 5) {
    const encodedKey = encodeURI(key);
    redisClient && redisClient.hset(encodedKey, field, `${value}`);

    redisClient && redisClient.expire(key, exp);
  }

  static hGetAll(key) {
    return new Promise((resolve, reject) => {
      redisClient && redisClient.hgetall(key, function(err, results) {
        if (err) {
          return reject(err);
        } else {
          return resolve(results);
        }
      });
    })
  }

  static hDel(key, field) {
    redisClient && redisClient.hdel(key, field);
  }

  static lPush(key, value) {
    return new Promise((resolve, reject) => {
      redisClient && redisClient.lpush(key, value, function(err, results) {
        if (err) {
          return reject(err);
        } else {
          return resolve(results);
        }
      });
    })
  }

  static lPop(key, jsonDecode = false) {
    return new Promise((resolve, reject) => {
      redisClient && redisClient.lpop(key, function(err, results) {
        if (err) {
          return reject(err);
        } else {
          const rs = jsonDecode ? JSON.parse(results) : results;
          return resolve(rs);
        }
      });
    });
  }

  static async hincrby(key, field, inc) {
    const appConfig = await RedisHelper.hgetKey(key, field);
    if (appConfig && redisClient) {
      await redisClient.hincrby(key, field, inc);
    }
  }


  static hgetKey(key, field) {
    const encodedKey = encodeURI(key);
    return new Promise((resolve, reject) => {
      redisClient && redisClient.hget(encodedKey, field, function(error, data) {
        if (error) {
          return reject(error);
        }

        return resolve(data);
      });
    });
  }

  static getLivingTime(key) {
    const encodedKey = encodeURI(key);

    return new Promise((resolve, reject) => {
      redisClient && redisClient.ttl(encodedKey, function (err, time) {
        if (err) {
          return reject(err);
        }
        return resolve(time);
      });
    })
  }

  static getKey(key) {
    const encodedKey = encodeURI(key);

    return new Promise((resolve, reject) => {
      redisClient && redisClient.get(`${encodedKey}`, function(err, value) {
        return resolve(value);
      })
    });
  }

  static removeKey(key) {
    const encodedKey = encodeURI(key);

    return new Promise((resolve, reject) => {
      redisClient && redisClient.del(`${encodedKey}`, function(err, value) {
        return resolve(value);
      })
    });
  }


};
