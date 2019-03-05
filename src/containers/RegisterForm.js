import React, { Component } from 'react';
import {Col, Row, Button, Form, FormGroup, Label, Input} from 'reactstrap';
import {connect} from 'react-redux'

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
      <Form onSubmit={this.handleSubmmit}>
        <Row form>
          <Col md={8}>
            <FormGroup>
              <Label>Username</Label>
              <Input type='text' onChange={this.handleChange} name='username' value={this.state.searchQuery}></Input><br />
              <Label>Email</Label>
              <Input type='text' onChange={this.handleChange} name='email' value={this.state.searchQuery}></Input><br />
              <Label>Password</Label>
              <Input type='text' onChange={this.handleChange} name='password' value={this.state.location}></Input><br />
              <Label>Password Confirmation</Label>
              <Input type='text' onChange={this.handleChange} name='password_confirmation' value={this.state.searchQuery}></Input><br />
            </FormGroup>
            <Button type='submit' color="info">Sign Up</Button>
          </Col>
          <Col md={1} />
        </Row>
      </Form>
    )
  }
}

const mapStateToProps = state => {
  // return {
  //   reviews: state.reviewsSearch.reviews,
  //   myList: state.mySearch.myList
  // }
}

const mapDispatchToProps = dispatch => {
  // return {
  //   reviewSearchQuery: url => dispatch(reviewSearchQuery(url)),
  //   addToListQuery: place => dispatch(addToListQuery(place)),
  //   removeFromListQuery: place => dispatch(removeFromListQuery(place))
  // }
}
        
export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);