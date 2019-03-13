

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

import Timeline from 'new-react-calendar-timeline/lib';

import Timeline from 'react-calendar-timeline'
import 'react-calendar-timeline/lib/Timeline.css'