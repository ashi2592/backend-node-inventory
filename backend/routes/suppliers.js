
const express = require('express')
const routes = express();
const controller = require('../controller/suppliers')


/**
 * Create new data
 */

routes.post('/', controller.addSupplier)



/**
 * Updata data by using Id
 */
routes.put('/:id', controller.updateSupplier)


/**
 * Get All data
 */

routes.get('/', controller.getSuppliers)


/**
 * 
 * Get File data with Id
 */

routes.get('/:id', controller.getSupplier)

/**
 * Delete Method
 * 
 * remove data from the existing data
 */

routes.delete('/:id', controller.deleteSupplier)



module.exports = routes;