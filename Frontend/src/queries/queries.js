import { gql } from 'apollo-boost';

const getRestaurantProfileBasic = gql`
query($id: String){
    restaurant(id: $id){
        _id
        name
        email
        city
        zipcode
    }

    restaurantProfile(id: $id){
        location
        contact
        cusine
        description
        timings
        dinein
        takeout
        ydelivery
    }

}
`;

const getMenu = gql`
query($id: String){
    menu(id: $id){
        _id
        name
        dishes{
            _id
            name
            ingredients
            category
            description
            price
    }
}
}
`;

const getRorders = gql`
query($id: String){
    rorderhistory(id: $id){
        orderdetails{
        _id
        orderPlaced
        resID
        cusID
        ordermode
        orderstatus
        customerName
        }
        dishes{
            _id
            dishID
            quantity
            dishName
    }
}
}
`;

const getDish = gql`
query($id: String){
    dish(id: $id){
        _id
        name
        ingredients
        category
        description
        price
    }
}
`;

const fetchReviews = gql`
query($id: String){
    review_list(id: $id){
        reviews{
            review_description
            rating
            review_by
    }
}
}
`;

const getCustomerProfileBasic = gql`
query($id: String){
    customer(id: $id){
        _id
        fname
        lname
        email
        zipcode
        month
        date
        year
    }

    customerProfile(id: $id){
        address
        contact
        gender
        headline
        city
        nickname
        yelptime
        hobbies
        about
        social
    }

}
`;

const getRestaurants = gql`
query($name: String){
    searchRestaurant(name: $name){
        restaurant{
        _id
        name
        zipcode
        city
        location
        contact
        cusine
        description
        timings
        dinein
        takeout
        ydelivery
        }
    }

}
`;

export { getRestaurantProfileBasic,
    getMenu,
    getRorders,
    getDish,
    fetchReviews,
    getCustomerProfileBasic,
    getRestaurants

    };