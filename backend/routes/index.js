const express = require('express');
const router = express.Router();


const {Auth} = require('./verifyAuth')

/**
 * custome Routes path
 */
const categories = require('./categories');
const types = require('./types');
const sizes = require('./sizes');
const colors = require('./colors');
const products = require('./products');
const variants = require('./variants');
const brands = require('./brands');
const patterns = require('./patterns');
const suppliers = require('./suppliers');
const customers = require('./customers');
const others = require('./others');
const transcation = require('./transcation')
const barcodes = require('./barcodes')
const users = require('./users')
const dashboard = require('./dashboard');
const productLength = require('./productLength');
const purchases = require('./purchases');

const req = require('express/lib/request');



router.get('/', function (req, res, next) {
    res.status(200).send("I am here for you")
})



router.use('/category', Auth, categories);
router.use('/type', Auth, types);
router.use('/size', Auth, sizes);
router.use('/brand', Auth, brands);
router.use('/color', Auth, colors);
router.use('/supplier', Auth, suppliers);
router.use('/customer', Auth, customers);
router.use('/product', Auth, products);
router.use('/other', Auth, others);
router.use('/transcation', Auth, transcation)
router.use('/barcode', Auth, barcodes)
router.use('/user', users)

router.use('/dashboard', Auth, dashboard)
router.use('/product-length', Auth, productLength)
router.use('/variants', Auth, variants)
router.use('/patterns', Auth, patterns)
router.use('/purchases', Auth, purchases)












//export this router to use in our index.js
module.exports = router;