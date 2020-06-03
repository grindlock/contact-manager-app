import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { RouteButton } from './RouteButton';

const NavHeader = ({onPress, user, isAuthenticated}) =>{

  return(
    <Navbar inverse fluid style={{height:70, padding:8}} >
      <Navbar.Header>
        <Navbar.Brand style={{fontSize:'2em'}}>
          <Link to="/">Contact Manager</Link>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>

      <Navbar.Collapse>
			   <Navbar.Text>
          { user }
         </Navbar.Text>
         <Nav pullRight style={{ padding:8}}>
         {this.state.isAuthenticated
           ?
           <RouteButton href="/login_register"
           bsStyle={"default"}
           >Login / Register</RouteButton>
           :
            <Button
              bsStyle={"danger"}
              onClick={ this.handleLogout }
              >Logout</Button>
            }
         </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export { NavHeader };
