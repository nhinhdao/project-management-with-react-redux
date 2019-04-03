import React, { Component} from 'react';
import { Header, Image, Modal, Form, Label, Table, Button} from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import {Link, Route} from 'react-router-dom';
import {deleteProject, getProject} from '../actions/APIsearch';
import {connect} from 'react-redux';
import EditProject from './EditProject';

class ProjectPage extends Component {
  constructor(){
    super();
    this.state = { date: new Date(), open: true, isLoading: true};
    this.handleChange = this.handleChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.close = this.close.bind(this)
  }

  componentDidMount() {
    const id = this.props.match.params.projectID;
    this.props.getProject(id).then(() => this.setState({isLoading: false}))
  }

  close(){this.setState({ open: false })};

  handleChange(date){this.setState({ date: date })};

  handleDelete(id){
    this.props.deleteProject(id).then(() => this.props.history.push("/projects"))
  }

  render(){
    const {project} = this.props
    const start_date = new Date(project.start_date + " ");
    const end_date = new Date(project.end_date + " ");
    
    // return null while waiting for data loading so the component doesn't break
    if (this.state.isLoading) { 
      return null ; 
    }

    return(
      <React.Fragment>
        <Modal open={this.state.open} dimmer='blurring'>
          <Modal.Header>{project.title}</Modal.Header>
          <Modal.Content image>
            <Modal.Description>
              <Header as="h4">Owner</Header>
              <Label image><img src={project.owner.image} alt='img'/>{project.owner.username}</Label>
              <Header as="h4">Description</Header>
              <p>{project.description}</p>
              <Form>
                <Form.Group inline>
                  <label>Start Date</label>
                  <DatePicker onChange={this.handleChange} selected={start_date} disabled={true} placeholderText={start_date.toString()}/>
                  <label></label>
                  <label>End Date</label>
                  <DatePicker onChange={this.handleChange} selected={end_date} disabled={true} placeholderText={end_date.toString()} />
                </Form.Group>
              </Form>
              <Header as="h4">Tasks</Header>
              <Table basic='very' celled collapsing>
                <Table.Body>
                  {project.tasks.map((task, index) => 
                    <Table.Row  key={index}>
                      <Table.Cell>
                        <Header as='h5' image textAlign='center'>
                          <Image src={task.user.image} rounded size='mini' />
                          <Header.Content>{task.user.username}</Header.Content>
                        </Header>
                      </Table.Cell>
                      <Table.Cell>{task.content}</Table.Cell>
                    </Table.Row>
                  )}
                </Table.Body>
              </Table>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            { (project.owner.id === parseInt(localStorage.getItem("userID"))) && 
            <React.Fragment>
              <Link to={`/editprojects/${project.id}`} onClick={this.close}><Button positive>Edit</Button></Link> 
              <Button negative onClick={() => this.handleDelete(project.id)}>Delete</Button>
            </React.Fragment>}
            <Link to="/projects"><Button>Close</Button></Link>
          </Modal.Actions>
        </Modal>
      <Route path="/projects/:projectID/edit" render={routerProps => <EditProject project={this.state.project} {...routerProps} />}/>
    </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    project: state.allProjects.project
  }
}

const mapDispatchToProps = dispatch =>{
  return {
    deleteProject: id => dispatch(deleteProject(id)),
    getProject: id => dispatch(getProject(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectPage);
