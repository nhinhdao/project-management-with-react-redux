import React, { Component} from 'react';
import "react-datepicker/dist/react-datepicker.css";
import {Route} from 'react-router-dom';
import ProjectPage from './ProjectPage';
import ProjectTimeline from './ProjectTimeline';

class AllProjects extends Component {
  state = { projects: []}

  componentDidMount(){
    const id = localStorage.getItem('userID')
    fetch(`http://localhost:3001/api/v1/allprojects/${id}`)
        .then(response => response.json())
        .then(data => this.setState({projects: data}));
  }

  render(){
    return(
      <React.Fragment>
        <ProjectTimeline projects={this.state.projects} />
        <Route path="/projects/:projectID" render={routerProps => <ProjectPage projects={this.state.projects} {...routerProps} />}/>
      </React.Fragment>
    )
  }
}

export default AllProjects;
