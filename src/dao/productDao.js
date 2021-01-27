const productDao = {};
const { Products } = require("../models");
const {sequelize} = require("../config/dbConfig")
const Sequelize = require('sequelize');


productDao.addProducts = async (params) => {
    try {
        return await Products.bulkCreate(params);
    } catch (error) {
        throw error;
    }
}

productDao.getProducts = async (params) => {
    try {
        let limit = "0,2";
        if(params.page_no){
            let offset = 2*(params.page_no-1);
            limit  = `${offset},2`;
        }
        return await sequelize.query(`Select * From product_data LIMIT ${limit} `,{ type : Sequelize.QueryTypes.SELECT} );
    } catch (error) {
        throw error;
    }
}

module.exports = productDao;