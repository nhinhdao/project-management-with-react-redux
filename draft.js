

<Card.Group>
  <Card>
    <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' />
    <Card.Content>
      <Card.Header>Matthew</Card.Header>
      <Card.Description>
        Matthew is a musician living in Nashville.
      </Card.Description>
    </Card.Content>
    </Card>
</Card.Group>

<div onClick={this.handleOpen} {...itemProps({style: {backgroundColor: item.bgColor, color: 'black'}})}>
  <div style={{overflow: "hidden", whiteSpace: "nowrap"}}>{item.description}</div>
    </div>

<Modal trigger={<div onClick={this.handleOpen} style={{backgroundColor: item.bgColor, color: 'black'}}>{item.description}</div>} 
open={this.state.modalOpen} onClose={this.handleClose}>

import Timeline from 'react-calendar-timeline'
import 'react-calendar-timeline/lib/Timeline.css'

if (!localStorage.getItem("userID")) {
  debugger
  this.props.history.push('/login');
  return null;
}