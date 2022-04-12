
const express = require('express')
const routes = express();
const controller = require('../controller/dashboard')

/**
 * Get All data
 */

routes.get('/top-selling-product', controller.getTopSellingProduct)



module.exports = routes;