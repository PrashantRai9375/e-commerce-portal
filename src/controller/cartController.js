const cartController = {};
const cartDao = require("../dao/cartDao");
const messages = require("../messages");
const { appUtils, redis } = require("../utils");



cartController.addToCart = async (params) => {
    try {
        appUtils.validator({
            container: params,
            fields: [
            { key: 'product_id',trimmed:true,type: 'id'},
            { key: 'user_id', trimmed:true,type: 'id'},
            { key: 'quantity', type: 'id'}
            ]
        });
        params.quantity = (params.quantity && params.quantity > 0)?params.quantity:1;

        await cartDao.addToCart(params);
        return messages.productsAdded;
    } catch (error) {
        throw error;
    }
}

cartController.listOfProducts = async (params) => {
    try {
        appUtils.validator({
            container: params,
            fields: [
            { key: 'user_id', required:true,type: 'id'},
            ]
        });
        let cartData =  await cartDao.listOfProducts(params);
        let grandTotal = cartData.reduce((total,item)=>total += item.subtotal ,0);
        return {cartData, grandTotal};
    } catch (error) {
        throw error;
    }
}

cartController.deleteCartItem = async (params) => {
    try {
        appUtils.validator({
            container: params,
            fields: [
            { key: 'user_id', required:true,type: 'id'},
            { key: 'product_id', required:true,type: 'id'}
            ]
        });
        return await cartDao.deleteCartItem(params);
    } catch (error) {
        throw error;
    }
}

cartController.reportData = async () => {
    try {
        return await cartDao.reportData();
    } catch (error) {
        throw error;
    }
}


module.exports = cartController;