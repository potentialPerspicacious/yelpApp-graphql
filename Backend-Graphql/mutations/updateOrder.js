const Orders = require('../models/OrdersModel')

const updateOrder = async (args) => {
    console.log(args)
        let result = await Orders.findOneAndUpdate({_id: args._id}, {
                    $set :{
                        'ordermode': args.ordermode,
                        'orderstatus': args.orderstatus
                    }
        })    
        // console.log(result)
        if (result){                
                return{status: 200, message: "ORDER_UPDATED"}
            } else {
                return{status: 200, message: "Not Updated"}
            }
}

exports.updateOrder = updateOrder;