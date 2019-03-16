import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom';
import { getAllUsers, getAllProjects, signOut } from '../actions/APIsearch';
import { Sidebar, Menu, Icon, Image } from 'semantic-ui-react';
import projectmanagementPane from '../images/projectmanagementPane.png';
import NewProject from '../containers/NewProject';
import UsersPage from './UsersPage';
import ProjectTimeline from './ProjectTimeline';
import MyPage from './MyPage';
import ProjectPage from './ProjectPage';
import {connect} from 'react-redux';

/* Add style for main compartment */
const style = {
  marginTop: '50px',
  marginLeft: '200px',
  minWidth: '550px',
  maxWidth: '80%',
}

class Homepage extends Component {
  constructor(){
    super();
    this.handleLogout=this.handleLogout.bind(this)
  }
  handleLogout(event){
    event.preventDefault();
    this.props.signOut();
    localStorage.clear();
    this.props.history.push('/login');
  };

  componentDidMount() {
    let userID = localStorage.getItem("userID")
    this.props.getAllProjects(userID)
    this.props.getAllUsers();
  }

  render() {
    if (!localStorage.getItem("userID")) {
      return <Redirect to="/login"/>
    }
    return (
      <div style={style}>
        <Router>
          <React.Fragment>
            <Sidebar as={Menu} inverted visible vertical width="thin" icon="labeled">
              <Link to="/"><Menu.Item name="title"><Image wrapped size="tiny" src={projectmanagementPane}/></Menu.Item></Link>
              <Link to="/"><Menu.Item name="users"><Icon name="home" />Home</Menu.Item></Link>
              <Link to="/newproject"><Menu.Item name="newproject"><Icon name="plus" />New Project</Menu.Item></Link>
              <Link to="/projects"><Menu.Item name="timeline"><Icon name="calendar times outline" />TimeLine</Menu.Item></Link>
              <Link to="/users"><Menu.Item name="users"><Icon name="users" />Users</Menu.Item></Link>
              <Menu.Item name="logout" onClick={this.handleLogout}><Icon name="power" />Logout</Menu.Item>
            </Sidebar>
            <Route exact path="/" component={MyPage} />
            <Route exact path="/users" component={UsersPage} />
            <Route exact path="/newproject" component={NewProject} />
            <Route path="/projects" component={ProjectTimeline} />
            <Route path="/projects/:projectID" component={ProjectPage} />
            <Route exact path="/editproject/:projectID" component={NewProject} />
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
    getAllProjects: id => dispatch(getAllProjects(id)),
    signOut: () => dispatch(signOut())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
