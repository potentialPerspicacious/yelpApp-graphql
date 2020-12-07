const Users = require('../models/UserModel.js');
const customer = Users.customer;

const signupCus = async (args) => {
    if(args.isOwner === "on"){
        let result = await customer.findOne({email: args.email})    
        if (result){
                return{status: 200, message: "USER_EXISTS"}
            } else {
                return{status: 200, message: "Internal Server Error"}
            }
    } else if (args.isOwner === 'off'){
        let result = await customer.create({email: args.email, password: args.password, fname: args.fname, lname: args.lname,
        zipcode: args.zipcode, month: args.month, date: args.date, year:args.year})
        if(result) {
            return{status: 200, message: "SIGNUP_SUCCESSFUL"}
        }else {
            return{status: 200, message: "Invalid User"}
        }
    }
}

exports.signupCus = signupCus;