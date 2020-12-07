import React, {Component} from 'react';
import '../../App.css';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import Banner from '../Navigationbar/banner'
import ImageUploader from 'react-images-upload';
import {Button} from 'react-bootstrap'
import { graphql } from 'react-apollo';
import { addMenuItem } from '../../mutation/mutations';



class AddItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            msg: {},
            pictures: [],
            image: {}
        };
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    addItem = async (e) => {
        e.preventDefault();
        let mutationResponse = await this.props.addMenuItem({
            variables: {
                _id: localStorage.getItem("user_id"),
                dishname: this.state.dishname,
                category: this.state.category,
                ingredients: this.state.ingredients,
                description: this.state.description,
                price: this.state.price,
            }
        });
        let response = mutationResponse.data.addItem;
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
    goBack= () => {
        window.location = '/rhome'
   }
   onImageChange = (e) => {
    this.setState({
        pictures: this.state.pictures.concat(e),

    });
}
onImageChange = (e) => {
    this.setState({
        pictures: this.state.pictures.concat(e),

    });
}

    render(){
        console.log(this.state.data)
        let message = this.state.msg
        let redirectVar = null;
        let error = {
            message: null
        }
        let success = {
            message: null
        }
        if(cookie.load('cookie')){
            redirectVar = <Redirect to="/rhome"/>
        } else {
            redirectVar = <Redirect to = "/menu/addItem"/>
        }
        if(this.state.data == 'ITEM_ADDED'){
            success.message = 'Successfully added the new dish.'
            setTimeout(function() {window.location = '/rhome'}, 1000);
        } else if (this.props.description == 'ITEM_EXISTS'){
            error.message = 'Dish already exists please add a different one.'
            setTimeout(function() {window.location = '/menu/addItem'}, 1000);
        }
        return(
            <div>
                <Banner/>
            <div className="form">
                       <div class="login-form additem">
                       <div class="main-div additem">
                   <div class="panel ">
                       <h2>Add a New Menu Item</h2>
                       <br />
                   </div>
                   <center>
                   <div class="form-group">
                       <label class="label-form"> Upload your dish image</label>
 <form><br />
                                    <div class="custom-file" style={{width: "80%"}}>
                                    <ImageUploader
                withIcon={true}
                buttonText='Choose an image'
                onChange={this.onImageChange}
                imgExtension={['.jpg', '.gif', '.png', '.gif']}
                maxFileSize={5242880}
                name='image'
                singleImage={true}
            />                                    
            </div><br/><br/><br /><br /><br/>
                                    <Button variant='link' type="submit">Upload</Button>
                                </form>
            
                       </div></center>
                   <div class="row">
                       <div class="form-group col-md-6">
                       <label class="label-form"> Enter dish name</label>
                           <input onChange = {this.onChange} type="text" class="form-control" name="dishname" placeholder="Pizza, Pasta, Egg Salad..." style={{color:"black"}}/>
                       </div>
                       <div class="form-group col-md-6">
                       <label class="label-form"> Enter dish type</label>
                           <input onChange = {this.onChange} type="text" class="form-control" name="category" placeholder="Appetizer, Desert..." style={{color:"black"}}/>
                       </div>
                       </div>
                       <div class="form-group">
                       <label class="label-form"> Add dish ingredients</label>
                           <input onChange = {this.onChange} type="text" class="form-control" name="ingredients" placeholder="Ingredients" style={{color:"black"}}/>
                       </div>

                       <div class="form-group">
                       <label class="label-form"> Kindly describe your dish</label>
                           <input onChange = {this.onChange}  type="text" class="form-control" name="description" placeholder="Description" style={{color:"black"}}/>
                       </div>
                       <div class="form-group">
                           <p>
                               <label class="label-form"> Price your dish</label>
                           <input onChange = {this.onChange} type="text" class="form-control" name="price" placeholder="Price" style={{color:"black"}}/>
                           </p>
                       </div>
                       <div class="row">
                        <div class="col-md-6">
                       <button class="btn btn-secondary col-md-6" style={{marginLeft:"3.3cm"}} onClick = {this.addItem}>Add Dish</button>  
                       </div>
                       <div class="col-md-6">
                       <button class="btn btn-primary col-md-6" onClick = {this.goBack}>Cancel</button> 
                       </div> 
                        </div>                        </div>
                        <div>
                        {error.message && <div className='alert alert-danger'>{error.message}</div>}
                        {success.message && <div className='alert alert-success'>{success.message}</div>}
                        </div>
                    </div>
                    </div>
        </div>
        )
    }
}


export default graphql(addMenuItem, { name: "addMenuItem" })(AddItem);
