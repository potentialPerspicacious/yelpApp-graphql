const graphql = require('graphql');
const searchModel = require('../models/SearchModel');
const searchByName = searchModel.searchByName;
const searchByLocation = searchModel.searchByLocation;
const searchByNameAndLocation = searchModel.searchByNameAndLocation;
const RestaurantProfile = require('../models/RestaurantProfileModel')
const CustomerProfile = require("../models/CustomerProfileModel")
const MenuModel = require('../models/MenuModel')
const Orders = require('../models/OrdersModel.js');
const { login } = require('../mutations/login');
const {editRprofile} = require('../mutations/editRprofile')
const {addItem} = require ('../mutations/addItem')
const {editMenuItem} = require('../mutations/editItem')
const {updateOrder} = require('../mutations/updateOrder')
const {editCprofile} = require('../mutations/editCprofile');
const { CONNREFUSED } = require('dns');

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
        },
        reviews: {
            type: new GraphQLList(ReviewType),
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

const ReviewType = new GraphQLObjectType({
    name: 'ReviewList',
    fields: () => ({
        _id: { type: GraphQLID },
        review_description: { type: GraphQLString },
        rating: { type: GraphQLString },
        review_by: { type: GraphQLString }
    })
});


const CustomerType = new GraphQLObjectType({
    name: 'Customer',
    fields: () => ({
        _id: { type: GraphQLID },
        fname: { type: GraphQLString },
        lname: { type: GraphQLString },
        email: { type: GraphQLString },
        month: { type: GraphQLString },
        zipcode: { type: GraphQLString },
        date: {type: GraphQLString},
        year: {type: GraphQLString},
        type: {type: GraphQLString},
        profileInfo: {
            type: new GraphQLList(CustomerProfileType),
            resolve(parent, args) {
                return parent.profileInfo;
            }
        }
    })
});

const CustomerProfileType = new GraphQLObjectType({
    name: 'CustomerProfile',
    fields: () => ({
        _id: { type: GraphQLID },
        gender: { type: GraphQLString },
        headline: { type: GraphQLString },
        city: { type: GraphQLString },
        address: { type: GraphQLString },
        contact: { type: GraphQLString },
        nickname: { type: GraphQLString },
        yelptime: { type: GraphQLString },
        hobbies: { type: GraphQLString },
        social: { type: GraphQLString },
        about: { type: GraphQLString },       
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
         },
         review_list :{
            type: RestaurantType,
            args: {id : {type: GraphQLString}},
            async resolve(parent, args) {
                let review = await RestaurantProfile.findById({_id: args.id}, {reviews: 1})
                if (review) {
                    return review._doc.reviews
                }
            }
         },
         customer: {
            type: CustomerType,
            args: { id: { type: GraphQLString } },
            async resolve(parent, args) {
                let customer = await CustomerProfile.findById({_id: args.id}, {profileInfo: 0, events: 0, image:0});
                if (customer) {
                    return customer;
                }
            }
        },

        customerProfile :{
            type: CustomerProfileType,
            args: {id : {type: GraphQLString}},
            async resolve(parent, args) {
                let customerProfile = await CustomerProfile.findById({_id: args.id}, {profileInfo: 1})
                if (customerProfile) {
                    return customerProfile.profileInfo
                }
            }
         },
         searchRestaurant :{
            type: RestaurantType,
            args: {name : {type: GraphQLString}, location: {type: GraphQLString}},
            async resolve(parent, args) {
                let restaurant = await searchByName.find({name: args.name}, {profileInfo: 0, dishes: 0, events: 0, reviews:0})
                let restaurantProfile = await searchByName.find({name: args.name}, {profileInfo: 1})
                let mergeObj = Object.assign(restaurant[0]._doc, restaurantProfile[0]._doc.profileInfo)
                console.log(mergeObj)
                let arr = []
                console.log(arr)
                arr.push(mergeObj)
                if (restaurant) {
                    return arr
                }
            }
         },

        //  getRestaurantProfile : {
        //     type: RestaurantProfileType,
        //     args: {id : {type: GraphQLString}},
        //     async resolve(parent, args) {
        //         let restaurantProfile = await searchByName.find({name: args.name}, {profileInfo: 1})
        //         if (restaurantProfile) {
        //             return restaurantProfile.profileInfo
        //         }
        //     }
        //  },


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
        updateOrder: {
            type: StatusType,
            args: {
                _id: { type: GraphQLString },
                ordermode: { type: GraphQLString },
                orderstatus: {type: GraphQLString}

            },
            resolve(parent, args) {
                return updateOrder(args);
            }
        },
        editCprofile: {
            type: StatusType,
            args: {
                _id: { type: GraphQLString },
                email: {type: GraphQLString},
                fname: { type: GraphQLString },
                lname: { type: GraphQLString },
                zipcode: {type: GraphQLString},
                city: {type: GraphQLString},
                contact: {type: GraphQLString},
                address: {type: GraphQLString},
                headline: {type: GraphQLString},
                gender: {type: GraphQLString},
                nickname: {type: GraphQLString},
                yelptime: {type: GraphQLString},
                hobbies: {type: GraphQLString},
                about: {type: GraphQLString},
                social: {type: GraphQLString},

            },
            resolve(parent, args) {
                return editCprofile(args);
            }
        },
    }
}) 

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});