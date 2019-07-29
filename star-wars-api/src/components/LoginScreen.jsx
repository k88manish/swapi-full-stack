import React, { Component } from 'react';
import helmetImage from '../assetts/helmet.png';
import axios from 'axios';
import { auth } from '../utils';
import './LoginScreen.css';
import { userAuthentication } from '../apiCall';

export default class LoginScreen extends Component {
  constructor(){
    super();
    this.state={
      username:'',
      password:'',
      errorFlag:false
    }
  }
  handleLogin=async ()=>{
    let {history} = this.props;
    let {username,password} = this.state;
    const userFound = await userAuthentication(username,password);
    console.log('Usrefoudnd',userFound);
    if(userFound){
      auth.login();
      history.push('/search');
    }else{
      this.setState({errorFlag:true})    
    }
    // await axios.post('/login', { username: this.state.username,
    // password: this.state.password}, {}).then(function(response) {
    //   if(response.data){
    //     auth.login();
    //     history.push('/search');
    //   }else{
    //    error=true;
    //   }
    // }).catch(function(error) {
    //   console.log('Error on Authentication',error);
    // });
    // this.setState({errorFlag:error})

  }
  handleChange=(field,e)=>{
    field === 'user'?this.setState({username:e.target.value}):this.setState({password:e.target.value});
  }
  render() {
    let {errorFlag} = this.state;
    return (
      <div className="container login-container">
        <img className="helmet-image" src={helmetImage} alt=""/>
        {errorFlag && <div className="alert alert-danger error-message" role="alert">
          Username or password is incorrect!
        </div>}
        <div className="row ">
          <input onChange={(e)=>this.handleChange('user',e)} className="col align-self-center user-input" type="text" placeholder="User name"/>
        </div>
        <div className="row ">
          <input onChange={(e)=>this.handleChange('pass',e)} className="col align-self-center user-input" type="text" placeholder="Password"/>
        </div>
        <div className="row ">
          <button onClick={this.handleLogin} className="btn btn-primary login-button" >Login</button>
        </div>
      </div>
         );
        }
      }