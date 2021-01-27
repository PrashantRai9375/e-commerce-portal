const DataType = require("sequelize");
const {sequelize} = require("../config/dbConfig")

const Products = sequelize.define('product_data', {
    name: {
        type:DataType.STRING,
    },
    sku_code: {
        type: DataType.STRING
    },
    price: {
        type: DataType.FLOAT
    }
},
    {
        timestamps: false,
        underscored: true,
        freezeTableName: true
    });

Products.sync({alter:false});
module.exports = Products;

