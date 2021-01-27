//= ========================= Load Modules Start =======================

const cartRoute = require("express").Router();
const resHndlr = require("../core/resHandler");
const cartController = require("../controller/cartController");


// ======================== End ======================================== //


cartRoute.route("/add")
    .post(async (req, res) => {
        try {
            const result = await cartController.addToCart(req.body);
            resHndlr.sendSuccessWithMsg(res, result);
        }
        catch (error) {
            resHndlr.sendError(res, error);
        };
    });

cartRoute.route("/list")
    .get(async (req, res) => {
        try {
            const result = await cartController.listOfProducts(req.query);
            resHndlr.sendSuccess(res, result);
        }
        catch (error) {
            resHndlr.sendError(res, error);
        };
    });

cartRoute.route("/delete")
    .delete(async (req, res) => {
        try {
            const result = await cartController.deleteCartItem(req.body);
            resHndlr.sendSuccessWithMsg(res, result);
        }
        catch (error) {
            resHndlr.sendError(res, error);
        };
    });

cartRoute.route("/reportData")
    .get(async (req, res) => {
        try {
            const result = await cartController.reportData();
            resHndlr.sendSuccess(res, result);
        }
        catch (error) {
            resHndlr.sendError(res, error);
        };
    });



// Export modules
module.exports = cartRoute;

