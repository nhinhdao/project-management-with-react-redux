import React, { Component } from 'react'
import {Grid, Segment, Header, Label, Image, Button, Form, Message} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {updateUserAccount} from '../actions/APIsearch';


class MyPage extends Component {
  constructor (props) {
    super(props);
    this.state = {
      id: props.user.id,
      username: props.user.username, 
      email: props.user.email, 
      password: props.user.password, 
      password_confirmation: props.user.password_confirmation, 
      image: props.user.image,
      updateAccount: false,
      errors: false
    };
    this.handleUpdateInformation = this.handleUpdateInformation.bind(this)
  }

  handleClick = () => {
    this.setState({updateAccount: !this.state.updateAccount})
  }

  handleUpdateInformation = (event) => {
    debugger
    const {name, value} = event.target
    if (value !== ''){this.setState({[name]: value})}
  }

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.password === this.state.password_confirmation) {this.props.updateUserAccount(this.state)}
    else {this.setState({errors : true})}
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
            <Form onSubmit={this.handleSubmit}>
              <hr/>
              <Form.Group unstackable widths='equal'>
                <Form.Input label='Username' name='username' value={user.username} onChange={this.handleUpdateInformation} />
                <Form.Input label='Email' name='email' value={user.email} onChange={this.handleUpdateInformation} />
              </Form.Group>
              <Form.Group widths='equal'>
                <Form.Input label='Password' name='password' placeholder='Password' onChange={this.handleUpdateInformation} />
                <Form.Input label='Password Confirmation' name='password_confirmation' placeholder='Password Confirmation' onChange={this.handleUpdateInformation} />
                {this.state.errors ? <Message error content='Passwords do not match. Please try again!' /> : null}
              </Form.Group>
              <Form.Group>
                <Form.Input label='Link to your profile picture' name='image' value={user.image} placeholder='Picture of size 200x200 if possible' />
              </Form.Group>
              <Button type='submit'>Update</Button><Button onClick={this.handleClick}>Cancel</Button>
            </Form>
           }
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
