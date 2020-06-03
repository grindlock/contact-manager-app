import React, { Component } from 'react';
import './Styles/Intro.css';
import {
  Jumbotron,
} from 'react-bootstrap';

class Intro extends Component{
  render(){
    return(

      <div className="Home">
        <div className="lander">
          <h1>Contact Manager</h1>
          <p>A simple contact app</p>
        </div>
      </div>
    );
  }
}

export { Intro };
