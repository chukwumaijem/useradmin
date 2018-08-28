import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'

class Users extends Component {
  state = {}

  render() {
    const { isLoggedIn, user } = this.props;
    const isAdmin = isLoggedIn && user.type === 'Admin';
    console.log('===isadmin==', isAdmin)
    return (
      <div>
        {
          isAdmin ?
          <p>Users</p> : <Redirect to="/" />
        }
      </div>
    )
  }
}

function mapStateToProps({ user: { data, isLoggedIn } }) {
  console.log('===isLoggedIn==', isLoggedIn)
  console.log('===user==', data)
  return {
    user: data,
    isLoggedIn,
  }
}
export default connect(mapStateToProps)(Users);