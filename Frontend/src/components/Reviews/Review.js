import React, { Component } from "react";
import { Container, Alert } from "react-bootstrap";
import axios from "axios";
import ReviewCard from "./reviewCard";
import backendServer from "../../webConfig"
import { withApollo } from 'react-apollo';
import {fetchReviews} from '../../queries/queries'

class Review extends Component {
    constructor(props) {
        super(props);
        this.state = {
            review_items: [],
            status: {}
        };

        this.reviews = this.reviews.bind(this);
        this.getReviews();
    }


    getReviews = async () => {
        if (localStorage.getItem("isOwner")==='on'){
            const { data } = await this.props.client.query({
                query: fetchReviews,
                    variables: { id: localStorage.getItem("user_id") },
                    fetchPolicy: 'network-only',
              });
              console.log((data.review_list))
              this.state.review_items = []
              this.setState({review_items: this.state.review_items.concat(data.review_list.reviews)})
        } else {
            axios.get(`${backendServer}/restaurant/getReviews/${localStorage.getItem("resID")}`)
            .then(response => {
                    this.setState({
                        review_items: this.state.review_items.concat(response.data),
                        status: (response.data[0])

                    });
            })

        }
    };

    reviews = () => {
        var itemsRender = [], items, item;
        if (this.state && this.state.review_items && this.state.review_items.length > 0) {
            items = this.state.review_items
            if (items.length > 0) {
                for (var i = 0; i < items.length; i++) {
                    item = <ReviewCard review_items={items[i]} deleteItem={this.deleteItem}/>;
                    itemsRender.push(item);
                }
            }
            return itemsRender;
        }
    };
    render() {
        let message = null,
            section,
            renderOutput = [];
        if (this.state.review_items.length>1) {
            if (this.state && this.state.review_items && this.state.review_items.length > 0) {
                section = this.reviews(this.state.review_items);
                renderOutput.push(section);
                    }
        } else {
            renderOutput.push(<div><span> <p style={{color:'red'}}> No Reviews.</p></span></div>)
        }

        return (
            <Container className="justify-content">
                <br />
                {/* <h3>Menu</h3> */}
                {renderOutput}
            </Container>
        );
    }
}

export default withApollo(Review);
