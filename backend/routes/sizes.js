
const express = require('express')
const sizeRoutes = express();
const sizeController = require('../controller/sizes')


/**
 * Create new data
 */

sizeRoutes.post('/', sizeController.addSize)



/**
 * Updata data by using Id
 */
sizeRoutes.put('/:id', sizeController.updateSize)


/**
 * Get All data
 */

sizeRoutes.get('/', sizeController.getSizes)


/**
 * 
 * Get File data with Id
 */

sizeRoutes.get('/:id', sizeController.getSize)

/**
 * Delete Method
 * 
 * remove data from the existing data
 */

sizeRoutes.delete('/:id', sizeController.deleteSize)



module.exports = sizeRoutes;