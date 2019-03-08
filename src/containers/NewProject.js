import React, { Component } from 'react'
import {Form, Grid, Segment, Header, Label, Image, Table, Icon} from 'semantic-ui-react';
import {createNewProject} from '../actions/APIsearch';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import {connect} from 'react-redux';

const getStatus = status => {
  switch (status) {
    case 1:
      return 'Active'
    case 2:
      return 'Completed'
    case 3:
      return 'Dismissed'
    default:
      return 'Not Started'
  }
}

class NewProject extends Component {
  constructor () {
    super();
    this.state = {
      owner_id: 1, name: '', description: '', status: '0', start_date: new Date(), end_date: new Date(), content: '', user_id: 1, tasks: []
    };
    this.handleAddTask = this.handleAddTask.bind(this);
    this.handleDeleteTask = this.handleDeleteTask.bind(this);
  }

  handleAddTask = () => {
    const user = this.props.allUsers.find(user => user.id === this.state.user_id);
    this.setState({...this.state, owner_id: this.props.userInfo.id, tasks: [...this.state.tasks, {content: this.state.content, user_id: user.id, user_username: user.username, user_image: user.image}]})
    this.setState({content: ''});
  }

  handleDeleteTask = (id) => {debugger
    let index = this.state.tasks.findIndex(task => task.user.id === id)
    this.setState({...this.state, tasks: this.state.tasks.slice(0, index).concat(this.state.tasks.slice(index+1))})
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.createProject(this.state)
  }

  handleChange = (event) => this.setState({...this.state, [event.target.name]: event.target.value})
  onChangeStart = date => this.setState({start_date: date})
  onChangeEnd = date => this.setState({end_date: date})
  onChangeUser = (e, {value}) => this.setState({user_id: value})
  onChangeStatus = (e, {value}) => this.setState({status: value})
  
  render() {
    const users = this.props.allUsers.map(user => user = {key: user.id, text: user.username, value: user.id, image: {avatar: true, src: user.image}});
    return (
      <Grid columns={2} divided>
        <Grid.Row stretched>
          <Grid.Column>
            <Segment>
              <Header as="h3" color="blue" textAlign="center">New Project</Header> <hr />
              <Form onSubmit={this.handleSubmit}>
                <Form.Field>
                  <label>Owner:  {this.props.userInfo.username}</label>
                </Form.Field>
                <Form.Field>
                  <label>Project Title</label>
                  <input name='name' onChange={this.handleChange} value={this.state.name} placeholder='Title' />
                </Form.Field>
                <Form.Field>
                  <label>Description</label>
                  <input name='description' onChange={this.handleChange} value={this.state.description} placeholder='Description' />
                </Form.Field>
                <Form.Group inline>
                  <label>Start Date</label>
                  <DatePicker onChange={this.onChangeStart} selected={this.state.start_date} />
                  <label></label>
                  <label>End Date</label>
                  <DatePicker onChange={this.onChangeEnd} selected={this.state.end_date} />
                </Form.Group>
                <Form.Field><label>Status</label></Form.Field>
                <Form.Group inline>
                  <Form.Radio name='status' label='Not Started' value='0' checked={this.state.status === '0'} onChange={this.onChangeStatus} />
                  <Form.Radio name='status' label='Active' value='1' checked={this.state.status === '1'} onChange={this.onChangeStatus} />
                  <Form.Radio name='status' label='Completed' value='2' checked={this.state.status === '2'} onChange={this.onChangeStatus} />
                  <Form.Radio name='status' label='Dismissed' value='3' checked={this.state.status === '3'} onChange={this.onChangeStatus} />
                </Form.Group>
                <Form.Field>
                  <label>Add Tasks</label>
                  <input placeholder='Content' name='content' value={this.state.content} onChange={this.handleChange}/>
                </Form.Field>
                <Form.Group>
                  <Form.Select label='Assign User' options={users} placeholder='User' onChange={this.onChangeUser}/>
                  <Icon name="plus" onClick={this.handleAddTask}/>
                </Form.Group>
                <Form.Button color='blue' type='submit'>Submit</Form.Button>
              </Form>
            </Segment>
          </Grid.Column>
          <Grid.Column>
            {this.state &&
              <Segment secondary>
                <Header as="h3" color="blue" textAlign="center">Project Preview</Header> <hr />
                <Header as="h4">Owner</Header>
                <Label as='a' image><img src={this.props.userInfo.image} alt='img'/>{this.props.userInfo.username}</Label>
                <Header as="h4">Title</Header>
                <p>{this.state.name}</p>
                <Header as="h4">Description</Header>
                <p>{this.state.description}</p>
                <Form>
                  <Form.Group inline>
                    <label>Start Date</label>
                    <DatePicker onChange={this.onChangeStart} selected={this.state.start_date} disabled={true} placeholderText={this.state.start_date.toString()} />
                    <label></label>
                    <label>End Date</label>
                    <DatePicker onChange={this.onChangeEnd} selected={this.state.end_date} disabled={true} placeholderText={this.state.end_date.toString()} />
                  </Form.Group>
                </Form>
                <Header as="h4">Status: {getStatus(this.state.status)}</Header>
                <Header as="h4">Tasks</Header>
                <Table basic='very' celled collapsing>
                  <Table.Body>
                    {this.state.tasks.map((task, index) => 
                      <Table.Row  key={index}>
                        <Table.Cell>
                          <Header as='h5' image textAlign='center'>
                            <Image src={task.user_image} rounded size='mini' />
                            <Header.Content>{task.user_username}</Header.Content>
                          </Header>
                        </Table.Cell>
                        <Table.Cell>{task.content}</Table.Cell>
                        <Table.Cell>
                          <Icon name="delete" onClick={(i) => this.handleDeleteTask(task.user.id)}/>
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
    userInfo: state.current_user.user,
    allUsers: state.current_user.users
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createProject: (project) => dispatch(createNewProject(project))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewProject);
