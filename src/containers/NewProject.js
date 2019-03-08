import React, { Component } from 'react'
import {Form, Grid, Segment, Header, Label, List} from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import {connect} from 'react-redux';

class NewProject extends Component {
  constructor () {
    super();
    this.state = {
      name: '', description: '', status: '0', start_date: new Date(), end_date: new Date(), content: '', user_id: 1, tasks: []
    };
    this.handleAddTask = this.handleAddTask.bind(this)
  }

  handleAddTask = () => {
    const user = this.props.allUsers.find(user => user.id === this.state.user_id);
    debugger
    this.setState({...this.state, tasks: [...this.state.tasks, {content: this.state.content, user: user}]})
    this.setState({content: ''});
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
        <Grid.Row></Grid.Row>
        <Grid.Row stretched>
          <Grid.Column>
            <Header as="h3" color="blue" textAlign="center">New Project</Header>
            <Form>
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
              </Form.Group>
              <Form.Group inline>
                <Form.Button onClick={this.handleAddTask}>Add More Tasks</Form.Button>
                <Form.Button color='blue'>Submit</Form.Button>
              </Form.Group>
            </Form>
          </Grid.Column>
          <Grid.Column>
            {this.state &&
            <Segment color='gray'>
                <Header as="h3" color="blue" textAlign="center">Preview</Header> <hr />
                <Header as="h4">Title</Header>
                <p>{this.state.name}</p>
                <Header as="h4">Description</Header>
                <p>{this.state.description}</p>
                <Header as="h4">Start Date</Header>
                <DatePicker onChange={this.onChangeStart} selected={this.state.start_date} readOnly={true} placeholderText={this.state.start_date.toString()} />
                <Header as="h4">End Date</Header>
                <DatePicker onChange={this.onChangeEnd} selected={this.state.end_date} readOnly={true} placeholderText={this.state.end_date.toString()} />
              <Header as="h4">Tasks</Header>
              {this.state.tasks.map(task => 
                <List bulleted key={task.user.id}>
                  <List.Item>{task.content}</List.Item>
                  <Label as='a' image><img src={task.user.image} alt='img'/>{task.user.username}</Label>
                </List>
                )}
            </Segment>
            }
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

const mapStateToProp = state => {
  return {
    userInfo: state.current_user.user,
    allUsers: state.current_user.users
  }
}

export default connect(mapStateToProp)(NewProject);
