
const express = require('express')
const routes = express();
const controller = require('../controller/patterns')


/**
 * Create new data
 */

routes.post('/', controller.addPattern)



/**
 * Updata data by using Id
 */
routes.put('/:id', controller.updatePattern)


/**
 * Get All data
 */

routes.get('/', controller.getPatterns)


/**
 * 
 * Get File data with Id
 */

routes.get('/:id', controller.getPattern)

/**
 * Delete Method
 * 
 * remove data from the existing data
 */

routes.delete('/:id', controller.deletePattern)



module.exports = routes;