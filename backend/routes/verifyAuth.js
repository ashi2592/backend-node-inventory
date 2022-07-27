/**
 * Model
 */

 const SessionkeysModel = require('../models/session-key');
 

const Auth = async (req, res, next) => {
    const { headers } = req;
    const customer = '54887755'
    const contract = 'inventFashion';
    if (headers.customer == customer && headers.contract == contract) {
        const storeId = req.headers.storeid ? req.headers.storeid : '';
        const token = req.headers.token ? req.headers.token : '';

        const tokendata = await SessionkeysModel.findOne({ token });
        if (tokendata) {
            req.body.storeId = storeId;
            req.query.storeId = storeId;
            req.params.storeId = storeId;
            next()
        } else {
            res.status(401).json({ message: 'No Authetication' })
        }

    }
    else {
        res.status(500).json({ message: 'Contact Admin' })
    }

}

module.exports = {Auth}