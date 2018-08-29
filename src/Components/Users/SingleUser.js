import React, { Component } from 'react';

class User extends Component {
  render() {
    const { email, username, type } = this.props;
    return (
      <div>
        <p>
          <label>Email:</label> {email} -
          <label>Username:</label> {username} -
          <label>UserType:</label> {type}
        </p>
      </div>
    );
  }
}

export default User;