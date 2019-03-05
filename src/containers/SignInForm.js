import React, { Component } from 'react';
import {  Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';

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
    this.props.handleSubmit(this.state)
    this.setState({username: '', password: ''})
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Row form>
          <Col md={8}>
            <FormGroup>
              <Label>Username</Label>
              <Input type='text' onChange={this.handleChange} name='username' value={this.state.username}></Input><br />
              <Label>Password</Label>
              <Input type='text' onChange={this.handleChange} name='password' value={this.state.password}></Input><br />
            </FormGroup>
            <Button type='submit' color="info">Sign In</Button>
          </Col>
          <Col md={1} />
        </Row>
      </Form>
    )
  }
}

export default SignInForm;