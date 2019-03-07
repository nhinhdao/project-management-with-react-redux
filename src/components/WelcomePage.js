import React, { Component } from 'react';
import { signIn, register } from '../actions/APIsearch';
import projectmanagement from '../images/projectmanagement.png';
import SignInForm from '../containers/SignInForm';
import RegisterForm from '../containers/RegisterForm';
import { Image, Grid, Header,  Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';

class WelcomePage extends Component {
  state = {register: false};

  handleSignIn = user => {
    this.props.signIn(user);
    this.props.history.push('/');
  }

  handleRegister = user => {
    this.props.register(user);
    this.props.history.push('/');
  }

  toggerregister = () => {
    this.setState({register: !this.state.register})
  }

  render() {
    return (
      <div>
        <Grid centered columns={2}>
          <Grid.Row></Grid.Row><Grid.Row></Grid.Row>
          <Grid.Row>
            <Grid.Column width={7}>
              <Image centered src={projectmanagement} alt='Project Management Logo'/>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={2}>
              <Segment onClick={this.toggerregister}><Header as="h3" color="blue" textAlign="center">
              Log In
            </Header></Segment>
            </Grid.Column>
            <Grid.Column width={2}>
              <Segment onClick={this.toggerregister}><Header as="h3" color="blue" textAlign="center">
              Register
            </Header></Segment>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={4}>
              {this.state.register ? <RegisterForm handleRegister={this.handleRegister}/> : <SignInForm handleSignIn={this.handleSignIn}/>}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signIn: user => dispatch(signIn(user)),
    register: user => dispatch(register(user))
  }
}

export default connect(null, mapDispatchToProps)(WelcomePage);