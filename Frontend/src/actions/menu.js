import axios from "axios";
import backendServer from "../webConfig"
import cookie from "react-cookies";



export const addMenuItem = (data) => dispatch => {
    axios.post(`${backendServer}/menu/addItem/${localStorage.getItem("user_id")}`, data, {
        headers: { Authorization: `JWT ${cookie.load("token")}` }})
        .then(response => dispatch({
            type: 'ADD_ITEM',
            payload: response.data 
        }))
        .catch(error => {
            if (error.response && error.response.data) {
                return dispatch({
                    type: 'ADD_ITEM',
                    payload: error.response.data
                });
            }
        });
}
export const editMenuItem = (data) => dispatch => {
    axios.post(`${backendServer}/menu/updateItem/${localStorage.getItem("dishID")}`, data, {
        headers: { Authorization: `JWT ${cookie.load("token")}` }})
        .then(response => dispatch({
            type: 'EDIT_ITEM',
            payload: response.data 
        }))
        .catch(error => {
            if (error.response && error.response.data) {
                return dispatch({
                    type: 'EDIT_ITEM',
                    payload: error.response.data
                });
            }
        });
}
export const addItemCart = () => dispatch => {
    axios.post(`${backendServer}/customer/order/${localStorage.getItem("user_id")}/${localStorage.getItem("resID")}/${localStorage.getItem("dishID")}`, {
        headers: { Authorization: `JWT ${cookie.load("token")}` }})
        .then(response => dispatch({
            type: 'CART_ITEM',
            payload: response.data 
        }))
        .catch(error => {
            if (error.response && error.response.data) {
                return dispatch({
                    type: 'CART_ITEM',
                    payload: error.response.data
                });
            }
        });
}
