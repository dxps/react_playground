import React, { Component } from 'react';
import './App.css';
import UserInput from './UserInput/UserInput';
import UserOutput from './UserOutput/UserOutput';

class App extends Component {

  state = {
    username: ''
  }

  usernameChangeHandler = (event) => {
    this.setState({ username: event.target.value });
    // console.log("usernameChangeHandler> username=" + this.state.username);
  }

  render() {
    return (
      <div className="App">
        <UserInput username={this.state.username} 
                   usernameChangeHandler={this.usernameChangeHandler} />
        <UserOutput username={this.state.username} />
        <UserOutput username={this.state.username} />
      </div>
    );
  }

}

export default App;
