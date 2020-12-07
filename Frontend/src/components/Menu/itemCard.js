import React, { Component } from "react";
import { Card, Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEdit, faCartPlus} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import backendServer from "../../webConfig"
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import {addItemCart} from '../../actions/menu'
import { withApollo } from 'react-apollo';
import foodPlaceholder from './foodplaceholder.jpg'

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
  addCart = () => {
    localStorage.setItem("dishID", this.props.menu_item._id)
    localStorage.setItem("status", "item_present")

    this.props.addItemCart()
    // axios.post(`${backendServer}/customer/order/${localStorage.getItem("user_id")}/${localStorage.getItem("resID")}/${localStorage.getItem("dishID")}`)
    //     .then(response => {
    //             this.setState({
    //                 status: (response.data)
    //             });
    //     })
  }


  render() {
    let icon = null;
    if (localStorage.getItem("type")==="restaurant"){
      icon = (<Link to={{ pathname: "/menu/editItem"}}>
      <Button variant="link" onClick={this.setDishID} name="edit"><FontAwesomeIcon style={{color:"black"}} icon={faEdit}/></Button>&nbsp;
      </Link> )   } else {
        icon = <Button variant="link" onClick={this.addCart} name="edit"><FontAwesomeIcon style={{color:"black"}} icon={faCartPlus}/></Button>;
    }
    // let message = this.props.description
    const success = {
        message: null
    }
    var imageSrc;
    if (this.state) {
        imageSrc = `${backendServer}/images/item/${this.props.menu_item.image}`;
    }
    let details = this.state.dish;
    // console.log(this.props.description)
    if(this.props.description == 'ITEM_ADDED'){
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
            {/* <Button variant="link" onClick={this.props.deleteItem} name={this.props.menu_item.item_id}>Delete</Button> */}
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

ItemCard.propTypes = {
  addItemCart: PropTypes.func.isRequired,
  description: PropTypes.object.isRequired
}

// const mapStateToProps = state => { 
//   return ({
//       description: state.menu.description
// })};

export default withApollo(ItemCard);