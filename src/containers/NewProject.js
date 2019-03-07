import React, { Component } from 'react'
import {Form, Grid, Segment, Header} from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import {connect} from 'react-redux';

const options = [
  { key: 'n', text: 'Not Started', value: '0' },
  { key: 'a', text: 'Active', value: '1'},
  { key: 'c', text: 'Completed', value: '2' },
  { key: 'd', text: 'Dismissed', value: '13' },
]

class NewProject extends Component {
  constructor () {
    super();
    this.state = {
      name: '', description: '', status: '0', start_date: new Date(), end_date: new Date(),
      tasks: [{
        content: '',
        users: []
      }]
    };
    this.onChangeStatus = this.onChangeStatus.bind(this)
  }

  handleChange = (event) => {
    debugger
    this.setState({...this.state, [event.target.name]: event.target.value})
  }

  onChangeStart = date => this.setState({start_date: date})
  onChangeEnd = date => this.setState({end_date: date})

  render() {
    const { value } = this.state
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
                <label><input type="radio" name="status" value="0" checked={value==='0'} onChange={this.handleChange}/> Not Started</label>
                <label><input type="radio" name="status" value="1" checked={value==='1'} onChange={this.handleChange}/> Active</label>
                <label><input type="radio" name="status" value="2" checked={value==='2'} onChange={this.handleChange}/> Completed</label>
                <label><input type="radio" name="status" value="3" checked={value==='3'} onChange={this.handleChange}/> Dismissed</label>
              </Form.Group>
              <Form.Field>
                <label>Add Tasks</label>
                <input placeholder='Content' name='content' value={this.state.tasks}/>
              </Form.Field>
               <Form.Group>
                <Form.Select fluid label='Assign User' options={options} placeholder='User' />
              </Form.Group>
              <Form.Group inline>
                <Form.Button>Add More Tasks</Form.Button>
                <Form.Button color='blue'>Submit</Form.Button>
              </Form.Group>
            </Form>
          </Grid.Column>
          <Grid.Column>
            <Segment>
            <Header as="h3" color="blue" textAlign="center">Preview</Header><hr/>
              <Header as="h4" textAlign="center">Title</Header>
              <p></p>
            <Header as="h4" textAlign="center">Description</Header>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

const mapStateToProp = state => {
  return {
    userInfo: state.current_user.user
  }
}

export default connect(mapStateToProp)(NewProject);
