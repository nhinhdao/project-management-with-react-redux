import React, { Component } from 'react';
import WelcomePage from './components/WelcomePage';
import Homepage from './components/Homepage';
import { BrowserRouter as Router, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <React.Fragment>
            <Route exact path="/login" component={WelcomePage} />
              <Route exact path="/" component={Homepage} />
          </React.Fragment>
        </Router>
      </div>
    );
  }
}

export default App;