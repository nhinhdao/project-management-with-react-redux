import Timeline from 'new-react-calendar-timeline/lib';
import moment from 'moment';
import React, { Component} from 'react';
import {connect} from 'react-redux';
import "react-datepicker/dist/react-datepicker.css";
import randomColor from 'randomcolor';
import {Link} from 'react-router-dom';
import {Segment, Header, Button} from 'semantic-ui-react';

class ProjectTimeline extends Component {
  state = { projects: []}

  componentDidMount(){
    console.log("Mount timeline");
    
    const id = localStorage.getItem('userID')
    fetch(`http://localhost:3001/api/v1/allprojects/${id}`)
        .then(response => response.json())
        .then(data => this.setState({projects: data}));
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.projects !== nextState.projects;
  }

  itemRenderer = ({ item }) => {
    return (
    <Link to={`/projects/${item.id}`}><div onClick={this.handleOpen} style={{backgroundColor: item.bgColor, color: 'black'}}>{item.title}</div></Link>
    )
  }

  render(){
    const groups = [];
    const items = [];

    this.state.projects.forEach(function(project, index){
      groups.push({id: index + 1, title: project.title}); 
      items.push({
        id: project.id, group: index + 1, title: project.description, 
        start_time: moment(project.start_date), end_time: moment(project.end_date),
        canMove: false, canResize: false, canChangeGroup: false,
        bgColor: randomColor({luminosity: "light", format: "rgba", alpha: 0.8})
      })}
    )
    
    return(
      <React.Fragment>
        <Timeline groups={groups}
        items={items}
        sidebarContent={<h3>Project</h3>}
        itemRenderer={this.itemRenderer}
        itemHeightRatio={0.7}
        defaultTimeStart={moment('2019-03-08')}
        defaultTimeEnd={moment('2019-04-08')}
        lineHeight={35}
        />
        {this.state.projects.length === 0 && 
          <Segment color='blue'>
            <Header as='h5' color='red'>You have no project at the moment. Please add project to continue!</Header>
            <Link to={`/newproject`}><Button color='green'>Add New Project</Button></Link>
          </Segment>}
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    projects: state.allProjects.projects
  }
}

export default connect(mapStateToProps)(ProjectTimeline);
