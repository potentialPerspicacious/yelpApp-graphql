const Users = require('../models/UserModel.js');
const restaurant = Users.restaurant;
const customer = Users.customer;
const jwt = require('jsonwebtoken');

const login = async (args) => {
    if(args.isOwner === "on"){
        let result = await restaurant.findOne({email: args.email, password: args.password})    
        if (result){
                token = "Successful Login" + "SecretSplitHere" + result._id
                
                return{status: 200, message: token}
            } else {
                return{status: 200, message: "Invalid User"}
            }
    } else if (args.isOwner === 'off'){
        let result = customer.findOne({email: args.email, password: args.password})
        if(result) {

        }
    }
}

exports.login = login;