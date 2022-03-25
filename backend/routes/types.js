
const express = require('express')
const routes = express();
const controller = require('../controller/types')


/**
 * Create new data
 */

routes.post('/', controller.addType)



/**
 * Updata data by using Id
 */
routes.put('/:id', controller.updateType)


/**
 * Get All data
 */

routes.get('/', controller.getTypes)


/**
 * 
 * Get File data with Id
 */

routes.get('/:id', controller.getType)

/**
 * Delete Method
 * 
 * remove data from the existing data
 */

routes.delete('/:id', controller.deleteType)



module.exports = routes;