import React, { Component, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import firebase_resources from './config'
import history from './history';

    const Login = ({setAuthenticated}) => {

      const [email, setEmail] = useState('')
      const [password, setPassword] = useState('')
      const handleClick = (event) => {
        event.preventDefault();
  
        firebase_resources[0].auth().signInWithEmailAndPassword(email, password)
          .then((u)=> {
              setAuthenticated(true)
              history.push('/home?'+"user="+email)
          })
          .catch((err)=>{
              alert("invalid Password or Email entered")
              console.log(err.toString());
          })
      };
  
          return (
            <div className="form-container">
              <div className="form-content-left">
                <div className ="center">
                <h1>Login Now!</h1>
                <p> Access your personal repository and view the feed!</p>
                </div>
              </div>
            <div className="form-content-right">
              <form className="form-register">
                
                <div className="form-inputs">
                  <input
                  type="email"
                  name="email"
                  className="form-input"
                  placeholder="Enter your Email"
                  onChange = {(event) => setEmail(event.target.value)}></input>
                </div>
                
                <div className="form-inputs">
                  <input
                  type="password"
                  name="password"
                  className="form-input"
                  placeholder="Enter you Password"
                  onChange = {(event) => setPassword(event.target.value)}></input>
                </div>
                <button label="Login" className="submitBtn" onClick={(event) => handleClick(event)}> Login </button>
  
                <span className="go-to-login">
                  Don't have an account? Click <a href='/register'>here</a> to register
                </span>
              </form>
            </div>
            </div>
            
          );
      }

    


export default Login;
