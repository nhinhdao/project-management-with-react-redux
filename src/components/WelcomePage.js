import React, { Component } from 'react';
import { signIn, register } from '../actions/APIsearch';
import SignInForm from '../containers/SignInForm';
import RegisterForm from '../containers/RegisterForm';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import { connect } from 'react-redux';

class WelcomePage extends Component {
  state = {
      activeTab: '1'
    };

  toggle = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  handleSignIn = user => {
    this.props.signIn(user)
  }

  handleRegister = user => {
    this.props.register(user)
  }

  render() {
    return (
      <div>
        <Nav tabs>
        <NavItem>
          <NavLink className={classnames({ active: this.state.activeTab === '1' })} onClick={() => { this.toggle('1'); }}>
            <strong>Sign In</strong>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink className={classnames({ active: this.state.activeTab === '2' })} onClick={() => { this.toggle('2'); }}>
            <strong>Register</strong>
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={this.state.activeTab}>
        <TabPane tabId="1">
          <Row>
            <Col sm="12">
                <SignInForm handleSubmit={this.handleSignIn}/>
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="2">
          <Row>
            <Col sm="12">
              <RegisterForm handleSubmit={this.handleRegister}/>
            </Col>
          </Row>
        </TabPane>
        </TabContent>
      </div>
      );
    }
}

const mapStateToProps = state => {
  return {
    user_info: state.current_user.user,
    projects: state.allProjects.projects,
    tasks: state.allTasks.tasks
  };
}
  
const mapDispatchToProps = dispatch => {
  return {
    signIn: user => dispatch(signIn(user)),
    register: user => dispatch(register(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WelcomePage);