import React, { Component } from 'react'
import {updateProject} from '../actions/APIsearch';
import "react-datepicker/dist/react-datepicker.css";
import { Header, Divider, Icon} from 'semantic-ui-react';
import {connect} from 'react-redux';
import ProjectForm from '../containers/ProjectForm';

class EditProject extends Component {
  constructor (props) {
    super(props);
    const {project} = props;
    const tasks = project.tasks.map(task => task = {content: task.content, user_id: task.user.id, user_username: task.user.username, user_image: task.user.image});
    const start_date = project.start_date + ' ';
    const end_date = project.end_date + ' ';
    this.state = {
    project_id: project.id, title: project.title, description: project.description,
    start_date: new Date(start_date), end_date: new Date(end_date),
    content: '', user_id: null, owner: project.owner, tasks: tasks
    }
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(project){
    const { history } = this.props;
    this.props.updateProject(project).then(()=> history.push("/projects"))
  }
  
  handleCancel = () => this.props.history.push("/projects")
    
  render() {
    return (
      <React.Fragment>
        <Divider horizontal><Header as='h4'><Icon name='edit' />Edit Project</Header></Divider>
        <ProjectForm project={this.state} handleSubmit={this.handleSubmit} handleCancel={this.handleCancel} />
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateProject: (project) => dispatch(updateProject(project))
  }
}

export default connect(null, mapDispatchToProps)(EditProject);