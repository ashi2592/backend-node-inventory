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
const barcodes =  require('./barcodes')
const users =  require('./users')
const dashboard =  require('./dashboard')





router.get('/', function (req, res, next) {
    console.log("Router Working");
    res.end();
})

router.use("/",(req,res,next)=>{
    const storeId = req.headers.storeId ? req.headers.storeId :'thefashionhub'
    req.body.storeId = storeId;
    req.query.storeId = storeId;
    req.params.storeId = storeId;
  

    next()
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
router.use('/barcode',barcodes)
router.use('/user', users)
router.use('/dashboard', dashboard)








//export this router to use in our index.js
module.exports = router;