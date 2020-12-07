import React, {Component} from 'react';
import '../../App.css';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import  Navbar  from '../Navigationbar/Navbar';
import Resinfo from '../Profile/resinfo';

class rHome extends Component {
    render(){
        let redirectVar = null;
        if(!cookie.load('cookie')){
            redirectVar = <Redirect to= "/login"/>
        } else {
            redirectVar = <Redirect to = "/rhome"/>
        }
        return( 
            <div>
                {redirectVar}
                <Navbar />
                <Resinfo />
            </div>

        )
    }
}
//export Home Component
export default rHome;