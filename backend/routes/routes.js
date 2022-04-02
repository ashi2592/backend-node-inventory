const express = require('express');
const router = express.Router();
const categories = require('./categories');
const types = require('./types');
const sizes = require('./sizes');
const colors = require('./colors');
const products = require('./products');
const brands = require('./brands');
const suppliers = require('./suppliers');
const customers = require('./customers');
const others = require('./others');
const transcation =  require('./transcation')


router.get('/', function (req, res, next) {
    console.log("Router Working");
    res.end();
})

router.use('/category', categories);
router.use('/type', types);
router.use('/size', sizes);
router.use('/brand', brands);
router.use('/color', colors);
router.use('/supplier', suppliers);
router.use('/customer', customers);
router.use('/product', products);
router.use('/other', others);
router.use('/transcation',transcation)





//export this router to use in our index.js
module.exports = router;