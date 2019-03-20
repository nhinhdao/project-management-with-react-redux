import React, { Component } from 'react';
import { signIn, register } from '../actions/APIsearch';
import welcomePage from '../images/welcomePage.png';
import SignInForm from '../containers/SignInForm';
import RegisterForm from '../containers/RegisterForm';
import { Image, Grid, Header,  Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';

class WelcomePage extends Component {
  constructor(){
    super();
    this.state = {register: false, error: false};
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.toggleRegister = this.toggleRegister.bind(this);
  }
  

  handleSignIn(user){
    this.props.signIn(user)  
  }

  handleRegister(user){
    this.props.register(user);
  }

  toggleRegister(){
    this.setState({register: !this.state.register})
  }

  render() {
    if (localStorage.getItem("userID")) {
      return <Redirect to='/'/>;
    }
    return (
      <div>
        <Grid centered columns={2}>
          <Grid.Row></Grid.Row><Grid.Row></Grid.Row>
          <Grid.Row>
            <Grid.Column width={7}>
              <Image size='big' centered src={welcomePage} alt='Project Management Logo'/>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={4}>
              <Segment.Group horizontal>
                <Segment onClick={this.toggleRegister}><Header as="h3" color="blue" textAlign="center">Log In</Header></Segment>
                <Segment onClick={this.toggleRegister}><Header as="h3" color="blue" textAlign="center">Register</Header></Segment>
              </Segment.Group>
              {this.state.register ? <RegisterForm handleRegister={this.handleRegister}/> : <SignInForm handleSignIn={this.handleSignIn}/>}
            </Grid.Column>
          </Grid.Row>
          {this.props.error &&
          <Grid.Row>
            <Grid.Column width={4}>
              <Header as='h3' color='red' textAlign='center'>Incorrect Username/Password</Header>
            </Grid.Column>
          </Grid.Row>}
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {error: state.current_user.error}
}

const mapDispatchToProps = dispatch => {
  return {
    signIn: user => dispatch(signIn(user)),
    register: user => dispatch(register(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WelcomePage);