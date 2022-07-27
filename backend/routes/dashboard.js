
const express = require('express')
const routes = express();
const controller = require('../controller/dashboard')

/**
 * Get All data
 */

routes.get('/top-selling-product', controller.getTopSellingProduct)
routes.get('/day-wise-sale', controller.getDayWiseTranscation)
routes.get('/month-wise-sale', controller.getMonthWiseTranscation)
routes.get('/product-count', controller.getCategoryWiseCount)
routes.get('/stats', controller.getDayWiseTranscation)






module.exports = routes;