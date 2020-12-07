const graphql = require('graphql');
const Users = require('../models/UserModel.js');
const restaurant = Users.restaurant;
const customer = Users.customer;
const RestaurantProfile = require('../models/RestaurantProfileModel')
const MenuModel = require('../models/MenuModel')
const Orders = require('../models/OrdersModel.js');
const { login } = require('../mutations/login');
const {editRprofile} = require('../mutations/editRprofile')
const {addItem} = require ('../mutations/addItem')
const {editMenuItem} = require('../mutations/editItem')
const { ProvidedRequiredArgumentsOnDirectivesRule } = require('graphql/validation/rules/ProvidedRequiredArgumentsRule');
const { resolve } = require('path');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = graphql;

const RestaurantType = new GraphQLObjectType({
    name: 'Restaurant',
    fields: () => ({
        _id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        city: { type: GraphQLString },
        zipcode: { type: GraphQLString },
        image: {type: GraphQLString},
        type: {type: GraphQLString},
        profileInfo: {
            type: new GraphQLList(RestaurantProfileType),
            resolve(parent, args) {
                return parent.profileInfo;
            }
        },
        dishes: {
            type: new GraphQLList(MenuType),
            resolve(parent, args) {
                return parent;
            }
        }
    })
});
const RestaurantProfileType = new GraphQLObjectType({
    name: 'RestaurantProfile',
    fields: () => ({
        _id: { type: GraphQLID },
        location: { type: GraphQLString },
        contact: { type: GraphQLString },
        cusine: { type: GraphQLString },
        description: { type: GraphQLString },
        timings: { type: GraphQLString },
        dinein: { type: GraphQLString },
        takeout: { type: GraphQLString },
        ydelivery: { type: GraphQLString },
       
    })
});
const MenuType = new GraphQLObjectType({
    name: 'Menu',
    fields: () => ({
        _id: { type: GraphQLID },
        name: { type: GraphQLString },
        ingredients: { type: GraphQLString },
        category: { type: GraphQLString },
        description: { type: GraphQLString },
        price: {type: GraphQLString}
       
    })
});

const RestaurantOrderType = new GraphQLObjectType({
    name: 'RestaurantOrders',
    fields: () => ({
        orderdetails: {
            type: new GraphQLList(OrderDetailsType),
            resolve(parent, args) {
                // console.log(parent)
                return parent;
            }
        },
        dishes: {
            type: new GraphQLList(OrderDishType),
            resolve(parent, args) {
                // console.log(parent)
                return parent;
            }
        }
    })
});

const OrderDetailsType = new GraphQLObjectType({
    name: 'OrderedDetails',
    fields: () => ({
        _id: { type: GraphQLID },
        orderPlaced: { type: GraphQLString },
        resID: { type: GraphQLString },
        cusID: { type: GraphQLString },
        ordermode: { type: GraphQLString },
        orderstatus: { type: GraphQLString },
        customerName: { type: GraphQLString }
    })
});

const OrderDishType = new GraphQLObjectType({
    name: 'OrderedDishes',
    fields: () => ({
        _id: { type: GraphQLID },
        dishID: { type: GraphQLString },
        quantity: { type: GraphQLString },
        dishName: { type: GraphQLString }
    })
});

const RootQuery = new graphql.GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        restaurant: {
            type: RestaurantType,
            args: { id: { type: GraphQLString } },
            async resolve(parent, args) {
                let restaurant = await RestaurantProfile.findById({_id: args.id}, {profileInfo: 0});
                if (restaurant) {
                    return restaurant;
                }
            }
        },

        restaurantProfile :{
            type: RestaurantProfileType,
            args: {id : {type: GraphQLString}},
            async resolve(parent, args) {
                let restaurantProfile = await RestaurantProfile.findById({_id: args.id}, {profileInfo: 1})
                if (restaurantProfile) {
                    return restaurantProfile.profileInfo
                }
            }
         },

         menu :{
            type: RestaurantType,
            args: {id : {type: GraphQLString}},
            async resolve(parent, args) {
                let menu = await RestaurantProfile.findById({_id: args.id}, {dishes: 1})
                if (menu) {
                    // console.log((menu._doc.dishes))
                    return menu._doc.dishes
                }
            }
         },
         dish :{
            type: MenuType,
            args: {id : {type: GraphQLString}},
            async resolve(parent, args) {
                let dish = await MenuModel.find({},{_id:0, dishes: {$elemMatch: {_id: args.id}}})
              
                if (dish) {
                    // console.log((dish))
                    return dish[0]._doc.dishes[0]._doc
                }
            }
         },

         rorderhistory :{
            type: RestaurantOrderType,
            args: {id : {type: GraphQLString}},
            async resolve(parent, args) {
                let rorders = await Orders.find({resID: args.id})
                if (rorders) {
                    // console.log((rorders))
                    return rorders
                }
            }
         }


    }
})
const StatusType = new GraphQLObjectType({
    name: 'Status',
    fields: () => ({
        status: { type: GraphQLString },
        message: { type: GraphQLString },
    })
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        login: {
            type: StatusType,
            args: {
                email: { type: GraphQLString },
                password: { type: GraphQLString },
                isOwner: {type: GraphQLString},
            },
            resolve(parent, args) {
                return login(args);
            }
        },
        editRprofile: {
            type: StatusType,
            args: {
                _id: { type: GraphQLString },
                email: {type: GraphQLString},
                name: { type: GraphQLString },
                zipcode: {type: GraphQLString},
                location: {type: GraphQLString},
                contact: {type: GraphQLString},
                cusine: {type: GraphQLString},
                description: {type: GraphQLString},
                timings: {type: GraphQLString},
                dinein: {type: GraphQLString},
                takeout: {type: GraphQLString},
                ydelivery: {type: GraphQLString},
            },
            resolve(parent, args) {
                return editRprofile(args);
            }
        },
        addItem: {
            type: StatusType,
            args: {
                _id: { type: GraphQLString },
                dishname: { type: GraphQLString },
                category: {type: GraphQLString},
                ingredients:  {type: GraphQLString},
                description: {type: GraphQLString},
                price: {type: GraphQLString},

            },
            resolve(parent, args) {
                return addItem(args);
            }
        },
        editMenuItem: {
            type: StatusType,
            args: {
                _id: { type: GraphQLString },
                dishname: { type: GraphQLString },
                category: {type: GraphQLString},
                ingredients:  {type: GraphQLString},
                description: {type: GraphQLString},
                price: {type: GraphQLString},

            },
            resolve(parent, args) {
                return editMenuItem(args);
            }
        },
    }
}) 

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});