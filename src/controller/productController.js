const productController = {};
const productDao = require("../dao/productDao");
const messages = require("../messages");
const { appUtils } = require("../utils");
const fs = require('fs').promises;
const path = require('path');


productController.addProducts = async () => {
    try {
        let filePath = path.resolve(__dirname, '../../products.json');
        let data =await fs.readFile(filePath); 
      
        let productData = JSON.parse(data.toString());
        let finalProducts = [];
        if(productData && productData.length>0){
            productData.forEach(element => {
                let productObj = {};
                productObj.id = element.productId;
                productObj.name = element.productName;
                productObj.sku_code = element.skuCode;
                productObj.price = element.price;
                //for validating each object in the file
                appUtils.validator({
                    container: productObj,
                    fields: [
                    { key: 'id',required:true,type: 'id'},
                    { key: 'name', trimmed:true,type: 'string'},
                    { key: 'sku_code',required:true, type: 'string'},
                    { key: 'price', required:true,type: 'number'},
                    ]
                });
                finalProducts.push(productObj);
            });
            await productDao.addProducts(finalProducts);
            return messages.productsAdded;
        } 
        else
        return "irrelevant or empty data in the file";
       
    } catch (error) {
        throw error;
    }
}

productController.getProducts = async (params) => {
    try {
        appUtils.validator({
            container: params,
            fields: [
                { key: 'page_no', type: 'id' }
            ]
        });
        return await productDao.getProducts(params);
    } catch (error) {
        throw error;
    }
}


module.exports = productController;