import React, { Component } from 'react'
import {createNewProject} from '../actions/APIsearch';
import "react-datepicker/dist/react-datepicker.css";
import { Header, Divider, Icon} from 'semantic-ui-react';
import {connect} from 'react-redux';
import ProjectForm from '../containers/ProjectForm';

class NewProject extends Component {
  constructor (props) {
    super(props);
    this.state = { 
      project_id: null, 
      title: '', 
      description: '', 
      start_date: new Date(), 
      end_date: new Date(), 
      content: '', 
      user_id: 1,  
      tasks: [] ,
      owner: {
        id: parseInt(localStorage.getItem("userID")),
        username: localStorage.getItem("userUsername"),
        image: localStorage.getItem("userImage")
      },
    };
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(project){
    const { history } = this.props;
    this.props.createProject(project).then(() => history.push(`/projects/${localStorage.getItem("projectID")}`))
  }

  handleCancel = () => this.props.history.push("/projects")
  
  render() {
    return (
      <React.Fragment>
        <Divider horizontal><Header as='h4'><Icon name='edit' />New Project</Header></Divider>
        <ProjectForm project={this.state} handleSubmit={this.handleSubmit} handleCancel={this.handleCancel} />
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createProject: (project) => dispatch(createNewProject(project))
  }
}

export default connect(null, mapDispatchToProps)(NewProject);
