
const express = require('express')
const routes = express();
const controller = require('../controller/barcodes')


/**
 * Create new data
 */

routes.post('/', controller.addBarcode)



/**
 * Updata data by using Id
 */
routes.put('/:id', controller.updateBarcode)


/**
 * Get All data
 */

routes.get('/', controller.getBarcodes)


/**
 * 
 * Get File data with Id
 */

routes.get('/:id', controller.getBarcode)

/**
 * Delete Method
 * 
 * remove data from the existing data
 */

routes.delete('/:barcode', controller.deleteBarcode)



module.exports = routes;