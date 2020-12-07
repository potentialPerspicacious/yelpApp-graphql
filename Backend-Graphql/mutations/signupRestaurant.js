const Users = require('../models/UserModel.js');
const restaurant = Users.restaurant;

const signupRes = async (args) => {
    if(args.isOwner === "on"){
        let result = await restaurant.findOne({email: args.email})    
        if (result){
                return{status: 200, message: "USER_EXISTS"}
            } else {
                return{status: 200, message: "Internal Server Error"}
            }
    } else if (args.isOwner === 'off'){
        let result = await restaurant.create({email: args.email, password: args.password, name: args.name,
        zipcode: args.zipcode})
        if(result) {
            return{status: 200, message: "SIGNUP_SUCCESSFUL"}
        }else {
            return{status: 200, message: "Invalid User"}
        }
    }
}

exports.signupRes = signupRes;