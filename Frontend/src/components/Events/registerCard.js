import { faCalendarAlt, faCity, faClock, faMapMarkerAlt, faNewspaper } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component} from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import axios from 'axios'
import backendServer from "../../webConfig"
import cookie from "react-cookies";



class EventsCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: {},
        };
    }
setCusID = () => {
        localStorage.setItem("cusID", this.props.get_people.cusID)
    }

render() {
    var imageSrc;
    if (this.props) {
        imageSrc = `${backendServer}/images/user/${this.props.get_people.image}`;
    }
    return (
<div>
<Card bg="white" style={{ width: "30rem", margin: "2%", height:"5rem" }}>
<Row>
          <Col xs='2'> 
            <Card.Img style={{ width: "5rem", height: "5em" }} src={imageSrc} />
          </Col>
          <Col align="left" style={{marginLeft:"0mm"}} xs='8'>
            <Card.Body>

                <Card.Title>
                <a href="/cprofile" onClick={this.setCusID} style={{textDecoration:"none", color:"black"}}>
                    <p style={{textTransform:"uppercase", marginTop:"2mm"}}>{this.props.get_people.fname}<span style={{marginLeft:"2mm"}}>{this.props.get_people.lname}</span></p>
            </a>
                    </Card.Title>  
                  </Card.Body>
          </Col>
        </Row>
      </Card>
</div>
    );
}

}
export default EventsCard;