import React, { Component } from "react";
import { Card, Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEdit, faCartPlus} from "@fortawesome/free-solid-svg-icons";
import { withApollo } from 'react-apollo';
import foodPlaceholder from './foodplaceholder.jpg'
import { graphql } from 'react-apollo';
import { addItemCart } from '../../mutation/mutations';
import { compose } from 'recompose';

class ItemCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
        status: {},
    
    };
}


  setDishID = () => {
    localStorage.setItem("dishID", this.props.menu_item._id)
  }
  addCart = async(e) => {
    console.log(this.props.menu_item)
    localStorage.setItem("dishID", this.props.menu_item._id)
    localStorage.setItem("status", "item_present")
    e.preventDefault();
    let mutationResponse = await this.props.addItemCart({
        variables: {
            dishID: localStorage.getItem("dishID"),
            dishName: this.props.menu_item.name,
            resID: localStorage.getItem('resID'),
            cusID: localStorage.getItem('user_id')
        }
    });
    let response = mutationResponse.data.addItemCart;
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


  render() {
    let icon = null;
    if (localStorage.getItem("type")==="restaurant"){
      icon = (<Link to={{ pathname: "/menu/editItem"}}>
      <Button variant="link" onClick={this.setDishID} name="edit"><FontAwesomeIcon style={{color:"black"}} icon={faEdit}/></Button>&nbsp;
      </Link> )   } else {
        icon = <Button variant="link" onClick={this.addCart} name="edit"><FontAwesomeIcon style={{color:"black"}} icon={faCartPlus}/></Button>;
    }

    const success = {
        message: null
    }
    if(this.state.data == 'ITEM_ADDED'){
        success.message = 'Item added to cart.'
        setTimeout(function() {window.location = '/restaurantPage'}, 500);
    }
    return (
      <div>
      <Card bg="white" style={{ width: "50rem", margin: "2%" }}>
        <Row>
          <Col>
            <Card.Img style={{ width: "15rem", height: "15rem" }} src={foodPlaceholder} />
          </Col>
          <Col align="left" style={{marginLeft:"0mm"}}>
            <Card.Body>
              <Card.Title>{this.props.menu_item.name}</Card.Title>
              <Card.Text><p>{this.props.menu_item.category}</p></Card.Text>
              <Card.Text><p>{this.props.menu_item.ingredients}</p></Card.Text>
              <Card.Text><p>{this.props.menu_item.description}</p></Card.Text>
              <Card.Text>Price: ${this.props.menu_item.price}</Card.Text>
            </Card.Body>
          </Col>
          <Col align="right">
            {icon}
          </Col>
        </Row>
      </Card>
                              <div>
                              {success.message && <div className='alert alert-success'>{success.message}</div>}
                              </div>
                            </div>
    );
  }
}

export default compose(
  withApollo,
  graphql(addItemCart, { name: "addItemCart" })   
)(ItemCard);