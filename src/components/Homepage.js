import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect, Switch} from 'react-router-dom';
import { getAllUsers, signOut, getCurrentUser } from '../actions/APIsearch';
import { Sidebar, Menu, Icon, Image } from 'semantic-ui-react';
import projectmanagementPane from '../images/projectmanagementPane.png';
import NewProject from './NewProject';
import UsersPage from './UsersPage';
import AllProjects from './AllProjects';
import MyPage from './MyPage';
import {connect} from 'react-redux';
import EditProject from './EditProject';

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
    const id = localStorage.getItem("userID");
    if (id){
      this.props.getCurrentUser(id);
    }
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
            <Switch>
            {  /* <Route exact path="/" render={routerProps => <MyPage user={this.props.user} {...routerProps} />} /> */}
              <Route exact path="/" component={MyPage} />
              <Route path="/users" component={UsersPage} />
              <Route path="/newproject" component={NewProject} />
              <Route path="/projects" component={AllProjects} />
              <Route path="/editprojects/:projectID" component={EditProject} />
            </Switch>
          </React.Fragment>
        </Router>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAllUsers: () => dispatch(getAllUsers()),
    signOut: () => dispatch(signOut()),
    getCurrentUser: id => dispatch(getCurrentUser(id))
  }
}

export default connect(null, mapDispatchToProps)(Homepage);
