const cartDao = {};
const { Products, Cart } = require("../models");
const { sequelize } = require("../config/dbConfig")
const Sequelize = require('sequelize');
const { exceptions } = require("../core");
const messages = require("../messages");


cartDao.addToCart = async (params) => {
    try {
        //to check product exists or not
        let productData = await sequelize.query(`Select * from product_data where id = ${params.product_id}`, { type: Sequelize.QueryTypes.SELECT });
        if (productData && productData.length == 0)
            throw exceptions.badRequestError(messages.productDoesNotExists);

        let cartData = await sequelize.query(`
        Select * 
        From user_cart 
        Where product_id = ${params.product_id} And user_id = ${params.user_id}`, { type: Sequelize.QueryTypes.SELECT });

        //to check whether product already exists if so then update quantity
        if (cartData && cartData.length > 0) {
            params.quantity += cartData[0].quantity;
            return await sequelize.query(`
            Update  user_cart 
            Set quantity = ${params.quantity}
            Where product_id = ${params.product_id} and user_id = ${params.user_id}`, { type: Sequelize.QueryTypes.UPDATE });
        }
        else
            return await sequelize.query(`
            Insert into user_cart (product_id,user_id,quantity) 
            values (${params.product_id},${params.user_id},${params.quantity})`, { type: Sequelize.QueryTypes.INSERT });
    } catch (error) {
        throw error;
    }
}

cartDao.listOfProducts = async (params) => {
    try {
        return await sequelize.query(`
        Select pd.name product_name,pd.sku_code code,uc.quantity,pd.price unit_price,Round((uc.quantity * pd.price),2) subtotal
        FROM product_data pd Inner Join  user_cart uc ON pd.id = uc.product_id
        Where user_id = ${params.user_id}; `, { type: Sequelize.QueryTypes.SELECT });
    } catch (error) {
        throw error;
    }
}

cartDao.deleteCartItem = async (params) => {
    try {
        //check whether product exists or not in the cart of the respective user
        let itemData = await sequelize.query(`
        Select * 
        From user_cart
        Where product_id = ${params.product_id} and user_id = ${params.user_id}; `, 
        { type: Sequelize.QueryTypes.SELECT });

        if(itemData && itemData.length == 0)
            throw exceptions.badRequestError(messages.productDoesNotExists);

        await sequelize.query(`
        Delete 
        From user_cart
        Where product_id = ${params.product_id} And user_id = ${params.user_id}; `, 
        { type: Sequelize.QueryTypes.DELETE });
        return messages.productDeleted;
    } catch (error) {
        throw error;
    }
}

cartDao.reportData = async () => {
    try {
        return await sequelize.query(`
        Select uc.product_id,pd.name product_name,pd.sku_code,count(uc.user_id) total_user,sum(uc.quantity) total_quantity
        From product_data pd Inner Join user_cart uc ON pd.id = uc.product_id
        Group By uc.product_id ; `, { type: Sequelize.QueryTypes.SELECT });

    } catch (error) {
        throw error;
    }
}

module.exports = cartDao;