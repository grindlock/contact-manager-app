import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Navbar, Nav, Button, ButtonToolbar } from 'react-bootstrap';
import { RouteButton } from './Components';
import { Routes } from './Routes';
import axios from 'axios';
//import { Intro } from './Pages';
//import { AccessScreen } from './Pages';
//import { NavHeader } from './Components';

class App extends Component {
  constructor(props){
    super(props);
    this.setUser = this.setUser.bind(this);
    this.userHasAuthenticated = this.userHasAuthenticated.bind(this);
    this.setUsername = this.setUsername.bind(this);
    //this.logout = this.logout.bind(this);
    this.state={
      name:'',
      _userName:'',
      isAuthenticated: false,
      isAuthenticating: true,
      response:''};
  }



setUsername(userName){
  this.setState({_userName:userName});
}
setUser(name){
  this.setState({name:name});
}

userHasAuthenticated (authenticated){
  this.setState({ isAuthenticated: authenticated });
}

setMessage(response){
  this.state.response;
}

handleLogout = event => {
  axios.get("/logout")
  .then( (response) =>{this.userHasAuthenticated(false)
      ///this.setState({response:response.data});
      this.props.history.push("/");

  }).catch( (error) => {error} )
  //this.userHasAuthenticated(false);
  //this.props.history.push("/");
}
render(){
  const childProps = {
    isAuthenticated: this.state.isAuthenticated,
    userHasAuthenticated: this.userHasAuthenticated,
    setUsername: this.setUsername,
    id: this.state._userName, 
    setUser: this.setUser, 
    nombre:this.state.name
  };
      return(
        <div>
          <Navbar inverse fluid style={{height:70, padding:8}} >
            <Navbar.Header>
              <Navbar.Brand style={{fontSize:'2em'}}>
                <Link to="/">Contact Manager</Link>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>

            <Navbar.Collapse>
      			   <Navbar.Text>
                  {this.state._userName!=''?"Welcome, "+this.state.name:''}
               </Navbar.Text>
               <Nav pullRight style={{ padding:8}}>
               {
                 this.state.isAuthenticated
                 ?
                  <Button href=""
                    bsStyle={"danger"}
                    onClick={ this.handleLogout }
                    >Logout</Button>
                  :
                    <ButtonToolbar>
                    <RouteButton href="/login"
                    bsStyle={"default"}
                    >Login</RouteButton>
                    <RouteButton href="/register"
                    bsStyle={"default"}
                    >Register</RouteButton>
                  </ButtonToolbar>
                  }
               </Nav>
            </Navbar.Collapse>
          </Navbar>

        <Routes childProps={ childProps }/>
      {/*<AccessScreen setUser={this.setUser}/>*/}
        </div>
    );
  }
}
export default withRouter(App);
