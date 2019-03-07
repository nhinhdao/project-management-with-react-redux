import React from 'react';
import { Button, Image, Modal, Header} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class UserInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = { user: { name: '' } };

    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    const { match: { params } } = this.props;
    fetch(`/api/v1/users/${params.userId}`)
      .then(resp => resp.json())
      .then(({ data: user }) => {
        this.setState({ user });
      });
  }

  render() {
    const { user } = this.state;

    return (
      <Modal open dimmer="blurring">
        <Modal.Content image>
          <Image wrapped size="tiny" src={user.image} />
          <Modal.Description>
            <Header as='h3' color="blue">{user.name}</Header>
            <p>Email: {user.email}</p>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Link to="/home"><Button>Close</Button></Link>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default UserInfo;