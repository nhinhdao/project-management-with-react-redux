import React from 'react';
import { Image, Header, Table, Menu, Icon} from 'semantic-ui-react';
import { connect } from "react-redux";
import times from 'lodash.times';

class UsersPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0
    };
    this.incrementPage = this.incrementPage.bind(this);
    this.decrementPage = this.decrementPage.bind(this);
    this.setPage = this.setPage.bind(this);
    this.sortUser = this.sortUser.bind(this);
  }

  setPage(page) {
    return () => {
      this.setState({ page });
    };
  }

  decrementPage() {
    const { page } = this.state;

    this.setState({ page: page - 1 });
  }

  incrementPage() {
    const { page } = this.state;

    this.setState({ page: page + 1 });
  }

  render() {
    const TOTAL_PER_PAGE = 6;
    const {page} = this.state;
    const startIndex = page * TOTAL_PER_PAGE;
    const totalPages = Math.ceil(this.props.allUsers.length / TOTAL_PER_PAGE);
    return (
      <Table celled padded>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>User</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell>Project</Table.HeaderCell>
            <Table.HeaderCell>Task</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {this.props.allUsers.slice(startIndex, startIndex + TOTAL_PER_PAGE).map(user => 
            <Table.Row key={user.id}>
              <Table.Cell>
                <Header as='h4' image>
                  <Image src={user.image} rounded size='big' />
                  <Header.Content>
                    {user.username}
                  </Header.Content>
                </Header>
              </Table.Cell>
              <Table.Cell>{user.email}</Table.Cell>
              <Table.Cell>{user.project_count}</Table.Cell>
              <Table.Cell>{user.task_count}</Table.Cell>
            </Table.Row>
          )}
        </Table.Body>

        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan={6}>
              <Menu floated="right" pagination>
                {page !== 0 && <Menu.Item as="a" icon onClick={this.decrementPage}>
                  <Icon name="left chevron" />
                </Menu.Item>}
                {times(totalPages, n =>
                  (<Menu.Item as="a" key={n} active={n === page} onClick={this.setPage(n)}>
                    {n + 1}
                  </Menu.Item>),
                )}
                {page !== (totalPages - 1) && <Menu.Item as="a" icon onClick={this.incrementPage}>
                  <Icon name="right chevron" />
                </Menu.Item>}
              </Menu>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    );
  }
}

const mapStateToProps = state => {
  return {
    allUsers: state.current_user.users
  }
}


export default connect(mapStateToProps)(UsersPage);
