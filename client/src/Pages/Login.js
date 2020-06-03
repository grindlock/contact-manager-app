import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import {
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  Col,
  Button,
  Checkbox,
  Jumbotron,
  Collapse,
  Well
} from 'react-bootstrap';

var emailVal = false, passVal = false;

class Login extends Component {
constructor(props){
  super(props);
  this.state = {
    email:'',
    password:'',
    response:'',
    _userId:''
  };
}


  /** This will come handy when retriving the contact list
    componentDidMount() {
    fetch('/users')
      .then(res => res.json())
      .then(users => this.setState({ users }));
  }**/

  onChange = (e) => {
    const newState = this.state;
    newState[e.target.name] = e.target.value;
    this.setState(newState);
  }

  emailValidation(){
    var ans = null;
    const input = this.state.email;
    var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,6})+$/;
    if(input.length > 0){
      if(regex.test(input)){
        emailVal = true;
        ans = 'success';
      }
      else{
        emailVal = false;
        ans = 'error';
      }
    }
    else{
      emailVal = false;
    }
    //console.log("emailVal "+emailVal+" passVal "+passVal);
    return ans;
  }
//Needs work to handle
  passwordValidation(){
    var ans = null;
    const input = this.state.password;
    var regex = /^(?=.*[@!?#$])(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z]).{6,}$/;

    if(input.length > 0 ){
      if(regex.test(input)){
        passVal = true;
        ans = 'success';
      }
      else{
        passVal = false;
        ans = 'error';
      }
    }
    else {
      passVal = false;
    }

    //console.log("emailVal "+emailVal+" passVal "+passVal);
    return ans;
  }


  onSubmit = async event => {
    event.preventDefault();
    if(emailVal || passVal){

      //console.log(this.state.password);


      var data = {};
      var url = '/login';
        data={
        "email":this.state.email,
        "password":this.state.password
        }
        this.setState({email:'', password:''});


        //var post = JSON.stringify(data);
        var sendUrl = "http://localhost:3001"+url;

        //this.props.setUser(this.state.userName);
       
        console.log(this.props.history);
var status;
      axios.post(url, data)
        .then(result => {
         console.log("result id",result.data.id);
              //status =result.status;
              console.log("username 1", result);
                this.props.setUsername(result.data.id);
                this.props.setUser(result.data.fname);
               console.log("username2 ", this.state._userId);
               this.props.userHasAuthenticated(true);
              this.props.history.push('/dashboard');
              
        })
        .catch(error => {         
          this.setState({response:error.data}) 
        }
      );
      console.log("username", this.state._userId);
        
        //this.props.setUsername(this.state._userId);
        //this.props.history.push("/dashboard");
      
    }
  }

  render() {
    const { email, password, password2, fname, lname, phone } = this.state;
    return (
      <div className="App">

        <Jumbotron className="content-body">

          <Col smOffset={3} sm={6} >
          <Well className="well">
            <h3>{this.state.response !== ''?this.state.response: "Welcome! Please Log in"}</h3>
          </Well>
          </Col>

        <Form horizontal
          onSubmit={ this.onSubmit }>

          <FormGroup controlId="formHorizontalEmail"
            validationState={this.emailValidation()}>
            <Col componentClass={ControlLabel}
              sm={2}
              smOffset={2}
              >Email:</Col>
            <Col sm={4}>
              <FormControl
                type="email"
                name="email"
                value={ email }
                placeholder="hello@myemail.com"
                onChange={ this.onChange }
                required/>
              <FormControl.Feedback />
            </Col>
          </FormGroup>

          <FormGroup
            controlId="formHorizontalPassword"
            validationState={ this.passwordValidation() }>
            <Col componentClass={ ControlLabel }
              sm={2} smOffset={2}>Password:</Col>
            <Col sm={4}>
              <FormControl
                type="password"
                name="password"
                value={ password }
                placeholder="******"
                onChange={ this.onChange }
                required/>
              <FormControl.Feedback />
            </Col>
        </FormGroup>



        <FormGroup>
          <Col smOffset={4} sm={4}>
            <Button type="submit"
              bsStyle="primary"
              className="login-sign_btn"
              id="lgInBtn"
              >Log In</Button>
          </Col>
        </FormGroup>
      </Form>
    </Jumbotron>


      </div>

    );
  }
}
export { Login };
