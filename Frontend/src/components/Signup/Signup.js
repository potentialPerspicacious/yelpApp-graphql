import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import { Grid, Row, Col } from 'react-bootstrap';
import Banner from '../Navigationbar/banner'
import {customerSignup} from '../../actions/signup'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'



class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    submitSignup = (e) => {
        //prevent page from refresh
        e.preventDefault();
        const data = {
            fname: this.state.fname,
            lname: this.state.lname,
            email: this.state.email,
            password: this.state.password,
            zipcode: this.state.zipcode,
            email: this.state.email,
            month: this.state.month,
            date: this.state.date,
            year: this.state.year
        }
        console.log(data)
        this.props.customerSignup(data);

        this.setState({
            signupFlag: 1
        });
    }


    render(){
        let redirectVar = null;
        let error = {
            message: null
        }
        let success = {
            message: null
        }
        if(cookie.load('cookie')){
            redirectVar = <Redirect to="/chome"/>
        } else {
            redirectVar = <Redirect to = "/signup"/>
        }
        if(this.props.description == 'USER_ADDED'){
            success.message = 'Successfully added the new user.'
            console.log('Success')
            setTimeout(function() {window.location = '/login'}, 500);
        } else if (this.props.description == 'USER_EXISTS'){
            error.message = 'User already exists please add a different one.'
            setTimeout(function() {window.location = '/signup-restaurant'}, 500);
        }
        return(
        <div>
            <Banner />
                 <div className="form">
                            <div class="login-form signupform">
                            <div class="main-div signupform">
                        <div class="panel ">
                            <h2>Sign Up for Yelp</h2>
                        </div>
                        <div class="row">
                        <div class="form-group col-md-6">
                            <label class="label-form"> Enter your first name</label>
                                <input type="text" class="form-control" name="fname" placeholder="First Name" style={{color:"black"}} onChange = {this.onChange}/>
                               </div> 
                                <div class="form-group col-md-6">
                                <label class="label-form"> Enter your last name</label>
                                <input type="text" class="form-control" name="lname" placeholder="Last Name" style={{color:"black"}} onChange = {this.onChange}/>
                            </div>
                            </div>
                            <div class="form-group">
                            <label class="label-form"> Enter your email</label>
                                <input type="email" class="form-control" name="email" placeholder="Email" style={{color:"black"}} onChange = {this.onChange}/>
                            </div>
                            <div class="row">
                            <div class="form-group col-md-6">
                            <label class="label-form"> Enter your desired password</label>
                                <input type="password" class="form-control" name="password" placeholder="Password" style={{color:"black"}} onChange = {this.onChange}/>
                            </div>

                            <div class="form-group col-md-6">
                            <label class="label-form"> Please confirm your password</label>
                                <input type="password" class="form-control" name="cpassword" placeholder="Password" style={{color:"black"}} onChange = {this.onChange}/>
                            </div>
                            </div>
                            <div class="form-group">
                                <p>
                                    <label class="label-form"> Enter your zip code</label>
                                <input type="text" class="form-control" name="zipcode" placeholder="Zipcode" style={{color:"black"}} onChange = {this.onChange}/>
                                </p>
                            </div>
                            
                            <div class="row">
                            <div class="form-group col-sm-4">
                            <label class="label-form"> Enter your Birthday</label>
                            <select class="form-control" onChange = {this.onChange} name="month">
                            <option selected>Month</option>
                            <option value="January">January</option>
<option value="Febuary">Febuary</option>
<option value="March">March</option>
<option value="April">April</option>
<option value="May">May</option>
<option value="June">June</option>
<option value="July">July</option>
<option value="August">August</option>
<option value="September">September</option>
<option value="October">October</option>
<option value="November">November</option>
<option value="December">December</option>
                            </select>
                            </div>

                            <div class="form-group col-sm-4 dob-form">
                            <select class="form-control" onChange = {this.onChange} name="date">
                            <option selected>Day</option>
                            <option value="1">1</option>
<option value="2">2</option>
<option value="3">3</option>
<option value="4">4</option>
<option value="5">5</option>
<option value="6">6</option>
<option value="7">7</option>
<option value="8">8</option>
<option value="9">9</option>
<option value="10">10</option>
<option value="11">11</option>
<option value="12">12</option>
<option value="13">13</option>
<option value="14">14</option>
<option value="15">15</option>
<option value="16">16</option>
<option value="17">17</option>
<option value="18">18</option>
<option value="19">19</option>
<option value="20">20</option>
<option value="21">21</option>
<option value="22">22</option>
<option value="23">23</option>
<option value="24">24</option>
<option value="25">25</option>
<option value="26">26</option>
<option value="27">27</option>
<option value="28">28</option>
<option value="29">29</option>
<option value="30">30</option>
<option value="31">31</option>
                            </select>
                            </div>

                            <div class="form-group col-sm-4 dob-form">
                            <select class="form-control" onChange = {this.onChange} name="year">
                            <option selected>Year</option>
                            <option value="2020">2020</option>
<option value="2019">2019</option>
<option value="2018">2018</option>
<option value="2017">2017</option>
<option value="2016">2016</option>
<option value="2015">2015</option>
<option value="2014">2014</option>
<option value="2013">2013</option>
<option value="2012">2012</option>
<option value="2011">2011</option>
<option value="2010">2010</option>
<option value="2009">2009</option>
<option value="2008">2008</option>
<option value="2007">2007</option>
<option value="2006">2006</option>
<option value="2005">2005</option>
<option value="2004">2004</option>
<option value="2003">2003</option>
<option value="2002">2002</option>
<option value="2001">2001</option>
<option value="2000">2000</option>
<option value="1999">1999</option>
<option value="1998">1998</option>
<option value="1997">1997</option>
<option value="1996">1996</option>
<option value="1995">1995</option>
<option value="1994">1994</option>
<option value="1993">1993</option>
<option value="1992">1992</option>
<option value="1991">1991</option>
<option value="1990">1990</option>
<option value="1989">1989</option>
<option value="1988">1988</option>
<option value="1987">1987</option>
<option value="1986">1986</option>
<option value="1985">1985</option>
<option value="1984">1984</option>
<option value="1983">1983</option>
<option value="1982">1982</option>
<option value="1981">1981</option>
<option value="1980">1980</option>
<option value="1979">1979</option>
<option value="1978">1978</option>
<option value="1977">1977</option>
<option value="1976">1976</option>
<option value="1975">1975</option>
<option value="1974">1974</option>
<option value="1973">1973</option>
<option value="1972">1972</option>
<option value="1971">1971</option>
<option value="1970">1970</option>
<option value="1969">1969</option>
<option value="1968">1968</option>
<option value="1967">1967</option>
<option value="1966">1966</option>
<option value="1965">1965</option>
<option value="1964">1964</option>
<option value="1963">1963</option>
<option value="1962">1962</option>
<option value="1961">1961</option>
<option value="1960">1960</option>
<option value="1959">1959</option>
<option value="1958">1958</option>
<option value="1957">1957</option>
<option value="1956">1956</option>
<option value="1955">1955</option>
<option value="1954">1954</option>
<option value="1953">1953</option>
<option value="1952">1952</option>
<option value="1951">1951</option>
<option value="1950">1950</option>
<option value="1949">1949</option>
<option value="1948">1948</option>
<option value="1947">1947</option>
<option value="1946">1946</option>
<option value="1945">1945</option>
<option value="1944">1944</option>
<option value="1943">1943</option>
<option value="1942">1942</option>
<option value="1941">1941</option>
<option value="1940">1940</option>
<option value="1939">1939</option>
<option value="1938">1938</option>
<option value="1937">1937</option>
<option value="1936">1936</option>
<option value="1935">1935</option>
<option value="1934">1934</option>
<option value="1933">1933</option>
<option value="1932">1932</option>
<option value="1931">1931</option>
<option value="1930">1930</option>
                            </select>

                            </div>
                            </div>

                            <button class="btn btn-primary" onClick = {this.submitSignup}>Register</button>  
                            <div class="row mb-4 px-3 register"> 
                            <medium class="font-weight">Own a restaurant? <a href="/signup-restaurant" style={{marginRight:"0.1cm"}}>Register</a></medium> 
                            <medium class="font-weight reregister"> | Already a member? <a href="/login">Login</a></medium> 
                            </div>
                        </div>
                        <div>
                        {error.message && <div className='alert alert-danger'>{error.message}</div>}
                        {success.message && <div className='alert alert-success'>{success.message}</div>}
                        </div>
                    </div>
                    </div>
                    <div className="lico">
                        <img src='https://s3-media0.fl.yelpcdn.com/assets/2/www/img/7922e77f338d/signup/signup_illustration.png' style={{ height: '50' }} alt='loginYelp' />
                    </div>
        </div>
        )
    }
}
Signup.propTypes = {
    customerSignup: PropTypes.func.isRequired,
    description: PropTypes.object.isRequired

};

const mapStateToProps = state => ({
    description: state.customersignup.description
});

export default connect(mapStateToProps, {customerSignup})(Signup);