import Timeline from 'new-react-calendar-timeline/lib';
import moment from 'moment';
import React, { Component} from 'react';
import { Header, Image, Modal, Form, Label, Table, Button} from 'semantic-ui-react';
import {connect} from 'react-redux';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import randomColor from 'randomcolor';
import {Link} from 'react-router-dom';

class ProjectTimeline extends Component {
  state = {date: new Date(), modalOpen: false}

  handleChange = (date) => this.setState({ date: date })
  handleOpen = () => this.setState({modalOpen: true})
  handleClose = () => this.setState({modalOpen: false})

  itemRenderer = ({ item }) => {
    return (
      <Modal trigger={<div onClick={this.handleOpen} style={{backgroundColor: item.bgColor, color: 'black'}}>{item.description}</div>} 
      open={this.state.modalOpen} onClose={this.handleClose}>
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
        <Modal.Actions>
          <Link to={`/projects/${item.id}/edit`}><Button positive>Edit</Button></Link>
          <Button onClick={this.handleClose}>Close</Button>
        </Modal.Actions>
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
        canMove: false, canResize: false, canChangeGroup: false,
        bgColor: randomColor({luminosity: "light", format: "rgba", alpha: 0.5})
      })}
    )
    
    return(
      <Timeline groups={groups}
      items={items}
      sidebarContent={<h3>Project</h3>}
      itemRenderer={this.itemRenderer}
      itemHeightRatio={0.7}
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
