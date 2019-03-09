import Timeline from 'new-react-calendar-timeline/lib';
import moment from 'moment';
import React, { Component} from 'react';
 
const groups = [
  {id: 1, title: 'Make React App'},
  {id: 2, title: 'Scrape Website'},
  {id: 3, title: 'Go Snowboarding'},
  {id: 4, title: 'Go sleep'}
]
 
const items = [
  {id: 1, group: 1, title: 'Project Management Project', start_time: moment('2019-03-08'), end_time: moment('2019-03-12')},
  {id: 2, group: 2, title: 'Hell yeah, I will do it', start_time: moment('2019-03-10'), end_time: moment('2019-03-16')},
  {id: 3, group: 3, title: 'I am sleepy ah', start_time: moment('2019-03-20'), end_time: moment('2019-03-22')},
  {id: 4, group: 4, title: 'See ya tomorrow', start_time: moment('2019-03-12'), end_time: moment('2019-03-17')}
]

 
export default class MyPage extends Component{
  itemRenderer = ({ item }) => {
    return (
      <div className='custom-item'>
        <span className='title'>{item.title}</span>
      </div>
    )
  }
  render(){
    return(
    <Timeline groups={groups}
    items={items}
    itemRenderer={this.itemRenderer}
    defaultTimeStart={moment('2019-03-08')}
    defaultTimeEnd={moment('2019-04-08')}
    />
    )
  }
}