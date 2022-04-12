const userModel = require('../models/users');
const util = require('../util/index');
const ValidationSchema = require('../validtors/index');
const bcrypt = require('bcrypt');
const saltRounds = 10;


const login = async (req, res, next) => {
    try {
        const { username, password} = req.body;
        let existingdata = await userModel.findOne({username:username,status: true});
        const passwordMatch = await bcrypt.compareSync(password,existingdata.password);
        if(passwordMatch)
        {
            let userob = existingdata;
            delete userob.password;
            delete userob._id;
            res.status(200).json({username: userob.username, storeId:userob.storeId})
        }else{
            res.status(403).json({message:"Invalid User"})
        }

        
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
}



const addUsers = async (req, res, next) => {
    try {
        const reqBody = req.body;
        const value = await util.ValidateData(ValidationSchema.userSchema, reqBody);
        if (value) {
            let modelObj = new userModel(reqBody);
            modelObj.password = await bcrypt.hash(modelObj.password, saltRounds);
            modelObj.status = true;
            await modelObj.save();
            res.status(200).json({message:"User Create successfully"})
        }
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
}



module.exports = {
    addUsers,
    login
}