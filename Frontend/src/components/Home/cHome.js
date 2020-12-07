import React, {Component} from 'react';
import '../../App.css';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import CusLP from '../Profile/cusLP'


class cHome extends Component {
    render(){
        let redirectVar = null;
        if(!cookie.load('cookie')){
            redirectVar = <Redirect to= "/login"/>
        } else {
            redirectVar = <Redirect to = "/chome"/>
        }
        return(
            <div>
                {redirectVar}
              <CusLP/>
            </div>
        )
    }
}
//export Home Component
export default cHome;