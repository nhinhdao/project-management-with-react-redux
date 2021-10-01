import Timeline from 'new-react-calendar-timeline/lib';
import moment from 'moment';
import React, { Component} from 'react';
import "react-datepicker/dist/react-datepicker.css";
import randomColor from 'randomcolor';
import {Button} from 'semantic-ui-react';
import {Link} from 'react-router-dom';

class ProjectTimeline extends Component {
  itemRenderer = ({ item }) => {
    return (
    <Link to={`/projects/${item.id}`}><div onClick={this.handleOpen} style={{backgroundColor: item.bgColor, color: 'black'}}>{item.title}</div></Link>
    )
  }

  render(){
    const groups = [];
    const items = [];

    this.props.projects.forEach(function(project, index){
      groups.push({id: index + 1, title: project.title});
      items.push({
        id: project.id, group: index + 1, title: project.description,
        start_time: moment(project.start_date), end_time: moment(project.end_date),
        canMove: false, canResize: false, canChangeGroup: false,
        bgColor: randomColor({luminosity: "light", format: "rgba", alpha: 0.8})
      })}
    )

    const timeline = (
      <Timeline
        groups={groups}
        items={items}
        sidebarContent={<h3>Project</h3>}
        itemRenderer={this.itemRenderer}
        itemHeightRatio={0.7}
        defaultTimeStart={moment()}
        defaultTimeEnd={moment().add(1, "years")}
        lineHeight={35}/>
    )

    const emptyTimeLine = (
      <h3>Wow, such empty. Please create a project to see it here!</h3>
    )

    const renderTimeline = () => {
      return this.props.projects.length == 0 ? emptyTimeLine : timeline;
    }

    return(
      <React.Fragment>
        <div>
          <Button size='small' color='grey'>Projects: {this.props.projects.length}</Button> <Link to={`/newproject`}><Button size='small' color='teal'>Add New Project</Button></Link>
        </div>
        <hr/>
        { renderTimeline() }
      </React.Fragment>
    )
  }
}

export default ProjectTimeline;
