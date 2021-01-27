//= ========================= Load Modules Start =======================

const productRoute = require("express").Router();
const resHndlr = require("../core/resHandler");
const productController = require("../controller/productController");


// ======================== End ======================================== //


productRoute.route("/create")
    .post(async (req, res) => {
        try {
            const result = await productController.addProducts();
            resHndlr.sendSuccessWithMsg(res, result);
        }
        catch (error) {
            resHndlr.sendError(res, error);
        };
    });

productRoute.route("/list")
    .get(async (req, res) => {
        try {
            const result = await productController.getProducts(req.query);
            resHndlr.sendSuccess(res, result);
        }
        catch (error) {
            resHndlr.sendError(res, error);
        };
    });




// Export modules
module.exports = productRoute;

