import React from 'react';
import { Card, Image, Button} from 'semantic-ui-react';
import { connect } from "react-redux";

class UsersPage extends React.Component {
  render() {
    return (
    <Card.Group>
    {this.props.allUsers.map(user => 
      <Card key={user.id}>
        <Card.Content textAlign='center'>
          <Image size='small' src={user.image} />
          <Card.Description>
          <strong>{user.username}</strong><br/>
            {user.email}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <div className='ui two buttons'>
            <Button basic color='blue'>
              Projects: {user.project_count}
            </Button>
            <Button basic color='pink'>
              Tasks: {user.task_count}
            </Button>
          </div>
        </Card.Content>
      </Card>
      )}
    </Card.Group>
    );
  }
}

const mapStateToProps = state => {
  return {
    allUsers: state.current_user.users
  }
}


export default connect(mapStateToProps)(UsersPage);
