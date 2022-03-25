
const express = require('express')
const routes = express();
const controller = require('../controller/colors')


/**
 * Create new data
 */

routes.post('/', controller.addColor)



/**
 * Updata data by using Id
 */
routes.put('/:id', controller.updateColor)


/**
 * Get All data
 */

routes.get('/', controller.getColors)


/**
 * 
 * Get File data with Id
 */

routes.get('/:id', controller.getColor)

/**
 * Delete Method
 * 
 * remove data from the existing data
 */

routes.delete('/:id', controller.deleteColor)



module.exports = routes;