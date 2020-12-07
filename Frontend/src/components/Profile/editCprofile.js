import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import Banner from '../Navigationbar/banner'
import {Button} from 'react-bootstrap'
import ImageUploader from 'react-images-upload';
import backendServer from "../../webConfig"
import { graphql } from 'react-apollo';
import { editCprofile } from '../../mutation/mutations';
import {getCustomerProfileBasic} from '../../queries/queries'
import { withApollo } from 'react-apollo';
import { compose } from 'recompose';



class EditcProfile extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            profileBasic: {},
            profileAdv: {},
            pictures: []
        }
        
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    goBack= () => {
        window.location = '/cprofile'
   }

componentWillMount = async ()=> {
    const { data } = await this.props.client.query({
        query: getCustomerProfileBasic,
            variables: { id: localStorage.getItem("user_id") },
            fetchPolicy: 'network-only',
      });
      console.log(data)
      this.setState({profileBasic: data.customer})
      this.setState({profileAdv: data.customerProfile})

}
onImageChange = (e) => {
    this.setState({
        pictures: this.state.pictures.concat(e),

    });
}

onUpload = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", this.state.pictures[0]);
    const uploadConfig = {
        headers: {
            "content-type": "multipart/form-data"
        }
    };
    axios.post(`${backendServer}/uploads/user/${localStorage.getItem("user_id")}`, formData, uploadConfig)
        .then(response => {
            alert("Image uploaded successfully!");
            this.setState({
                fileText: "Choose file...",
                user_image: response.data
            });
        })
        .catch(err => {
            console.log("Error");
        });
}

    updateProfile = async(e) => {
        e.preventDefault();
        console.log(localStorage.getItem("user_id"))
        let details = Object.assign(this.state.profileBasic, this.state.profileAdv)
        let mutationResponse = await this.props.editCprofile({
            variables: {
                _id: localStorage.getItem("user_id"),
                fname: this.state.fname || details.fname,
                lname: this.state.lname || details.lname,
                gender: this.state.gender || details.gender,
                headline: this.state.headline || details.headline,
                city: this.state.city || details.city,
                email: this.state.email || details.email,
                zipcode: this.state.zipcode || details.zipcode,
                address: this.state.address || details.address,
                contact: this.state.contact || details.contact,
                nickname: this.state.nickname || details.nickname,
                yelptime: this.state.yelptime || details.yelptime,
                hobbies: this.state.hobbies || details.hobbies,
                about: this.state.about || details.about,
                social: this.state.social || details.social,
            }
        });
        let response = mutationResponse.data.editCprofile;
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
        const error = {
            message: null
        }
        const success = {
            message: null
        }

        let details = Object.assign(this.state.profileBasic, this.state.profileAdv)
        let message = this.state.data;
        if(message == 'USER_UPDATED'){
            success.message = 'Successfully updated the user.'
            setTimeout(function() {window.location = '/cprofile'}, 1000);
        }
        return(
            <div>
                <Banner/>
                <center>
            <div className="form">
                       <div class="login-form signupform">
                       <div class="main-div signupform">
                   <div class="panel ">
                       <h2>Edit Your Yelp Profile</h2>
                   </div>
                   <br />
        
                   <div class="form-group">
                       <label class="label-form"> Upload/Change your image</label>
 <form onSubmit={this.onUpload}><br />
                                    <div class="custom-file" style={{width: "80%"}}>
                                    <ImageUploader
                withIcon={true}
                buttonText='Choose an image'
                onChange={this.onImageChange}
                imgExtension={['.jpg', '.gif', '.png', '.gif']}
                maxFileSize={5242880}
                name='image'
            />                                    
            </div><br/><br/><br /><br /><br/>
                                    <Button variant='link' type="submit">Upload</Button>
                                </form>
            
                       </div>
                       <div class="row">
                        <div class="form-group col-md-6">
                       <label class="label-form"> Edit your First name</label>
                           <input defaultValue={details.fname} onChange = {this.onChange} type="name" class="form-control" name="fname" placeholder="First Name" style={{color:"black"}} />
                       </div>
                       <div class="form-group col-md-6">
                       <label class="label-form"> Edit your Last name</label>
                           <input defaultValue={details.lname} onChange = {this.onChange} type="name" class="form-control" name="lname" placeholder="Last Name" style={{color:"black"}} />
                       </div>
                       </div>
                       <div class="form-group">
                       <label class="label-form"> Gender</label>
                           <input onChange = {this.onChange} type="email" class="form-control" name="gender" placeholder="Gender Identity" style={{color:"black"}} defaultValue={details.gender}/>
                       </div>
                       <div class="form-group">
                       <label class="label-form"> Profile headline</label>
                           <input onChange = {this.onChange} type="email" class="form-control" name="headline" placeholder="Headline" style={{color:"black"}} defaultValue={details.headline}/>
                       </div>
                       <div class="form-group">
                       <label class="label-form"> City </label>
                           <input onChange = {this.onChange} type="email" class="form-control" name="city" placeholder="City" style={{color:"black"}} defaultValue={details.city}/>
                       </div>
                       <div class="form-group">
                       <label class="label-form"> Edit your email</label>
                           <input onChange = {this.onChange} type="email" class="form-control" name="email" placeholder="Email" style={{color:"black"}} defaultValue={details.email}/>
                       </div>
                       <div class="form-group">
                       <label class="label-form"> Add/Edit your address</label>
                           <input onChange = {this.onChange} type="name" class="form-control" name="address" placeholder="Address" style={{color:"black"}} defaultValue={details.address}/>
                       </div>
                       <div class="row">
                       <div class="form-group col-md-6">
                       <label class="label-form"> Edit your zipcode</label>
                           <input onChange = {this.onChange} type="name" class="form-control" name="zipcode" placeholder="Zipcode" style={{color:"black"}} defaultValue={details.zipcode}/>
                       </div>


                       <div class="form-group col-md-6">
                       <label class="label-form"> Contact number</label>
                           <input onChange = {this.onChange}  type="name" class="form-control" name="contact" placeholder="Contact" style={{color:"black"}} defaultValue={details.contact}/>
                       </div>
                       </div>
                       <div class="form-group">
                       <label class="label-form"> Nick name</label>
                           <input onChange = {this.onChange} type="name" class="form-control" name="nickname" placeholder="I like to be called..." style={{color:"black"}} defaultValue={details.nickname}/>
                       </div>

                       <div class="form-group">
                       <label class="label-form"> Yelp time</label>
                           <input onChange = {this.onChange} type="name" class="form-control" name="yelptime" placeholder="Yelping since..." style={{color:"black"}} defaultValue={details.yelptime}/>
                       </div>
                       <div class="form-group desadd">
                       <label class="label-form"> Hobbies</label>
                           <input onChange = {this.onChange} type="name" class="form-control" name="hobbies" placeholder="Things I love..." style={{color:"black"}} defaultValue={details.hobbies}/>
                       </div>
                       <div class="form-group desadd">
                       <label class="label-form"> Tell us about yourself</label>
                           <input onChange = {this.onChange} type="name" class="form-control" name="about" placeholder="When I'm not yelping..." style={{color:"black"}} defaultValue={details.about}/>
                       </div>
                       <div class="form-group desadd">
                       <label class="label-form"> Add/Edit Social profile</label>
                           <input onChange = {this.onChange} type="name" class="form-control" name="social" placeholder="Blogs, Websites..." style={{color:"black"}} defaultValue={details.social}/>
                       </div>

                       <div class="row">
                        <div class="col-md-6">
                       <button class="btn btn-secondary col-md-6" onClick = {this.updateProfile}>Update</button>  
                       </div>
                       <div class="col-md-6">
                       <button class="btn btn-primary col-md-6" onClick = {this.goBack}>Cancel</button> 
                       </div> 
                        </div>
                        {error.message && <div className='alert alert-danger'>{error.message}</div>}
                        {success.message && <div className='alert alert-success'>{success.message}</div>}
                        </div>
                    </div>
                    </div>
                    </center>

        </div>
        )
    }
}

  export default compose(
    withApollo,
    graphql(editCprofile, { name: "editCprofile" })   
  )(EditcProfile);
