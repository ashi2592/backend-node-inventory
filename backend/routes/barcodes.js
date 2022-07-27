
const express = require('express')
const routes = express();
const controller = require('../controller/barcodes')


/**
 * Create new data
 */

 routes.post('/', controller.addBarcode)
 routes.put('/:id', controller.updateBarcode)
 routes.get('/', controller.getBarcodes)
 routes.get('/search/:barcode', controller.searchBarcode)
 routes.get('/:barcode', controller.getBarcode)
 routes.delete('/:id', controller.deleteBarcode)



module.exports = routes;