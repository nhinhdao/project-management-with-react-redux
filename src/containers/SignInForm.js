import React, { Component } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';

class SignInForm extends Component {
  constructor () {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      username: '',
      password: ''
    }
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.handleSignIn(this.state)
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
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
              onChange={this.handleChange} name='password' value={this.state.password}
            />
            <Button typr='submit' color="blue" fluid size="large">
              Log In
            </Button>
          </Form>
        </Segment>
      </React.Fragment>
    )
  }
}

export default SignInForm;