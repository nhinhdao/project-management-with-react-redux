import React, { Component } from 'react';
import WelcomePage from './components/WelcomePage';
import Homepage from './components/Homepage';
import { Router, Route, Switch} from 'react-router-dom';
import './App.css';
import history from './components/history'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router history={history}>
          <Switch>
            <Route exact path="/login" component={WelcomePage} />
            <Route exact path="/" component={Homepage} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;