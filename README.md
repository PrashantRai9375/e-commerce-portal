# e-commerce-portal
e-commerce
base url -localhost:8000/designHill/assignment/v1/

product creation - localhost:8000/designHill/assignment/v1/product/create
product list - localhost:8000/designHill/assignment/v1/product/list?page_no=?


add cart-localhost:8000/designHill/assignment/v1/cart/add
req body ={
    "product_id":"5",
    "user_id":4,
    "quantity":4
}
cart list-localhost:8000/designHill/assignment/v1/cart/list?user_id=?

cart reportdata - localhost:8000/designHill/assignment/v1/cart/reportData

delete cart item-localhost:8000/designHill/assignment/v1/cart/delete  
req body = {
    "user_id":4,
    "product_id":5
}



env variables  in .env file   -Please create a .env file in the project root directory and add the below variables as it is
NODE_ENV = development
PORT = 8000
DB_NAME = e_commerce
DB_HOST = localhost
DB_PORT = 3306
DB_USER = root
DB_USER_PWD = root

REDIS_DB_INDEX = 1
REDIS_DB_PORT = 6379
REDIS_DB_HOST = localhost

JWT_SECRET_KEY =  SECRETKEY
