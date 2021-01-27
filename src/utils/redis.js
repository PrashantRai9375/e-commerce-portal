

const Promise = require("bluebird");
const dbConfig = require("../config/dbConfig");
const redisClient = dbConfig.client;
const redis = Promise.promisifyAll(redisClient);



const setValue = async function (key, value) {
  try {
    return await redisClient.setAsync(key, value);
  } catch (e) {
    throw e;
  }
};

const getValue = async function (key) {
  try {
    return await redisClient.getAsync(key);
  } catch (e) {
    throw e;
  }
};

const deleteKey = async function (key) {
  try {
    return await redisClient.delAsync(key);
  } catch (e) {
    throw e;
  }
};

const setJWTToken = function (user) {
  const userTokenKey = user.token;
  const userTokenId = user.id;
  const saveUsrTknPrms = setValue(userTokenKey, userTokenId);

  const key = `user_${user.id}`;
  const value = user;
  const cacheToken = JSON.stringify(value);

  console.log(key, cacheToken, "RedisSvaedData");
  const saveUsrData = setValue(key, cacheToken);
  return saveUsrData;

};


module.exports = {
  setJWTToken,
  setValue,
  getValue,
  deleteKey,
};

