import React, { Component } from 'react'
import {Grid, Segment, Header, Label, Image, Button, Form} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {updateAccount} from '../actions/APIsearch';

function UpdateForm(props){
  return (
    <Form onSubmit={props.handleSubmit}>
      <hr/>
      <Form.Group unstackable widths={2}>
        <Form.Input label='Username' name='username' value={props.user.username} />
        <Form.Input label='Email' name='email' value={props.user.email} />
      </Form.Group>
      <Form.Group widths={2}>
        <Form.Input label='Password' name='password' placeholder='Password' />
        <Form.Input label='Password Confirmation' name='password_confirmation' placeholder='Password Confirmation' />
      </Form.Group>
      <Form.Group>
        <Form.Input label='Link to your profile picture' name='image' value={props.user.image} placeholder='Picture of size 200x200 if possible' />
      </Form.Group>
      <Button type='submit'>Submit</Button>
    </Form>
  )
}

class MyPage extends Component {
  constructor () {
    super();
    this.state = {
      id: 1,
      username: '', 
      email: '', 
      password: '', 
      password_confirmation: '', 
      image: '',
      updateAccount: false
    };
  }

  handleClick = () => {
    this.setState({updateAccount: true})
  }

  handleUpdateInformation = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.updateUserAccount(this.state)
  }
  
  render() {
    const {user} = this.props;
    return (
    <Grid>
      <Grid.Column>
        <Segment raised>
          <Header as='h1' color='blue'>My Page</Header>
          <hr/>
          <Label as='a' color='red' ribbon>
            Overview
          </Label>
          <span>Account Details</span>

          <Image src={user.image} />
          <Header as='h4'>{user.username}</Header>
          <p><strong>{user.email}</strong></p>
          <p><strong>Projects: {user.project_count}</strong></p>
          <Button onClick={this.handleClick}>Update Account</Button>
          { this.state.updateAccount && 
            <UpdateForm user={user} handleSubmit={this.handleSubmit} /> }
        </Segment>
      </Grid.Column>
    </Grid>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.current_user.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateUserAccount: user => dispatch(updateUserAccount(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyPage);
