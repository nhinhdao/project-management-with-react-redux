import React, { Component } from 'react'
import {createNewProject} from '../actions/APIsearch';
import "react-datepicker/dist/react-datepicker.css";
import {connect} from 'react-redux';
import ProjectForm from '../containers/ProjectForm';

class NewProject extends Component {
  constructor (props) {
    super(props);
    this.state = { project_id: null, title: '', description: '', start_date: new Date(), end_date: new Date(), content: '', user_id: 1, owner: props.owner, tasks: [] };
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(project){
    const { history } = this.props;
    this.props.createProject(project).then(() => history.push("/projects"))
  }

  handleCancel = () => this.props.history.push("/projects")
  
  render() {
    return (
      <ProjectForm project={this.state} handleSubmit={this.handleSubmit} handleCancel={this.handleCancel} />
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createProject: (project) => dispatch(createNewProject(project))
  }
}

export default connect(null, mapDispatchToProps)(NewProject);
