var express = require('express');
var app = express();
var cors = require('cors')
var bodyParser = require('body-parser')
const routes = require('./routes');
const mongoose = require('mongoose');


try{
    mongoose.connect('mongodb://root1:dogmeatsubparflavour1337@54.157.108.209:27017/fashionhubDB?authSource=admin',(err)=>{
        if(err){
            console.log("Mongo db not connected",err)
        }
        console.log("DB Connected")
    })
}catch(err){
   
}



const myLogger = function (req, res, next) {
    console.log('LOGGED', new Date())
    next()
}
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
app.use(cors())
app.use(myLogger)
app.use(routes)

app.listen(3001, () => {
    console.log("Server is listing", 3001)
})