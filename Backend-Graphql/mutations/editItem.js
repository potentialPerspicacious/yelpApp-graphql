const MenuModel = require('../models/MenuModel')

const editMenuItem = async (args) => {
        let result = await MenuModel.findOneAndUpdate({'dishes._id': args._id}, {
                    $set :{
                        'dishes.$.name': args.dishname,
                        'dishes.$.ingredients': args.ingredients,
                        'dishes.$.category': args.category,
                        'dishes.$.description': args.description,
                        'dishes.$.price': args.price

                    }
        })    
        // console.log(result)
        if (result){                
                return{status: 200, message: "ITEM_UPDATED"}
            } else {
                return{status: 200, message: "Not Updated"}
            }
}

exports.editMenuItem = editMenuItem;