import Timeline from 'new-react-calendar-timeline/lib';
import moment from 'moment';
import React, { Component} from 'react';
import { Header, Image, Modal, Form, Label, Table} from 'semantic-ui-react';
import {connect} from 'react-redux';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

class ProjectTimeline extends Component {
  state = {date: new Date()}

  handleChange = (date) => this.setState({ date: date })

  itemRenderer = ({ item }) => {
    return (
      <Modal trigger={<div>{item.description}</div>}>
        <Modal.Header>{item.title}</Modal.Header>
        <Modal.Content image>
          <Modal.Description>
            <Header as="h4">Owner</Header>
            <Label as='a' image><img src={item.owner.image} alt='img'/>{item.owner.username}</Label>
            <Header as="h4">Description</Header>
            <p>{item.description}</p>
            <Form>
              <Form.Group inline>
                <label>Start Date</label>
                <DatePicker onChange={this.handleChange} selected={item.start_time.toDate()} disabled={true} placeholderText={item.start_time.toString()}/>
                <label></label>
                <label>End Date</label>
                <DatePicker onChange={this.handleChange} selected={item.end_time.toDate()} disabled={true} placeholderText={item.end_time.toString()} />
              </Form.Group>
            </Form>
            <Header as="h4">Tasks</Header>
            <Table basic='very' celled collapsing>
              <Table.Body>
                {item.tasks.map((task, index) => 
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
      </Modal>
    )
  }

  render(){
    const groups = [];
    const items = [];

    this.props.projects.forEach(function(project, index){
      groups.push({id: index + 1, title: project.title}); 
      items.push({
        id: project.id, group: index + 1, title: project.title, start_time: moment(project.start_date), end_time: moment(project.end_date),
        owner: project.owner, description: project.description, tasks: project.tasks,
        canMove: false, canResize: false, canChangeGroup: false
      })}
    )
    
    return(
      <Timeline groups={groups}
      items={items}
      sidebarContent={<Header as='h4' textAlign='center'>Project</Header>}
      itemRenderer={this.itemRenderer}
      defaultTimeStart={moment('2019-03-08')}
      defaultTimeEnd={moment('2019-04-08')}
      lineHeight={35}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    projects: state.allProjects.projects
  }
}

export default connect(mapStateToProps)(ProjectTimeline);