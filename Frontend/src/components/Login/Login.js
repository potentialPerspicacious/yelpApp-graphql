import React, {Component} from 'react';
import '../../App.css';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {Row, Col } from 'react-bootstrap';
import Banner from '../Navigationbar/banner'
import { graphql } from 'react-apollo';
import { loginMutation } from '../../mutation/mutations';


class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            username : "",
            password : "",
            isOwner: "off",
            authFlag : false
        }
        this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.isOwner = this.isOwner.bind(this);

        this.submitLogin = this.submitLogin.bind(this);
    }
    componentWillMount(){
        this.setState({
            authFlag : false
        })
    }
    usernameChangeHandler = (e) => {
        this.setState({
            username : e.target.value
        })
    }
    passwordChangeHandler = (e) => {
        this.setState({
            password : e.target.value
        })
    }
    isOwner = (e) => {
        this.setState({
            isOwner: e.target.value

        }) 
    
    }
    submitLogin = async (e) => {

        e.preventDefault();
        let mutationResponse = await this.props.loginMutation({
            variables: {
                email: this.state.username,
                password: this.state.password,
                isOwner: this.state.isOwner
            }
        });
        let response = mutationResponse.data.login;
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

    render(){
        console.log(this.state.data)
        let success_message, user_id;
        if(this.state.data){
            success_message = this.state.data.split("SecretSplitHere")[0]
            user_id = this.state.data.split("SecretSplitHere")[1]
        }


        const isowner = this.state.isOwner
        localStorage.setItem("isOwner", isowner);
        const error = {
            message: null
        }
        let redirectVar = null;
        if(this.state.isOwner === 'on'){
            if (success_message === "Successful Login"){
                cookie.save("cookie")
                localStorage.setItem("user_id", user_id);
                localStorage.setItem("type", 'restaurant')
                redirectVar = <Redirect to= "/rhome"/>
            } 
        }
        else if(this.state.isOwner === 'off') {
            if(success_message === "Successful Login"){
                cookie.save("cookie")
                localStorage.setItem("type", 'customer')
                localStorage.setItem("user_id", user_id);
                redirectVar = <Redirect to= "/chome"/>
            }
            }
        else {
            redirectVar = <Redirect to= "/login"/>
        }
        if(this.props.description == 'INCORRECT_PASSWORD'){
            error.message = 'Invalid username/password.'
            setTimeout(function() {window.location = '/login'}, 2000);
        } else if(this.props.description == 'NO_USER'){
            error.message = 'User does not exists. Please signup.'
            setTimeout(function() {window.location = '/login'}, 2000);
        }

        return(
            <div>
            {redirectVar}
            <div>
                <Banner/>
                {/* <Grid> */}
                <Row>
                    <Col>
                        <div className="lgform">
                            <div class="login-form">
                    <div class="main-div">
                        <div class="panel">
                            <h2>Sign in to Yelp</h2>
                            <p>Enter username/email and password</p>
                        </div>
                        
                            <div class="form-group">
                                <p>
                                <input onChange = {this.usernameChangeHandler} type="text" class="form-control" name="username" placeholder="Username/Email" style={{color:"black"}}/>
                                </p>
                            </div>
                            <div class="form-group">
                                <input onChange = {this.passwordChangeHandler} type="password" class="form-control" name="password" placeholder="Password" style={{color:"black"}}/>
                            </div>
        
                                <Row className="" style={{marginLeft:"1mm"}}>
                                <p> Check if owner </p>
                                    <input onChange = {this.isOwner} type="checkbox" name="isowner" placeholder="" style={{marginTop:"2mm", marginLeft:"1mm"}}/> 

                                </Row>

                            <button onClick = {this.submitLogin} class="btn btn-primary">Login</button>  
                            
                            <div class="row mb-4 px-3 registerlogin"> 
                            <medium class="font-weight">Don't have an account? <a href="/signup">Register</a></medium> 
                            </div>    
           
                    </div>
                    {error.message && <div className='alert alert-danger'>{error.message}</div>}
                            </div>

                        </div>

                    </Col>
                    <div className="lico">
                    <Col>
                        <img src='https://s3-media0.fl.yelpcdn.com/assets/2/www/img/7922e77f338d/signup/signup_illustration.png' style={{ height: '50' }} alt='loginYelp' />
                    </Col>
                    </div>
                </Row>
                {/* </Grid> */}
            </div>

        </div>
        )
    }
}

export default graphql(loginMutation, { name: "loginMutation" })(Login);
