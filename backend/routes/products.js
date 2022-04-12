
const express = require('express')
const routes = express();
const controller = require('../controller/products')


/**
 * Create new data
 */

routes.post('/', controller.addProduct)


routes.get('/search', controller.searchProduct)
routes.get('/barcode/:id', controller.getProductBybarcode)


routes.get('/availiablity', controller.getProductAvailiabity);

/**
 * Updata data by using Id
 */
routes.put('/:id', controller.updateProduct)


/**
 * Get All data
 */

routes.get('/', controller.getProducts)


/**
 * 
 * Get File data with Id
 */

routes.get('/:id', controller.getProduct)

/**
 * Delete Method
 * 
 * remove data from the existing data
 */

routes.delete('/:id', controller.deleteProduct)




module.exports = routes;