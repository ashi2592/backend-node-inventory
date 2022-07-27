
const express = require('express')
const routes = express();
const controller = require('../controller/productLength')


/**
 * Create new data
 */

routes.post('/', controller.addLength)



/**
 * Updata data by using Id
 */
routes.put('/:id', controller.updateLenght)


/**
 * Get All data
 */

routes.get('/', controller.getLengths)


/**
 * 
 * Get File data with Id
 */

routes.get('/:id', controller.getLength)

/**
 * Delete Method
 * 
 * remove data from the existing data
 */

routes.delete('/:id', controller.deleteLength)



module.exports = routes;