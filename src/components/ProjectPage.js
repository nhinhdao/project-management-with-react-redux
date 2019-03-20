import React, { Component} from 'react';
import { Header, Image, Modal, Form, Label, Table, Button} from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import {Link} from 'react-router-dom';
import {deleteProject} from '../actions/APIsearch';
import {connect} from 'react-redux';

class ProjectPage extends Component {
  constructor(props){
    super(props);
    const project = props.projects.find(project => project.id === parseInt(this.props.match.params.projectID));
    this.state = {project: project, date: new Date(), open: true};
    this.handleChange = this.handleChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.close = this.close.bind(this)
  }

  close(){this.setState({ open: false })};

  handleChange(date){this.setState({ date: date })};

  handleDelete(){
    this.props.deleteProject(this.state.project.id).then(() => this.props.history.push("/projects"))
  }

  render(){
    const {project} = this.state
    const start_date = new Date(project.start_date + " ");
    const end_date = new Date(project.end_date + " ");
    return(
      <Modal open={this.state.open} dimmer='blurring'>
        <Modal.Header>{project.title}</Modal.Header>
        <Modal.Content image>
          <Modal.Description>
            <Header as="h4">Owner</Header>
            <Label as='a' image><img src={project.owner.image} alt='img'/>{project.owner.username}</Label>
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
          {project.owner.id === parseInt(localStorage.getItem("userID")) ? 
          <React.Fragment><Link to={`/editproject/${project.id}`} onClick={this.close}><Button positive>Edit</Button></Link> 
          <Button negative  onClick={this.handleDelete}>Delete</Button></React.Fragment> : null}
          <Link to="/projects"><Button>Close</Button></Link>
        </Modal.Actions>
      </Modal>
    )
  }
}

const mapDispatchToProps = dispatch =>{
  return {
    deleteProject: id => dispatch(deleteProject(id))
  }
}

export default connect(null, mapDispatchToProps)(ProjectPage);
