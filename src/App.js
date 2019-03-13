import React, { Component } from 'react';
import WelcomePage from './components/WelcomePage';
import Homepage from './components/Homepage';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
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