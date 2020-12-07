import React, { Component} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEdit, faCartPlus, faCartArrowDown, faShoppingBag, faCar} from "@fortawesome/free-solid-svg-icons";
import ListCard from  './listCard'
import {placeResOrder} from '../../mutation/mutations'
import { graphql } from 'react-apollo';



class OrderCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
        status: {},
        status_message: {},status_message2:{},
        order_items: [],
        orderID: {}
    };
    
    this.onChange = this.onChange.bind(this);
    this.orderItems = this.orderItems.bind(this);
    this.getOrderedItems();

}
getOrderedItems = () => {
    }
    orderItems = () => {
        var itemsRender = [], items, item;
        if (this.state && this.state.order_items && this.state.order_items.length > 0) {
            items = this.state.order_items
            if (items.length > 0) {
                for (var i = 0; i < items.length; i++) {
                    item = <ListCard order_items={items[i]}/>;
                    itemsRender.push(item);
                }
            }
            return itemsRender;
        }
    }

onChange = (e) => {
    this.setState({
        [e.target.name]: e.target.value
    })
}
pickup = () => {
    localStorage.setItem("ordermode", "pickup")
}
delivery = () => {
    localStorage.setItem("ordermode", "delivery")
}
placeOrder = async () => {
    localStorage.setItem("orderstatus", "New Order")
    localStorage.setItem("status", 'item_not_present')
    let mutationResponse = await this.props.placeResOrder({
        variables: {
            resID: localStorage.getItem("resID"),
            cusID: localStorage.getItem("user_id"),
            ordermode: localStorage.getItem("ordermode"),
            orderstatus: localStorage.getItem("orderstatus"),
        }
    });
    let response = mutationResponse.data.placeResOrder;
    console.log(response)

    if (response) {
        console.log(response)
        if (response.status === "200") {
            this.setState({
                success: true,
                data: response.message,
                loginFlag: true
            });
        } else {
            console.log(response)
            this.setState({
                message: response.message,
                loginFlag: true
            });
        }
    }
    }
cancelOrder = () => {
    localStorage.removeItem("ordertype")
    localStorage.removeItem("orderstatus")
    localStorage.setItem("status", 'item_not_present')
    this.props.cancelOrder()
    }
render (){
    let section,
    renderOutput = [];
    console.log((this.state.orderID))
    if (this.state && this.state.order_items && this.state.order_items.length > 0) {
        section = this.orderItems(this.state.order_items);
        console.log(section)
        renderOutput.push(section);

            }
    let success = {
        message: null
            }


    let message = this.props.description
    if(message == 'ORDER_CANCELLED'){
        success.message = 'Successfully cancelled the order.'
        setTimeout(function() {window.location = '/csearch'}, 1000);
            }
    if(message == 'ORDER_PLACED'){
                success.message = 'Successfully placed the order.'
                setTimeout(function() {window.location = '/orderhistory'}, 10000);
                    }
            
    return(
        <div >
            {renderOutput}
                <div onChange={this.onChange} style={{marginTop:"4mm", marginLeft:"2cm"}}> 
                <p> Choose your delivery option</p>
        <input type="radio" value="Delivery" name="ordermode" onClick={this.delivery} /> Delivery
        <input style={{marginLeft:"2mm"}}type="radio" value="Pickup" name="ordermode" onClick={this.pickup}/> Pickup
                </div>
                <div class="row" style={{marginLeft:"4cm", marginTop:"1cm", marginBottom:"1cm"}}>
                       <div class="col-md-6">
                       <button class="btn btn-primary col-md-6" onClick = {this.placeOrder}><FontAwesomeIcon style={{color:"black"}} icon={faCartArrowDown}/>  Place Order</button> 
                       </div> 
                       <div class="col-md-6">
                       <button class="btn btn-secondary col-md-6" onClick = {this.cancelOrder}>Cancel</button>  
                       </div>
                        </div>
                        <div>
                        {success.message && <div className='alert alert-success'>{success.message}</div>}
                        </div>
        </div>
    )
}
}

  
export default graphql(placeResOrder, { name: "placeResOrder" })(OrderCard);
