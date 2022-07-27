const bcrypt = require('bcrypt');
const crypto = require('crypto')

/**
 * db Models
 */
const userModel = require('../models/users');
const SessionkeysModel = require('../models/session-key');


/**
 *  user define function and values
 */

const util = require('../util/index');
const ValidationSchema = require('../validtors/index');
const saltRounds = 10;




const login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        let existingdata = await userModel.findOne({ username: username, status: true });
        const passwordMatch = await bcrypt.compareSync(password, existingdata.password);
        if (passwordMatch) {
            let userob = existingdata;

            let response = { username: userob.username, storeId: userob.storeId, store: userob.store, season: userob.season, logo: userob.logo, address: userob.address, mobile: userob.mobile };
            const token = crypto.randomUUID();
            const hashedToken = await bcrypt.hash(token, saltRounds);
            const sObj = new SessionkeysModel({
                userId: userob._id,
                status: true,
                token: hashedToken
            });

            await sObj.save()


            response.token = hashedToken;
            res.status(200).json(response)
        } else {
            res.status(403).json({ message: "Error in login" })
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
            res.status(200).json({ message: "User Create successfully" })
        }
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
}


const logout = async (req, res, next) => {

    try {
        const { token } = req.headers;
        await SessionkeysModel.findOneAndUpdate({ token }, { $set: { status: false } });
        res.status(200).json({message: "User logout from device"})

    } catch (err) {

    }


}

module.exports = {
    addUsers,
    login,
    logout
}