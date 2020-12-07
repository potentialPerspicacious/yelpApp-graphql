import { gql } from 'apollo-boost';

const loginMutation = gql`
    mutation login($email: String, $password: String, $isOwner:String){
        login(email: $email, password: $password, isOwner: $isOwner){
            message
            status
        }
    }
`
const signupRes = gql`
    mutation signupRes($email: String, $name: String, $zipcode: String, $password: String){
        signupRes(email: $email, name: $name, zipcode: $zipcode, password: $password){
            message
            status
        }
    }
`
const signupCus = gql`
    mutation signupCus($email: String, $fname: String, $zipcode: String, $lname: String, $password: String,
        $date: String,  $month: String,  $date: month ){
        signupCus(email: $email, fname: $fname,lname: $lname, zipcode: $zipcode, password: $password,
            date: $date, month: $year, year: $year){
            message
            status
        }
    }
`

const editRprofile = gql`
    mutation editRprofile($_id: String, $email: String, $rname: String,  $zipcode: String, $location: String, $contact: String,
        $cusine: String, $description: String, $timings: String, $dinein: String, $takeout: String, $ydelivery: String ){
            editRprofile(_id: $_id, email: $email, name: $rname, zipcode: $zipcode, location: $location, contact: $contact,
            cusine: $cusine, description: $description, timings: $timings, dinein: $dinein, takeout: $takeout, ydelivery: $ydelivery){
            message
            status
        }
    }
`
const addMenuItem = gql`
    mutation addItem($_id: String, $dishname: String, $category:String, $ingredients: String, 
        $description: String, $price: String){
        addItem(_id: $_id, dishname: $dishname, category: $category, ingredients: $ingredients,
            description: $description, price: $price){
            message
            status
        }
    }
`
const editMenuItem = gql`
    mutation editMenuItem($_id: String, $dishname: String, $category:String, $ingredients: String, 
        $description: String, $price: String){
        editMenuItem(_id: $_id, dishname: $dishname, category: $category, ingredients: $ingredients,
            description: $description, price: $price){
            message
            status
        }
    }
`
const updateOrder = gql`
    mutation updateOrder($_id: String, $orderstatus: String, $ordermode:String){
            updateOrder(_id: $_id, orderstatus: $orderstatus, ordermode: $ordermode){
            message
            status
        }
    }
`

const editCprofile = gql`
    mutation editCprofile($_id: String, $email: String, $fname: String,  $zipcode: String, $lname: String, $contact: String,
        $gender: String, $city: String, $headline: String, $address: String, $nickname: String, $yelptime: String, $hobbies: String, $about: String,
        $social: String ){
            editCprofile(_id: $_id, email: $email, fname: $fname, zipcode: $zipcode, lname: $lname, contact: $contact,
            gender: $gender, city: $city, headline: $headline address: $address, nickname: $nickname, yelptime: $yelptime, hobbies: $hobbies, about: $about,
            social: $social){
            message
            status
        }
    }
`

const addItemCart = gql`
    mutation addItemCart($dishID: String, $dishName: String, $resID: String, $cusID: String){
        addItemCart(dishID: $dishID, dishName: $dishName, resID: $resID, cusID: $cusID){
            message
            status
        }
    }
`

const placeResOrder = gql`
    mutation placeResOrder($ordermode: String, $resID: String, $cusID: String, $orderstatus: String){
        placeResOrder(ordermode: $ordermode, resID: $resID, cusID: $cusID, orderstatus: $orderstatus){
            message
            status
        }
    }
`


export {
    loginMutation,
    signupRes,
    signupCus,
    editRprofile,
    addMenuItem,
    editMenuItem,
    updateOrder,
    editCprofile,
    addItemCart,
    placeResOrder
    };