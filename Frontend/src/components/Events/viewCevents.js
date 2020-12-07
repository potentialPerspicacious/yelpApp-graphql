import React, { Component } from "react";
import axios from "axios";
import cookie from 'react-cookies'; 
import EventsCard from "./eventsCard";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faIdCard, faCalendarPlus, faCalendarCheck, faSortAlphaDown, faSortNumericDownAlt } from "@fortawesome/free-solid-svg-icons";
import logo from '../../images/logo.png';
import backendServer from "../../webConfig"
import { Button } from "react-bootstrap";



class CEvents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            event_items: [],
            status: {}, 
            sort: {}
        };

        this.events = this.events.bind(this);
        this.getEvents();
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    eventSearch = () => {
        if (cookie.load('cookie')){
          localStorage.setItem("find", this.state.find)
          localStorage.setItem("location", this.state.location)
          window.location = '/viewcevents'
        }
      }
    getEvents = () => {
        const data = {
            find: this.state.find,
            location: this.state.location
        }
        console.log(data)
        axios.get(`${backendServer}/customer/getCEvents/${localStorage.getItem('find')}/${localStorage.getItem('location')}`, 
        {
            headers: { Authorization: `JWT ${cookie.load("token")}` }})
            .then(response => {
                    this.setState({
                        event_items: this.state.event_items.concat(response.data[1]),
                        status: (response.data[0])
                    });
            })
    };

    sortDescending = () => {
        localStorage.setItem("sort", "descending")
    }
    events = () => {
        var itemsRender = [], items, item;
        if (this.state && this.state.event_items && this.state.event_items.length > 0) {
            items = this.state.event_items
            // console.log(items)
            if (items.length > 0) {
                if(localStorage.getItem("sort") && localStorage.getItem("sort") === "descending" ){
                    for (var i = (items.length-1); i >= 0; i--) {
                        console.log(i)
                        item = <EventsCard event_items={items[i]}/>;
                        itemsRender.push(item);
                    }
                } else {
                for (var i = 0; i < items.length; i++) {
                    item = <EventsCard event_items={items[i]}/>;
                    itemsRender.push(item);
                }
            }
            }
            return itemsRender;
        }
    };
    render() {
        let message = null,
        navSearch = null,
            section,
            renderOutput = [];

        // console.log(this.state.status)
        if (this.state.status === 'EVENTS_PRESENT') {
            if (this.state && this.state.event_items && this.state.event_items.length > 0) {
                section = this.events(this.state.event_items);
                renderOutput.push(section);
                    }
        } else {
            renderOutput.push(<div><span> <p style={{color:'red'}}> Search Events. Either enter location or event name.</p></span></div>)
        }
        navSearch = (
            <div>
            <nav class="navbar navbar-expand-lg">
            <a class="navbar-brand" href="/">
              <img src={logo} width="90" height="45" alt="logo"/>
          </a>
                   <div class="form-group col-md-3">
                   {/* <FontAwesomeIcon icon={faBuilding} /> */}
                       <input onChange = {this.onChange} type="search" class="form-control hsearch" name="find" placeholder="Restaurant, Dishes, Events..." style={{color:"black"}}/>
                   </div>
    
                   <div class="form-group col-md-3">
                   {/* <FontAwesomeIcon icon={faSearchLocation} /> */}
                       <input onChange = {this.onChange}  type="search" class="form-control hsloc" name="location" placeholder="Where?" style={{color:"black"}}/>
                   </div>
                   <div class="form-group col-md-1">
                   <button class="btn btn-primary hsb" onClick={this.eventSearch}  type="submit"> <FontAwesomeIcon icon={faSearch} />
                          </button></div>
    
                      <li class="nav-item">
                    <a class="nav-link navtext3" style={{marginLeft:"4.3cm"}}  href="/yourevents" ><FontAwesomeIcon className="signico" icon={faCalendarCheck} /> Your Events</a>
                      </li>
                      <li class="nav-item">
                    <a class="nav-link navtext3"  href="/rhome" ><FontAwesomeIcon className="signico" icon={faIdCard} /> Profile</a>
                      </li>
      </nav>
      </div>
        )

        return (
            <div>
            {navSearch}
            <div>
           <div class='row' style={{ marginLeft:"30px", marginTop:"2cm"}}>
                <div class='col-xs-2' style={{textAlign: "left", height: "100%", borderLeft: "1px solid #e6e6e6", marginTop:"0.85cm", marginLeft: "0cm"}}>
                    <div style={{marginLeft: "20px"}}>
                        <h4 style={{color:'red'}}> Events Around You
                        <span style={{marginLeft:"15cm"}}>
                            <Button  variant='link' style={{color:"red"}} onClick={this.sortDescending}><FontAwesomeIcon icon={faSortNumericDownAlt} /> </Button></span>
                            
                        </h4>
                        <hr />
                        {renderOutput}
                       {/* <p style={{color:"red", align:"center"}}> Please Add Items to Shopping Bag Before Proceeding</p>            */}
                    </div>
                </div>
                </div>
            </div>                    
            
        </div>
  
        );
    }
}

export default CEvents;