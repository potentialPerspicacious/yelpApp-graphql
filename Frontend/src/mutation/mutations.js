import { gql } from 'apollo-boost';

const loginMutation = gql`
    mutation login($email: String, $password: String, $isOwner:String){
        login(email: $email, password: $password, isOwner: $isOwner){
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
export {
    loginMutation,
    editRprofile,
    addMenuItem,
    editMenuItem,
    updateOrder
    };