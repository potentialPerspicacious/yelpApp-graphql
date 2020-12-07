const Orders = require('../models/OrdersModel')

const addItemCart = async (args) => {
        let result = await Orders.findOneAndUpdate({resID: args.resID, cusID: args.cusID, orderPlaced: "NO"}, {
                    $push :{ dishes: {
                        dishID: args.dishID,
                        dishName: args.dishName
                    }}
        })    
        // console.log(result)
        if (result){                
                return{status: 200, message: "ITEM_ADDED"}
            } else if (!result){
                let result2 = await Orders.create({
                    resID: args.resID,
                    cusID: args.cusID,
                    orderPlaced: "NO",
                    dishes: [{
                        dishID: args.dishID,
                        dishName: args.dishName
                    }]
                    
        })     
             if(result2){
                return{status: 200, message: "ITEM_ADDED"}
             }
            } else
            {
                return{status: 200, message: "Not Updated"}
            }
}

exports.addItemCart = addItemCart;