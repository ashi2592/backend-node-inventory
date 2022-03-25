var express = require('express');
var app = express();
var cors = require('cors')
var bodyParser = require('body-parser')
const routes = require('./routes/routes');
const mongoose = require('mongoose');





// database connect

try{
    mongoose.connect('mongodb://localhost:27017/fashionhubDB',(err,res)=>{
        if(err){
            console.log("Mongo db not connected")
        }
        console.log("DB Connected")
    })
}catch(err){
   
}



const myLogger = function (req, res, next) {
    console.log('LOGGED')
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