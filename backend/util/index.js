const mongoose = require('mongoose');



const getObjectId = (id = '') =>{
    return mongoose.Types.ObjectId(id);
}

const paginateOptions = (pageNo, Limit=10) =>{
    return {
        page: pageNo,
        limit: Limit,
        collation: {
          locale: 'en',
        },
        sort: {_id:-1}
      };


}

const  ValidateData = async (schema,body) =>{
   
    return new Promise((resolve,reject)=>{
      try{
        const { error, value } = schema.validate(body);
        if(error){
            reject(error)
        }
        resolve(value)
      }
      catch(err){
        reject(err)
      }
    })
   
}

const calculateTax = (price,tax=5)=>{
 return (parseInt(price)*5)/100;
}


module.exports = {
    getObjectId,
    paginateOptions,
    ValidateData,
    calculateTax
}