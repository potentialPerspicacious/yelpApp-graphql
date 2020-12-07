const CustomerProfile = require('../models/CustomerProfileModel')

const editCprofile = async (args) => {
        let result = await CustomerProfile.findOneAndUpdate({_id: args._id}, {
            fname: args.fname,
            lname: args.lname,
            zipcode: args.zipcode,
            email: args.email,
            'profileInfo.headline': args.headline,
            'profileInfo.gender': args.gender,
            'profileInfo.city': args.city,
            'profileInfo.address': args.address,
            'profileInfo.contact': args.contact,
            'profileInfo.nickname': args.nickname,
            'profileInfo.yelptime': args.yelptime,
            'profileInfo.hobbies': args.hobbies,
            'profileInfo.about': args.about,
            'profileInfo.social': args.social,
        })    
        if (result){                
                return{status: 200, message: "USER_UPDATED"}
            } else {
                return{status: 200, message: "Not Updated"}
            }
}

exports.editCprofile = editCprofile;