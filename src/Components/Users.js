import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { fetchUsers } from '../actions';
import { bindActionCreators } from 'redux';

const User = (user) => {
  const { email, username, type } = user;
  return (
    <div>
      <p>
        <label>Email:</label> {email} -
        <label>Username:</label> {username} -
        <label>UserType:</label> {type}
      </p>
    </div>
  )
}

class Users extends Component {
  state = {
    per_page: 1,
    page: 1,
    type: 'all',
  }

  componentDidMount() {
    this.updateQuery()
  }

  updateQuery = () => {
    const { per_page, page, type } = this.state;
    let qs = `?per_page=${per_page}&page=${page}`;
    if (type !== 'all') qs += `&type=${type}`;

    this.props.fetchUsers(qs);
  }

  showPerPage = () => {
    return (<select onChange={(e) => this.setState({ per_page: e.target.value })}>
      <option value="1">1</option>
      <option value="3">3</option>
      <option value="5">5</option>
    </select >
    )
  }

  showPagination = () => {
    const { usersList } = this.props;
    if (usersList) {
      const { per_page, total } = usersList;
      const pages = total / per_page;
      const blankArray = [];
      blankArray.length = Math.ceil(pages, 10);
      const buttons = blankArray.fill(1, 0).map((num, index) => {
        const page = index + 1;
        return <button key={index} onClick={() => {
          this.setState({ page })
          this.updateQuery();
        }}>{page}</button>
      });

      return <div>{buttons}</div>
    }
    return '';
  }

  userTypeChange = (e) => {
    this.setState({ type: e.target.value });
  }

  showFilters = () => {
    return <div>
      Filters
      All <input type="radio" name="type" value="all" onChange={this.userTypeChange} />
      Admin <input type="radio" name="type" value="Admin" onChange={this.userTypeChange} />
      User <input type="radio" name="type" value="User" onChange={this.userTypeChange} />
    </div>
  }

  showUsers = () => {
    const { usersList } = this.props;
    const users = usersList ? usersList.data : [];
    return <div>
      <p>Users Per Page: {this.showPerPage()}</p>
      {this.showFilters()}
      {users.map(user => <User {...user} key={user._id} />)}
      {this.showPagination()}
      <button onClick={() => this.updateQuery()}>Load Users</button>
    </div>
  }

  render() {
    const { isLoggedIn, user } = this.props;
    const isAdmin = isLoggedIn && user.type === 'Admin';
    return (
      <div>
        {
          isAdmin ?
            this.showUsers() : <Redirect to="/" />
        }
      </div>
    )
  }
}

function mapStateToProps({ user: { data, isLoggedIn, usersList } }) {
  return {
    user: data,
    isLoggedIn,
    usersList
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchUsers,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);
