const { getObjectId } = require("../util")

const getCustomerStatsQuery = (id) =>{

    return [
        {
          '$match': {
            'customer._id': getObjectId(id)
          }
        }, {
          '$group': {
            '_id': {
              'customerid': '$customer._id'
            }, 
            'totalTranscation': {
              '$sum': 1
            }, 
            'totalValue': {
              '$sum': '$totalVal'
            }, 
            'totalDiscount': {
              '$sum': '$discount'
            }, 
            'totalCreditAmount': {
              '$sum': '$creditAmount'
            }
          }
        }
      ]
}

module.exports ={
    getCustomerStatsQuery
}