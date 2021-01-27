const DataType = require("sequelize");
const {sequelize} = require("../config/dbConfig")

const UserCart = sequelize.define('user_cart', {
  product_id: {
      type: DataType.INTEGER,
  },
  user_id: {
      type: DataType.INTEGER
  },
  quantity: {
      type: DataType.INTEGER
  }
},
    {
        timestamps:false,
        freezeTableName: true,
        indexes: [
            {
                unique: true,
                fields: ['user_id', 'product_id']
            }
        ]
    });

UserCart.sync({ alter: false });
module.exports = UserCart;

