import React, {Component} from 'react';
import '../../App.css';
import Banner from '../Navigationbar/banner'
import {Col} from 'react-bootstrap';
import ImageUploader from 'react-images-upload';
import {Button} from 'react-bootstrap'
import { graphql } from 'react-apollo';
import { editRprofile } from '../../mutation/mutations';
import {getRestaurantProfileBasic} from '../../queries/queries'
import { withApollo } from 'react-apollo';
import { compose } from 'recompose';




class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            pictures: [] , 
            profileBasic: {},
            profileAdv: {},
            starttime: '7:00',
            closetime: '7:00',
        }
    }
    onChangeStartTime = starttime => this.setState({ starttime })
    onChangeCloseTime = closetime => this.setState({ closetime })

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    goBack= () => {
        window.location = '/rhome'
   }

componentDidMount= async () =>{
    // axios.get(`/profile/restaurant/${localStorage.getItem("user_id")}`)
    // .then(response => 
    //     {console.log(response.data)
    //         this.setState({
    //             profile: (response.data) 
                
    //         }); 
    //     })
    const { data } = await this.props.client.query({
        query: getRestaurantProfileBasic,
            variables: { id: localStorage.getItem("user_id") },
            fetchPolicy: 'network-only',
      });
      console.log(data)
      this.setState({profileBasic: data.restaurant})
      this.setState({profileAdv: data.restaurantProfile})

}

    updateProfile = async (e) => {
        //prevent page from refresh
        e.preventDefault();
        console.log(localStorage.getItem("user_id"))
        let details = Object.assign(this.state.profileBasic, this.state.profileAdv)
        let mutationResponse = await this.props.editRprofile({
            variables: {
                _id: localStorage.getItem("user_id"),
                rname: this.state.rname || details.name,
                email: this.state.email || details.email,
                zipcode: this.state.zipcode || details.zipcode,
                location: this.state.location || details.location,
                contact: this.state.contact || details.contact,
                cusine: this.state.cusine || details.cusine,
                description: this.state.description || details.description,
                timings: this.state.timings || details.timings,
                dinein: this.state.dinein || details.dinein,
                takeout: this.state.takeout || details.takeout,
                ydelivery: this.state.ydelivery || details.ydelivery
            }
        });
        let response = mutationResponse.data.editRprofile;
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
    onImageChange = (e) => {
        this.setState({
            pictures: this.state.pictures.concat(e),
    
        });
    }
 
        
    render(){
        let details = Object.assign(this.state.profileBasic, this.state.profileAdv)
        // console.log(details)
        const error = {
            message: null
        }
        const success = {
            message: null
        }
        // let details = this.state.profile;
        // console.log(this.props.description)
        console.log(this.state.data)
        if(this.state.data == 'USER_UPDATED'){
            success.message = 'Successfully updated the user.'
            setTimeout(function() {window.location = '/rhome'}, 1000);
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
                        <div class="form-group">
                       <label class="label-form"> Edit your restaurant name</label>
                           <input defaultValue={details.name} onChange = {this.onChange} type="name" class="form-control" name="rname" placeholder="Restaurant Name" style={{color:"black"}} />
                       </div>
                       <div class="form-group">
                       <label class="label-form"> Edit your email</label>
                           <input onChange = {this.onChange} type="email" class="form-control" name="email" placeholder="Email" style={{color:"black"}} defaultValue={details.email}/>
                       </div>
                       <div class="form-group">
                       <label class="label-form"> Add/Edit your address</label>
                           <input onChange = {this.onChange} type="name" class="form-control" name="location" placeholder="Address" style={{color:"black"}} defaultValue={details.location}/>
                       </div>
                       <div class="row">
                       <div class="form-group col-md-6">
                       <label class="label-form"> Edit your zipcode</label>
                           <input onChange = {this.onChange} type="name" class="form-control" name="zipcode" placeholder="Zipcode" style={{color:"black"}} defaultValue={details.zipcode}/>
                       </div>

                       <div class="form-group col-md-6">
                       <label class="label-form"> Add/Edit contact number</label>
                           <input onChange = {this.onChange}  type="name" class="form-control" name="contact" placeholder="Contact" style={{color:"black"}} defaultValue={details.contact}/>
                       </div>
                       </div>
                       <div class="form-group">
                       <label class="label-form"> Add/Edit restaurant timings</label>
                           <input onChange = {this.onChange} type="name" class="form-control" name="timings" placeholder="Timings" style={{color:"black"}} defaultValue={details.timings}/>
                       </div>
                       <left>
                       <div class="form-group">

                       <label class="label-form"> Add/Edit your restaurant services</label> <br />
<ol type="a">
                       <Col align="left" style={{marginTop:"3mm"}}>
                           <li>
                        <small>Does your restaurant provide dining-in service?</small>
                       <input onChange = {this.onChange} type="radio" name= "dinein" value="dinein" placeholder="" style={{marginLeft:"9.35mm"}}/> <small>Yes</small>
                       <input onChange = {this.onChange} type="radio" name= "dinein" value="no" placeholder="" style={{marginLeft:"3mm"}}/> <small>No</small>
                       </li>
                       </Col>
                       
                       <Col align="left" style={{marginTop:"3mm"}}>
                           <li>
                        <small>Does your restaurant provide take out service?</small>
                       <input onChange = {this.onChange} type="radio" name= "takeout" value="takeout" placeholder="" style={{marginLeft:"10.5mm"}}/> <small>Yes</small>
                       <input onChange = {this.onChange} type="radio" name= "takeout" value="no" placeholder="" style={{marginLeft:"3mm"}}/> <small>No</small>
                       </li>
                       </Col>
                       <Col align="left" style={{marginTop:"3mm"}}>
                           <li>
                        <small>Does your restaurant provide yelp delivery service?</small>
                       <input onChange = {this.onChange} type="radio" name= "ydelivery" value="ydelivery" placeholder="" style={{marginLeft:"3.35mm"}}/> <small>Yes</small>
                       <input onChange = {this.onChange} type="radio" name= "ydelivery" value="no" placeholder="" style={{marginLeft:"3mm"}}/> <small>No</small>
                       </li>
                       </Col>
                       </ol>
                                              </div>
                                              </left>
                       {/* <div class="row">
                       <div class="form-group col-md-6">
                       <label class="label-form ">Add/Edit opening time</label>
                       <TimePicker onChange={this.onChangeStartTime} start="7:00" end="23:00" step={30} value={this.state.starttime}/>
                        </div>
                        <div class="form-group col-md-6">
                       <label class="label-form">Add/Edit closing time</label>
                       <TimePicker onChange={this.onChangeCloseTime} start="7:00" end="23:00" step={30} value={this.state.closetime}/> </div>
                       </div> */}
                       <div class="form-group">
                       <label class="label-form"> Add/Edit your cusine type</label>
                           <input onChange = {this.onChange} type="name" class="form-control" name="cusine" placeholder="Cusines" style={{color:"black"}} defaultValue={details.cusine}/>
                       </div>
                       <div class="form-group desadd">
                       <label class="label-form"> Add/Edit your restaurant description</label>
                           <input onChange = {this.onChange} type="name" class="form-control" name="description" placeholder="About Restaurant" style={{color:"black"}} defaultValue={details.description}/>
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
// EditProfile.propTypes = {
//     editProfile: PropTypes.func.isRequired,
//     description: PropTypes.object.isRequired
// }

// const mapStateToProps = state => { 
//     return ({
//         description: state.edit.description
// })};
// export  default graphql(editRprofile, { name: "editRprofile" }) (EditProfile);
// export default withApollo(EditProfile);

export default compose(
    withApollo,
    graphql(editRprofile, { name: "editRprofile" })   
  )(EditProfile);
