
const express = require('express')
const routes = express();
const controller = require('../controller/purchases')


/**
 * Create new data
 */

routes.post('/', controller.addPurchaseTranscation);
routes.get('/', controller.getPurchasedTransactions);
routes.get('/:id', controller.getPurchasedbyId)
routes.put('/cancel/:id', controller.cancelPuchaseTransctionstatus)
routes.put('/confirm/:id', controller.confirmPuchaseTransctionstatus);
routes.put('/purchase-product/:id',controller.updatePurchasePrice)

module.exports = routes;