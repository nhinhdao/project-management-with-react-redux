import React, { Component } from 'react'
import {Form, Grid, Segment, Header, Label, Image, Table, Icon, Button} from 'semantic-ui-react';
import {createNewProject, updateProject} from '../actions/APIsearch';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import {connect} from 'react-redux';

class NewProject extends Component {
  constructor () {
    super();
    this.state = { project_id: null, title: '', description: '', start_date: new Date(), end_date: new Date(), content: '', user_id: 1, owner: {}, tasks: [] };
    this.handleAddTask = this.handleAddTask.bind(this);
    this.handleDeleteTask = this.handleDeleteTask.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCancelChange = this.handleCancelChange.bind(this);
    this.onChangeEnd = this.onChangeEnd.bind(this);
    this.onChangeStart = this.onChangeStart.bind(this);
    this.onChangeUser = this.onChangeUser.bind(this);
  }


  componentDidMount(){
    const {match: {params}} = this.props;
    if (params.projectID){
      let tasks, start_date, end_date;
      fetch(`http://localhost:3001/api/v1/projects/${params.projectID}`)
        .then(response => response.json())
        .then(project => {
          tasks = project.tasks.map(task => task = {content: task.content, user_id: task.user.id, user_username: task.user.username, user_image: task.user.image});
          start_date = project.start_date + ' ';
          end_date = project.end_date + ' ';
          this.setState({
          project_id: project.id, title: project.title, description: project.description,
          start_date: new Date(start_date), end_date: new Date(end_date),
          content: '', user_id: 1, owner: project.owner, tasks: tasks
          })
      });
    }
    else {this.setState({...this.state})}
  }

  handleAddTask(){
    const user = this.props.allUsers.find(user => user.id === this.state.user_id);
    this.setState({...this.state, owner: {...this.state.owner, id: this.props.userInfo.id},
       tasks: [...this.state.tasks, {content: this.state.content, user_id: user.id, user_username: user.username, user_image: user.image}]})
    this.setState({content: ''});
  }

  handleDeleteTask(id){
    let index = this.state.tasks.findIndex(task => task.user_id === id)
    this.setState({...this.state, tasks: this.state.tasks.slice(0, index).concat(this.state.tasks.slice(index+1))})
  }

  handleSubmit(event){
    event.preventDefault();
    const { history } = this.props;
    if (this.state.project_id){
      this.props.updateProject(this.state).then(()=> history.push("/projects"))
    }
    else {
      this.props.createProject(this.state).then(() => history.push("/projects"))
    }
  }

  handleChange(event){this.setState({...this.state, [event.target.name]: event.target.value})}
  handleCancelChange(){this.props.history.push('/projects')}
  onChangeStart(date){this.setState({start_date: date, end_date: date})}
  onChangeEnd(date){this.setState({end_date: date})}
  onChangeUser(e, {value}){this.setState({user_id: value})}
  
  render() {
    const users = this.props.allUsers.map(user => user = {key: user.id, text: user.username, value: user.id, image: {avatar: true, src: user.image}});
    return (
      <Grid columns={2} divided>
        <Grid.Row stretched>
          <Grid.Column>
            <Segment>
              <Header as="h3" color="blue" textAlign="center">Project</Header> <hr />
              <Header as="h4">Owner</Header>
              { this.state.owner.image ? 
                <Label as='a' image><img src={this.state.owner.image} alt='img'/>{this.state.owner.username}</Label> :
                <Label as='a' image><img src={this.props.userInfo.image} alt='img'/>{this.props.userInfo.username}</Label>
              }
              <br/><br/>
              <Form onSubmit={this.handleSubmit}>
                <Form.Field>
                  <label>Project Title</label>
                  <input name='title' onChange={this.handleChange} value={this.state.title} placeholder='Title' />
                </Form.Field>
                <Form.Field>
                  <label>Description</label>
                  <input name='description' onChange={this.handleChange} value={this.state.description} placeholder='Description' />
                </Form.Field>
                <Form.Group inline>
                  <label>Start Date</label>
                  <DatePicker onChange={this.onChangeStart} selected={this.state.start_date} />
                  <label></label>
                  <label>End Date</label>
                  <DatePicker onChange={this.onChangeEnd} selected={this.state.end_date} />
                </Form.Group>
                <Form.Field required>
                  <label>Add Tasks</label>
                  <input placeholder='Content' name='content' value={this.state.content} onChange={this.handleChange}/>
                </Form.Field>
                <Form.Group inline>
                  <Form.Select label='Assign User' options={users} placeholder='User' onChange={this.onChangeUser} required/>
                  <Label onClick={this.handleAddTask}><Icon name="plus"/>Add</Label>
                </Form.Group>
                <Form.Group inline>
                  <Form.Button color='blue' type='submit'>Submit</Form.Button>{this.props.match.params.projectID && <Button type='button' onClick={this.handleCancelChange}>Cancel</Button>}
                </Form.Group>
              </Form>
            </Segment>
          </Grid.Column>
          <Grid.Column>
            {this.state &&
              <Segment secondary>
                <Header as="h3" color="blue" textAlign="center">Review</Header> <hr />
                <Header as="h4">Owner</Header>
                { this.state.owner.image ? 
                <Label as='a' image><img src={this.state.owner.image} alt='img'/>{this.state.owner.username}</Label> :
                <Label as='a' image><img src={this.props.userInfo.image} alt='img'/>{this.props.userInfo.username}</Label>
                }
                <Header as="h4">Title</Header>
                <p>{this.state.title}</p>
                <Header as="h4">Description</Header>
                <p>{this.state.description}</p>
                <Form>
                  <Form.Group inline>
                    <label>Start Date</label>
                    <DatePicker onChange={this.onChangeStart} selected={this.state.start_date} disabled={true} placeholderText={this.state.start_date.toString()} />
                    <label></label>
                    <label>End Date</label>
                    <DatePicker onChange={this.onChangeEnd} selected={this.state.end_date} disabled={true} placeholderText={this.state.end_date.toString()} />
                  </Form.Group>
                </Form>
                <Header as="h4">Tasks</Header>
                <Table basic='very' celled collapsing>
                  <Table.Body>
                    {this.state.tasks.map((task, index) => 
                      <Table.Row  key={index}>
                        <Table.Cell>
                          <Header as='h5' image textAlign='center'>
                            <Image src={task.user_image} rounded size='mini' />
                            <Header.Content>{task.user_username}</Header.Content>
                          </Header>
                        </Table.Cell>
                        <Table.Cell>{task.content}</Table.Cell>
                        <Table.Cell>
                          <Icon name="delete" onClick={() => this.handleDeleteTask(task.user_id)}/>
                        </Table.Cell>
                      </Table.Row>
                    )}
                  </Table.Body>
                </Table>
              </Segment>
            }
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

const mapStateToProps = state => {
  return {
    userInfo: state.current_user.user,
    allUsers: state.current_user.users
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createProject: (project) => dispatch(createNewProject(project)),
    updateProject: (project) => dispatch(updateProject(project))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewProject);
