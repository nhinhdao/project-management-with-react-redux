import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';
import { getAllUsers, getAllProjects } from '../actions/APIsearch';
import { Sidebar, Menu, Icon, Image } from 'semantic-ui-react';
import projectmanagementPane from '../images/projectmanagementPane.png';
import NewProject from '../containers/NewProject';
import UsersPage from './UsersPage';
import ProjectTimeline from './ProjectTimeline';
import MyPage from './MyPage';
import {connect} from 'react-redux';

/* Add style for main compartment */
const style = {
  marginTop: '50px',
  marginLeft: '200px',
  minWidth: '550px',
  maxWidth: '80%',
}

class Homepage extends Component {
  componentDidMount() {
    this.props.getAllUsers();
    let userID = localStorage.getItem("userID")
    this.props.getAllProjects(userID)
  }

  render() {
    return (
      <div style={style}>
        <Router>
          <React.Fragment>
            <Sidebar as={Menu} inverted visible vertical width="thin" icon="labeled">
              <Link to="/home"><Menu.Item name="title"><Image wrapped size="tiny" src={projectmanagementPane}/></Menu.Item></Link>
              <Link to="/home"><Menu.Item name="users"><Icon name="home" />Home</Menu.Item></Link>
              <Link to="/projects/new"><Menu.Item name="newproject"><Icon name="plus" />New Project</Menu.Item></Link>
              <Link to="/timeline"><Menu.Item name="timeline"><Icon name="calendar times outline" />TimeLine</Menu.Item></Link>
              <Link to="/users"><Menu.Item name="users"><Icon name="users" />Users</Menu.Item></Link>
              <Link to="/home"><Menu.Item name="logout"><Icon name="power" />Logout</Menu.Item></Link>
            </Sidebar>
            <Route exact path="/home" component={MyPage} />
            <Route exact path="/users" component={UsersPage} />
            <Route exact path="/projects/new" component={NewProject} />
            <Route exact path="/timeline" component={ProjectTimeline} />
          </React.Fragment>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = state => ({userInfo: state.current_user.user})

const mapDispatchToProps = dispatch => {
  return {
    getAllUsers: () => dispatch(getAllUsers()),
    getAllProjects: id => dispatch(getAllProjects(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
