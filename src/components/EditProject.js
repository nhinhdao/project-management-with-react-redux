import React, { Component } from 'react'
import {updateProject, getProject} from '../actions/APIsearch';
import "react-datepicker/dist/react-datepicker.css";
import { Header, Divider, Icon} from 'semantic-ui-react';
import {connect} from 'react-redux';
import ProjectForm from '../containers/ProjectForm';

class EditProject extends Component {
  constructor () {
    super();
    this.state= {project: {}}
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(project){
    const { history } = this.props;
    this.props.updateProject(project).then(()=> history.push("/projects"))
  }
  
  handleCancel = () => this.props.history.push("/projects")
    
  render() {
    const {project} = this.props
    const tasks = project.tasks.map(task => task = {
      content: task.content,
      user_id: task.user.id,
      user_username: task.user.username,
      user_image: task.user.image
    });
    const start_date = project.start_date + ' ';
    const end_date = project.end_date + ' ';
    const editProject = {
      project_id: project.id,
      title: project.title,
      description: project.description,
      start_date: new Date(start_date),
      end_date: new Date(end_date),
      content: '',
      user_id: null,
      owner: project.owner,
      tasks: tasks
    };
    return (
      <React.Fragment>
        <Divider horizontal><Header as='h4'><Icon name='edit' />Edit Project</Header></Divider>
        <ProjectForm project={editProject} handleSubmit={this.handleSubmit} handleCancel={this.handleCancel} />
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    project: state.allProjects.project
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateProject: (project) => dispatch(updateProject(project)),
    getProject: id => dispatch(getProject(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProject);