//= ========================= Load Modules Start =======================

const resHndlr = require("../core/resHandler");
const { ROUTE_PREFIX } = require("../constants");
const productRoute = require("./productRoute");
const cartRoute = require("./cartRoute");



//= ========================= Export Module Start ==============================

module.exports = function (app) {
  
  app.use(`${ROUTE_PREFIX}product`, productRoute);
  app.use(`${ROUTE_PREFIX}cart`, cartRoute);


  app.use(resHndlr.hndlError);
};

//= ========================= Export Module End ===============================
