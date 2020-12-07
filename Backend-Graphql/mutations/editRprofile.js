const RestaurantProfile = require('../models/RestaurantProfileModel')

const editRprofile = async (args) => {
    console.log(args)
        let result = await RestaurantProfile.findOneAndUpdate({_id: args._id}, {
            name: args.name,
            zipcode: args.zipcode,
            email: args.email,
            'profileInfo.location': args.location,
            'profileInfo.contact': args.contact,
            'profileInfo.cusine': args.cusine,
            'profileInfo.location': args.location,
            'profileInfo.description': args.description,
            'profileInfo.timings': args.timings,
            'profileInfo.dinein': args.dinein,
            'profileInfo.takeout': args.takeout,
            'profileInfo.ydelivery': args.ydelivery,
        })    
        if (result){                
                return{status: 200, message: "USER_UPDATED"}
            } else {
                return{status: 200, message: "Not Updated"}
            }
}

exports.editRprofile = editRprofile;