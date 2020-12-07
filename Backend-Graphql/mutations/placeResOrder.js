const Orders = require('../models/OrdersModel')

const placeResOrder = async (args) => {
    console.log(args)
        let result = await Orders.findOneAndUpdate({cusID: args.cusID, resID: args.resID, orderPlaced: "NO"}, {
             ordermode: args.ordermode,
             orderstatus: args.orderstatus,
             orderPlaced: "YES"
        })    
        // console.log(result)
        if (result){                
                return{status: 200, message: "ORDER_PLACED"}
            } else {
                return{status: 200, message: "Not Updated"}
            }
}

exports.placeResOrder = placeResOrder;