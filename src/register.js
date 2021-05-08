import React, { Component } from "react";

class Register extends Component {
    constructor(props){
        super(props);
        this.state={
          first_name:'',
          last_name:'',
          email:'',
          password:'',
          password_confirm:'',
          error_first_name:'',
          error_last_name:'',
          error_email:'',
          error_password:'',
          error_pass_confirm:''
        }
      }

      handleClick(event){
        var error = false
        if(!this.state.first_name.trim()){
          this.setState({error_first_name: "First name required"})
          event.preventDefault();
          error = true;
        }else{
          this.setState({error_first_name: ""})
        }

        if(!this.state.last_name.trim()){
          this.setState({error_last_name: "Last name required"})
          event.preventDefault();
          error = true;
        }else{
          this.setState({error_last_name: ""})
        }

        if(!this.state.email.trim()){
          this.setState({error_email: "Email required"})
          event.preventDefault();
          error = true;
        }else if(!/\S+@\S+\.\S+/.test(this.state.email)){
          this.setState({error_email: "Invalid email entered"})
          event.preventDefault();
          error = true;
        }else{
          this.setState({error_email: ""})
        }

        if(this.state.password.length < 8){
          this.setState({error_password: "Your password must be more than 8 characters"})
          event.preventDefault();
          error = true;
        }else if(this.state.password!=this.state.password_confirm){
          this.setState({error_password: "Passwords don't match"})
          this.setState({error_pass_confirm: "Passwords don't match"})
          event.preventDefault();
          error = true;
        }else{
          this.setState({error_password: ""})
          this.setState({error_pass_confirm: ""})
        }
       
        if(error){
          return null
        }

        console.log(this.state)
        fetch('/add', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                email: this.state.email,
                password: this.state.password
            })
    }).then(res => res.json()).then(data => {
        if(data.userAdded){
            window.location = '/'
        }else{
            alert("User was not created, please try again!")
        }
    })  
    }
      render() {
        return (
          <div className="form-container">
            <div className="form-content-left">
              <div className ="center">
              <h1>Register Now!</h1>
              <p>Get access to a personal image repoistory and a feed of other users images!</p>
              </div>
            </div>
          <div className="form-content-right">
            <form className="form-register">
              <div className="form-inputs">
                <input
                type="text"
                name="first-name"
                className="form-input"
                placeholder="Enter your First Name"
                onChange = {(event) => this.setState({first_name: event.target.value})}></input>
                {!(this.state.error_first_name=='') && <p>{this.state.error_first_name}</p>}
              </div>
              <div className="form-inputs">
                <input
                type="text"
                name="last-name"
                className="form-input"
                placeholder="Enter your Last Name"
                onChange = {(event) => this.setState({last_name:event.target.value})}></input>
                {(!this.state.error_last_name=='') && <p>{this.state.error_last_name}</p>}
              </div>
              <div className="form-inputs">
                <input
                type="email"
                name="email"
                className="form-input"
                placeholder="Enter your Email"
                onChange = {(event) => this.setState({email:event.target.value})}></input>
                {(!this.state.error_email=='') && <p>{this.state.error_email}</p>}
              </div>
              <div className="form-inputs">
                <input
                type="password"
                name="password"
                className="form-input"
                placeholder="Enter a Password"
                onChange = {(event) => this.setState({password:event.target.value})}></input>
                {(!this.state.error_password=='') && <p>{this.state.error_password}</p>}
              </div>
              <div className="form-inputs">
                <input
                type="password"
                name="confirm-password"
                className="form-input"
                placeholder="Renter a Password"
                onChange = {(event) => this.setState({password_confirm:event.target.value})}></input>
                {(!this.state.error_pass_confirm=='') && <p>{this.state.error_pass_confirm}</p>}
              </div>
              <button label="Register" primary={true} className="submitBtn" onClick={(event) => this.handleClick(event)}> Sign Up! </button>
              <span className="go-to-login">
                Already have an account? Click <a href='/'>here</a> to login
              </span>
            </form>
          </div>
          </div>
        /**
    <div>
        <MuiThemeProvider>
          <div>
          
           <TextField
             hintText="Enter your First Name"
             floatingLabelText="First Name"
             onChange = {(event,newValue) => this.setState({first_name:newValue})}
             />
           <br/>
           <TextField
             hintText="Enter your Last Name"
             floatingLabelText="Last Name"
             onChange = {(event,newValue) => this.setState({last_name:newValue})}
             />
           <br/>
           <TextField
             hintText="Enter your Email"
             type="email"
             floatingLabelText="Email"
             onChange = {(event,newValue) => this.setState({email:newValue})}
             />
           <br/>
           <TextField
             type = "password"
             hintText="Enter your Password"
             floatingLabelText="Password"
             onChange = {(event,newValue) => this.setState({password:newValue})}
             />
           <br/>
           <RaisedButton label="Register" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
          </div>
         </MuiThemeProvider>
      </div>
       */
    );
  }
}


export default Register;
