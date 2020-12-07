const MenuModel = require('../models/MenuModel')

const addItem = async (args) => {
        let result = await MenuModel.findOneAndUpdate({_id: args._id}, {
                    $push : {dishes: {
                        name: args.dishname,
                        ingredients: args.ingredients,
                        category: args.category,
                        description: args.description,
                        price: args.price

                    }}
        })    
        if (result){                
                return{status: 200, message: "ITEM_ADDED"}
            } else {
                return{status: 200, message: "Not Updated"}
            }
}

exports.addItem = addItem;