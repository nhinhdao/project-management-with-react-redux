import React, { Component} from 'react';
import "react-datepicker/dist/react-datepicker.css";
import {Route} from 'react-router-dom';
import ProjectPage from './ProjectPage';
import ProjectTimeline from './ProjectTimeline';
import { getAllProjects } from '../actions/APIsearch';
import {connect} from 'react-redux';

class AllProjects extends Component {
  state = { projects: []}

  componentDidMount(){
    this.getProjects();
  }

  UNSAFE_componentWillReceiveProps({ location = {} }) {
    if (location.pathname === '/projects' && location.pathname !== this.props.location.pathname) {
      this.getProjects();
    }
  }

  getProjects() {
    const id = localStorage.getItem("userID")
    this.props.getAllProjects(id)
  }

  render(){
    return(
      <React.Fragment>
        <ProjectTimeline projects={this.props.projects} />
        <Route path="/projects/:projectID" render={routerProps => <ProjectPage projects={this.props.projects} {...routerProps} />}/>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    projects: state.allProjects.projects
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAllProjects: (id) => dispatch(getAllProjects(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProjects);
