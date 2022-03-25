
const express = require('express')
const categoryRoutes = express();
const categoriesController = require('../controller/category')


/**
 * Create new data
 */

categoryRoutes.post('/', categoriesController.addCategory)



/**
 * Updata data by using Id
 */
categoryRoutes.put('/:id', categoriesController.updateCategory)


/**
 * Get All data
 */

categoryRoutes.get('/', categoriesController.getCategories)


/**
 * 
 * Get File data with Id
 */

categoryRoutes.get('/:id', categoriesController.getCategory)

/**
 * Delete Method
 * 
 * remove data from the existing data
 */

categoryRoutes.delete('/:id', categoriesController.deleteCategory)



module.exports = categoryRoutes;