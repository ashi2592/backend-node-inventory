
const express = require('express')
const routes = express();
const controller = require('../controller/customers')


/**
 * Create new data
 */

routes.post('/', controller.addCustomer)



/**
 * Updata data by using Id
 */
routes.put('/:id', controller.updateCustomer)


/**
 * Get All data
 */

routes.get('/', controller.getCustomers)

routes.get('/stats/:id', controller.getCustomerStats)


/**
 * 
 * Get File data with Id
 */

routes.get('/:id', controller.getCustomer)


/**
 * Delete Method
 * 
 * remove data from the existing data
 */

routes.delete('/:id', controller.deleteCustomer)



module.exports = routes;