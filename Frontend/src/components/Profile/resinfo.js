import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { UserProfileNavBar, UserProfileJumbo, NavList, Form, Button, MDBInput, Carousel, Row, Col} from 'react-bootstrap';
import rest1 from '../../images/rest1.jpg'
import rest2 from '../../images/rest2.jpg'
import food1 from '../../images/food1.jpg'
import food2 from '../../images/food2.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarPlus ,faCartArrowDown, faUtensils, faCamera, faShareAlt, faMapMarkerAlt, faClock, faStar, faStarHalf, faPhoneAlt, faEnvelope, faCheck, faPlus, faEdit, faCross, faTimes, faCalendar, faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import Menu from '../Menu/Menu'
import Review from '../Reviews/Review'
import {getRestaurantProfileBasic, getRestaurantProfileAdv} from '../../queries/queries'
import { graphql, withApollo } from 'react-apollo';


class Resinfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profileBasic: {},
            profileAdv: {}
        
        };
    }
    
    componentDidMount = async() => {
        // if (localStorage.getItem("type")==='restaurant'){
        //     axios.get(`/profile/restaurant/${localStorage.getItem("user_id")}`)
        //     .then(response => 
        //         {this.setState({
        //             profileBasic: response.data,
        //             profileAdv: response.data.profileInfo
        //             }); 
        //         })
        // } else {
        //     axios.get(`/profile/restaurant/${localStorage.getItem("resID")}`)
        //     .then(response => 
        //         {this.setState({
        //             profileBasic: response.data,
        //             profileAdv: response.data.profileInfo
                        
        //             }); 
        //         })
        // }
        const { data } = await this.props.client.query({
            query: getRestaurantProfileBasic,
                variables: { id: localStorage.getItem("user_id") },
                fetchPolicy: 'network-only',
          });
        //   console.log(data)
          this.setState({profileBasic: data.restaurant})
          this.setState({profileAdv: data.restaurantProfile})


        // if(this.props.data.loading === false){
        //     this.setState({
        //             profileBasic: this.props.data.restaurant,
        //             profileAdv: this.props.data.restaurantProfile
        //     })
        // }

    }
    editProfile= () => {
        window.location = '/editProfile'
   }

    render(){
        let restaurantBasic, restaurantAdv;
        // if(!this.state.profileAdv){
        //     return <div />
        // }
        // if(!this.state.profileBasic){
        //     return <div />
        // } else {
        //     let basicDetails = this.state.profileBasic
        //     // console.log(this.state.profileBasic)
        //     let details = Object.assign(this.state.profileBasic, this.state.profileAdv)


        // }
        let details = Object.assign(this.state.profileBasic, this.state.profileAdv)

        
        // console.log(this.state.profileBasic)

        let icon = null, 
        order = null,
        dservice = null,
        tkservice = null,
        ydservice=null,
        ratings = null,
        editIcon = null;

        let rate = Math.round(4);
        var rating = []
        for (var i = 0; i < rate; i++) {
            ratings = <FontAwesomeIcon className="" icon={faStar} style={{color: "red"}} />;
            rating.push(ratings);
        }
if (localStorage.getItem("type")==="restaurant"){
    order = <Button href = '/rorders' onClick={localStorage.setItem('filter', 'no_filter')} style = {{backgroundColor: "red", fontSize: "20px", border: '1px solid red', color: "white"}} variant="link">Orders  <FontAwesomeIcon className="" icon={faCartArrowDown} style={{height:"4.5mm", position:"center"}} /> </Button>

    icon = <a href="/menu/addItem"> <FontAwesomeIcon className="" icon={faPlus} style={{color: "black", marginTop:"5mm", marginLeft: "19.65cm"}} /></a>
    editIcon =  <a href="/editProfile"> <FontAwesomeIcon className="" icon={faEdit} style={{color: "black", marginTop:"5mm", marginLeft: "16.5cm"}} /></a>
} else {
    icon = null;
    editIcon = null;
    order = <Button href = "javascript:setTimeout(()=>{window.location = '/corders' },1000);"  onClick={localStorage.setItem('filter', 'no_filter')} style = {{backgroundColor: "red", fontSize: "20px", border: '1px solid red', color: "white"}} variant="link">Orders  <FontAwesomeIcon className="" icon={faCartArrowDown} style={{height:"4.5mm", position:"center"}} /> </Button>

}      


        if(details.dinein === 'dinein'){
            dservice = (<FontAwesomeIcon className="" icon={faCheck} style={{color: "green"}}/>);
        } else {
         dservice = (<FontAwesomeIcon className="" icon={faTimes} style={{color: "red"}}/>) }
         if(details.takeout === 'takeout'){
            tkservice = (<FontAwesomeIcon className="" icon={faCheck} style={{color: "green"}}/>);
        } else {
            tkservice = (<FontAwesomeIcon className="" icon={faTimes} style={{color: "red"}}/>) }
         if(details.ydelivery === 'ydelivery'){
            ydservice = (<FontAwesomeIcon className="" icon={faCheck} style={{color: "green"}}/>);
        } else {
            ydservice = (<FontAwesomeIcon className="" icon={faTimes} style={{color: "red"}}/>) }

        
        return(
            <div className='container-fluid' >
            <Carousel style={{width:"850px"}}>
                <Carousel.Item style={{'height':"400px", margin:"0"}} >
                    <img style={{'height':"500px"}} className="w-100" src={rest1} />
                </Carousel.Item>
                <Carousel.Item style={{'height':"400px"}}>
                    <img style={{'height':"500px"}} className="w-100" src={rest2}/>
                </Carousel.Item>
                <Carousel.Item style={{'height':"400px"}}>
                    <img style={{'height':"500px"}} className="d-block w-100" src={food1}/>
                </Carousel.Item>
                <Carousel.Item style={{'height':"400px"}}>
                    <img style={{'height':"500px"}} className="d-block w-100" src={food2}/>
                </Carousel.Item>
            </Carousel>  
                   <div class="row">
                   <div class="col-xs-4" style={{marginLeft: "50px", textAlign: "top"}}>
                       <br />
        <Row><h1 style={{fontWeight: "bolder", margin:"4mm", textTransform:"uppercase"}}> {details.name}</h1> {editIcon}</Row>
        <FontAwesomeIcon className="" icon={faUtensils} />{'  '}{details.cusine}
        <br/>
            {rating}

        <p> <FontAwesomeIcon className="" icon={faMapMarkerAlt} />{'  '}{details.location}{' - '} {details.zipcode}</p>
        <p> <FontAwesomeIcon className="" icon={faPhoneAlt} />{'  '}{details.contact}<span style={{marginLeft:"2cm"}}></span> <FontAwesomeIcon className="" icon={faEnvelope} />{'   '}{details.email}</p>
                       <div style={{overflow: "hidden"}}>
                           <p style={{float: "left", color: "green"}}>Open</p>
        <p style={{float: "left", marginLeft: "10px"}}><FontAwesomeIcon className="" icon={faClock} />{'   '}{details.timings}</p>
                       </div>
                       <div>
                       <p style={{float: "left"}}> {dservice} Dining In</p>
                           <p style={{float: "left", marginLeft:"15px"}}> {tkservice} <span>Take out</span></p>
                           <p style={{float: "left", marginLeft: "15px"}}> {ydservice} Delivery</p>
                       </div>
                       <br />
                       <br />
                       <div class="inline-block">
                        {order}
                       <Button href = '/viewevents' style = {{backgroundColor: "transparent", fontSize: "20px", border: '1px solid black', color: 'black', marginLeft:"1mm"}} variant="link"> Events   <FontAwesomeIcon className="" icon={faCalendarAlt} style={{height:"5mm", position:"center"}} /></Button> {' '}
                       <Button href = '/share' style = {{backgroundColor: "transparent", fontSize: "20px", border: '1px solid black', color: 'black'}} variant="link"> Share <FontAwesomeIcon className="" icon={faShareAlt} style={{height:"4mm", position:"center"}} /></Button>
                       </div>

<div className="row">
                       <div class='col-xs-6' style={{textAlign: "left", height: "100%", marginTop:"0.85cm", marginLeft: "0cm"}}>
                    <div style={{marginLeft: "10px"}}>
                       <Row>
                       <h3 style={{color:'black'}}>Menu</h3>
                       {icon}
                           </Row> 
                        
                        <hr />
                        <Menu />
                
                    </div>
                </div>
                <div class='col-xs-1' style={{textAlign: "left", height: "100%", borderLeft: "1px solid #e6e6e6", marginTop:"2.1cm", marginLeft: "1.5cm", float:"right"}}>
                    <div style={{marginLeft: "10px"}}>
                        <h6 style={{color:'Gray'}}> Review Hightlights</h6>
                        <hr />
                        <Review/>
                
                    </div>
                </div>
                </div>
                       {/* <Col xs="6">
        <Row><h3 style={{marginLeft:"0mm"}}> Menu </h3> {icon}</Row>
                       <Menu />
                       <h6> </h6>
                       <br /> </Col>

                       <br/>
                       <hr />
                       <Col xs="1">
                       <h4> Review Hightlights</h4>
                       <Review />
                       <br /> </Col> */}
                   </div>
                   </div>
                </div>
        
        )
    }
    }
    export default withApollo(Resinfo);



    // export default graphql(getRestaurantProfileBasic, {
    //     options: {
    //       variables: { id: localStorage.getItem("user_id") },
    //       fetchPolicy: 'network-only',
    //     }
    //   },
    // )(Resinfo);