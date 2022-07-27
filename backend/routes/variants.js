
const express = require('express')
const routes = express();
const controller = require('../controller/variants')


/**
 * Create new data
 */
routes.post('/', controller.addVariant)
routes.put('/:id', controller.updateVariant)
routes.delete('/:id', controller.deleteVariants)
routes.get('/:productId', controller.getProductVariants)
routes.get('/transcation/:id', controller.getTranscationVariants)
routes.get('/purchase/:id', controller.getPurchaseVariants)




module.exports = routes;