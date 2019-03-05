import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import WelcomePage from './components/WelcomePage';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <span> Project Management </span>
        </header>
        <div>
          <WelcomePage />
        </div>
      </div>
    );
  }
}

export default App;
