import React, { Component } from 'react'
import {Form, Grid, Segment, Header, Label, Image, Table, Icon, Button} from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import {connect} from 'react-redux';

class ProjectForm extends Component {
  constructor (props) {
    super(props);
    this.state = {project: props.project};
    this.handleAddTask = this.handleAddTask.bind(this);
    this.handleDeleteTask = this.handleDeleteTask.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCancelChange = this.handleCancelChange.bind(this);
    this.onChangeEndDate = this.onChangeEndDate.bind(this);
    this.onChangeStartDate = this.onChangeStartDate.bind(this);
    this.onChangeUser = this.onChangeUser.bind(this);
    this.validate = this.validate.bind(this);
    this.canBeSubmitted = this.canBeSubmitted.bind(this);
  }

  handleAddTask(){
    const user = this.props.allUsers.find(user => user.id === this.state.project.user_id);
    this.setState({...this.state, 
      project: {
        ...this.state.project,
        tasks: [
          ...this.state.project.tasks, {
          content: this.state.project.content,
          user_id: user.id,
          user_username: user.username,
          user_image: user.image
          }
        ]}
      }
    )
  }

  handleDeleteTask(id){
    let index = this.state.project.tasks.findIndex(task => task.user_id === id)
    this.setState({
      ...this.state,
      project: {
        ...this.state.project,
        tasks: this.state.project.tasks.slice(0, index).concat(this.state.project.tasks.slice(index + 1))
      }
    })
  }

  handleChange(event){
    this.setState({
      ...this.state, 
      project: {
        ...this.state.project,
        [event.target.name]: event.target.value
      }
    }
  )}

  onChangeStartDate(date) {
    this.setState({
      ...this.state,
      project: {
        ...this.state.project,
        start_date: date, 
        end_date: date
      }
    })
  }

  onChangeEndDate(date) {
    this.setState({
      ...this.state,
      project: {
        ...this.state.project,
        end_date: date
      }
    })
  }

  onChangeUser(e, {value}) {
    this.setState({
      ...this.state,
      project: {
        ...this.state.project,
        user_id: value
      }
    })
  }

  handleCancelChange(){
    this.props.handleCancel()
  }

  validate(title, description, tasks) {
    // true means invalid, so our conditions got reversed
    return {
      title: title.length === 0,
      description: description.length === 0,
      tasks: tasks.length === 0
    };
  }

  canBeSubmitted() {
    const errors = this.validate(this.state.project.title, this.state.project.description, this.state.project.tasks);
    const isDisabled = Object.keys(errors).some(x => errors[x]);
    return !isDisabled;
  }

  handleSubmit(event) {
    event.preventDefault();
    if (!this.canBeSubmitted()) {
      return;
    }
    this.props.handleSubmit(this.state.project);
  }
  
  render() {
    const errors = this.validate(this.state.project.title, this.state.project.description, this.state.project.tasks);
    const isDisabled = Object.keys(errors).some(x => errors[x]);
    const users = this.props.allUsers.map(user => user = {key: user.id, text: user.username, value: user.id, image: {avatar: true, src: user.image}});
    const {project} = this.state
    return (
      <Grid columns={2} divided>
        <Grid.Row stretched>
          <Grid.Column>
            <Segment>
              <Header as="h3" color="blue" textAlign="center">Project</Header> <hr />
              <Header as="h4">Owner</Header>
              <Label as='a' image><img src={project.owner.image} alt='img'/>{project.owner.username}</Label>
              <br/><br/>
              <Form onSubmit={this.handleSubmit}>
                <Form.Field>
                  <label>Project Title</label>
                  <input className={errors.email ? "error" : ""} name='title' onChange={this.handleChange} value={project.title} placeholder='Title' />
                </Form.Field>
                <Form.Field>
                  <label>Description</label>
                  <input className={errors.email ? "error" : ""} name='description' onChange={this.handleChange} value={project.description} placeholder='Description' />
                </Form.Field>
                <Form.Group inline>
                  <label>Start Date</label>
                  <DatePicker minDate={new Date()} onChange={this.onChangeStartDate} selected={project.start_date} />
                  <label></label>
                  <label>End Date</label>
                  <DatePicker minDate={new Date()} onChange={this.onChangeEndDate} selected={project.end_date} />
                </Form.Group>
                <Form.Field required>
                  <label>Add Tasks</label>
                  <input placeholder='Content' name='content' value={project.content} onChange={this.handleChange}/>
                </Form.Field>
                <Form.Group inline>
                  <Form.Select label='Assign User' options={users} placeholder='User' onChange={this.onChangeUser} required/>
                  <Label onClick={this.handleAddTask} color='red' tag><Icon name="plus"/>Add</Label>
                </Form.Group>
                <Form.Group inline>
                  <Form.Button  disabled={isDisabled} color='blue' type='submit'>Submit</Form.Button><Button type='button' onClick={this.handleCancelChange}>Cancel</Button>
                </Form.Group>
              </Form>
            </Segment>
          </Grid.Column>
          <Grid.Column>
            {project &&
              <Segment secondary>
                <Header as="h3" color="blue" textAlign="center">Review</Header> <hr />
                <Header as="h4">Owner</Header>
                <Label as='a' image><img src={project.owner.image} alt='img'/>{project.owner.username}</Label>
                <Header as="h4">Title</Header>
                <p>{project.title}</p>
                <Header as="h4">Description</Header>
                <p>{project.description}</p>
                <Form>
                  <Form.Group inline>
                    <label>Start Date</label>
                    <DatePicker onChange={this.onChangeStartDate} selected={project.start_date} disabled={true} placeholderText={project.start_date.toString()} />
                    <label></label>
                    <label>End Date</label>
                    <DatePicker onChange={this.onChangeEndDate} selected={project.end_date} disabled={true} placeholderText={project.end_date.toString()} />
                  </Form.Group>
                </Form>
                <Header as="h4">Tasks</Header>
                <Table basic='very' celled collapsing>
                  <Table.Body>
                    {project.tasks.map((task, index) => 
                      <Table.Row  key={index}>
                        <Table.Cell>
                          <Header as='h5' image textAlign='center'>
                            <Image src={task.user_image} rounded size='mini' />
                            <Header.Content>{task.user_username}</Header.Content>
                          </Header>
                        </Table.Cell>
                        <Table.Cell>{task.content}</Table.Cell>
                        <Table.Cell>
                          <Icon name="delete" onClick={() => this.handleDeleteTask(task.user_id)}/>
                        </Table.Cell>
                      </Table.Row>
                    )}
                  </Table.Body>
                </Table>
              </Segment>
            }
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

const mapStateToProps = state => {
  return {
    allUsers: state.current_user.users
  }
}

export default connect(mapStateToProps)(ProjectForm);
