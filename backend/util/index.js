const mongoose = require('mongoose');


const getObjectId = (id = '') =>{
    return mongoose.Schema.Types.ObjectId(id);
}

const paginateOptions = (pageNo, Limit=10) =>{
    return {
        page: pageNo,
        limit: Limit,
        collation: {
          locale: 'en',
        },
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

module.exports = {
    getObjectId,
    paginateOptions,
    ValidateData
}