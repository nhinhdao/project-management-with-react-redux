import React, { Component } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';

class RegisterForm extends Component {
  constructor () {
    super();
    this.state = {
      username: '', 
      email: '',
      password: '',
      password_confirmation: ''
    }
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmmit = event => {
    event.preventDefault();
    this.setState({username: '', password: ''})
  }

  render() {
    return (
      <React.Fragment>
        <Segment>
          <Form size="large" onSubmit={this.handleSubmit}>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="Username"
              onChange={this.handleChange} name='username' value={this.state.username}
            />
            <Form.Input
              fluid
              icon="envelope"
              iconPosition="left"
              placeholder="Email"
              onChange={this.handleChange} name='email' value={this.state.email}
            />
            <Form.Input 
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
              onChange={this.handleChange} name='password' value={this.state.password}
            />
            <Form.Input 
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password Confirmation"
              type="password"
              onChange={this.handleChange} name='password_confirmation' value={this.state.password_confirmation}
            />
            <Button typr='submit' color="blue" fluid size="large">
              Sign Up
            </Button>
          </Form>
        </Segment>
      </React.Fragment>
    )
  }
}
        
export default RegisterForm;