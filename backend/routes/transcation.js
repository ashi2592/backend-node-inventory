
const express = require('express')
const routes = express();
const controller = require('../controller/transcation')


/**
 * Create new data
 */

routes.post('/', controller.addTranscation);

routes.put('/status/:id', controller.updateTransctionstatus);
routes.put('/return-product/:id', controller.refundProductTranscation);






// /**
//  * Updata data by using Id
//  */
// routes.put('/:id', controller.updateOther)


// /**
//  * Get All data
//  */

routes.get('/', controller.getTransactions)


// /**
//  * 
//  * Get File data with Id
//  */

routes.get('/:id', controller.getTransaction)

// /**
//  * Delete Method
//  * 
//  * remove data from the existing data
//  */

// routes.delete('/:id', controller.deleteOthes)



module.exports = routes;