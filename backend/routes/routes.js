const express = require('express');
const router = express.Router();
const filehandleRoutes = require('./file-handle')

router.get('/', function (req, res, next) {
    console.log("Router Working");
    res.end();
})

router.use('/api', (req, res, next) => {
    const { type } = req.query;
    req.filename = type ? type : 'category'
    next()
}, filehandleRoutes)


//export this router to use in our index.js
module.exports = router;