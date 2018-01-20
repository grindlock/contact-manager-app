import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  state = {email:'', password:''};

  /**componentDidMount() {
    fetch('/users')
      .then(res => res.json())
      .then(users => this.setState({ users }));
  }**/

  onChange = (e) => {
    const newState = this.state;
    newState[e.target.name] = e.target.value;
    this.setState(newState);
  }

  onSubmit = (e) => {
    var post = {
      "email":this.state.email,
      "password":this.state.password
    }
    axios.post('http://localhost:3000/signup', post)
      .then(function (result){
        console.log(result);
        if(result.data.code === 200){
          console.log("HI");
        }

      })
      .catch(function (error) {
     console.log(error);
   });
  }

  render() {
    const { email, password } = this.state;
    return (
      <div className="App">
        <h1>Users</h1>
        <form onSubmit={ this.onSubmit }>
          <label>Email:</label>
          <input type="email" name="email" value={email} onChange={this.onChange}/>
          <label>Paswword:</label>
          <input type="password" name="password" value={password} onChange={this.onChange}/>
          <button type="submit">Login/sign Up</button>
        </form>
      </div>

    );
  }
}

export default App;
