import React, { Component } from 'react';
import { Button, Form, Segment, Header } from 'semantic-ui-react';

class RegisterForm extends Component {
  constructor () {
    super();
    this.state = { 
      user: { username: '', email: '', password: '', password_confirmation: ''},
      error: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (event) => {
    this.setState({ ...this.state, user: {...this.state.user, [event.target.name]: event.target.value} })
  }

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.user.password !== this.state.user.password_confirmation) {
      this.setState({error: 'Sorry! Passwords do not match.'})
    } 
    else {
      this.props.handleRegister(this.state.user)
    }
  }

  render() {
    const {user} = this.state
    return (
      <React.Fragment>
        <Segment>
          <Form size="large" onSubmit={this.handleSubmit}>
            <Form.Input fluid icon="user" iconPosition="left" placeholder="Username"
              onChange={this.handleChange} name='username' value={user.username} required/>
            <Form.Input fluid icon="envelope" iconPosition="left" placeholder="Email"
              onChange={this.handleChange} name='email' value={user.email} required/>
            <Form.Input fluid icon="lock" iconPosition="left" placeholder="Password" type="password"
              onChange={this.handleChange} name='password' value={user.password}  required/>
            <Form.Input fluid icon="lock" iconPosition="left" placeholder="Password Confirmation" type="password"
              onChange={this.handleChange} name='password_confirmation' value={user.password_confirmation} required/>
            <Button type='submit' color="blue" fluid size="large">
              Sign Up
            </Button>
          </Form>
        </Segment>
        {this.state.error && <Header as='h3' color='red'>{this.state.error}</Header>}
      </React.Fragment>
    )
  }
}
        
export default RegisterForm;