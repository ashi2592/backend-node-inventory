
const express = require('express')
const brandRoutes = express();
const controller = require('../controller/brands')


/**
 * Create new data
 */

brandRoutes.post('/', controller.addBrand)



/**
 * Updata data by using Id
 */
brandRoutes.put('/:id', controller.updateBrand)


/**
 * Get All data
 */

brandRoutes.get('/', controller.getBrands)


/**
 * 
 * Get File data with Id
 */

brandRoutes.get('/:id', controller.getBrand)

/**
 * Delete Method
 * 
 * remove data from the existing data
 */

brandRoutes.delete('/:id', controller.deleteBrand)



module.exports = brandRoutes;