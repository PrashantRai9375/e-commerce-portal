


const constants = require("../constants");
const jwtHandler = require("../core/jwtHandler");
const exceptions = require("../core/customExceptions");
const messages = require("../messages");
const redisClient = require("../utils/redis");
const { ROLES } = require("../constants");




// This function is used to authenticate and authorize token
const authenticateAndAuthorizeToken = (authorizedRoles = [ROLES.INSTRUCTOR,ROLES.STUDENT]) => {
  return async function (req, res, next) {
    try {

      const jwtToken = req.get("Authorization");
      req.user = await jwtHandler.verifyToken(jwtToken);

      
      if (authorizedRoles.includes(req.user.role)) {
        const userData = await redisClient.getValue(`user_${req.user.id}`);
        let userDetails = JSON.parse(userData);
        if (userDetails.status != constants.STATUS.ACTIVE)
          throw exceptions.unAuthenticatedAccess(messages.inactiveAccount);
        next();
      }
      else
        throw exceptions.forbiddenAccess(messages.forbiddenAccess)
    } catch (e) {
      next(e);
    }
  }
};


module.exports = {
  authenticateAndAuthorizeToken,
};


