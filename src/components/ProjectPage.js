import React, { Component} from 'react';
import { Header, Image, Modal, Form, Label, Table, Button} from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

class ProjectPage extends Component {
  constructor(props){
    super(props);
    this.state = {project: {}, date: new Date()};
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount(){
    console.log('didMount projectpage');
    const {match: {params}} = this.props;
    fetch(`http://localhost:3001/api/v1/projects/${params.projectID}`)
      .then(response => response.json())
      .then(project => this.setState({...this.state, project: project}))
  }

  // shouldComponentUpdate(nextProps, nextState) {debugger
  //   return this.state.date !== nextState.date;
  // }

  handleChange(date){this.setState({ date: date })}

  render(){
    const project = this.state.project.length > 0 ? this.state.project : this.props.projects.find(project => project.id === parseInt(this.props.match.params.projectID));
    // const {project} = this.state
    const start_date = new Date(project.start_date + " ");
    const end_date = new Date(project.end_date + " ");
    return(
      <Modal open dimmer='blurring'>
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
          {project.owner.id === parseInt(localStorage.getItem("userID")) ? <Link to={`/editproject/${project.id}`}><Button positive>Edit</Button></Link> : null}
          <Link to="/projects"><Button>Close</Button></Link>
        </Modal.Actions>
      </Modal>
    )
  }
}

const mapStateToProps = state => {
  return {
    projects: state.allProjects.projects
  }
}

export default connect(mapStateToProps)(ProjectPage);
