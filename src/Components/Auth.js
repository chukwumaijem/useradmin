import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import CONSTANTS from '../constants';

const Login = () => <div style={{ width: '100px', display: 'flex', justifyContent: 'space-around' }}>
  <Link to="/login">Login</Link>
  <Link to="/signup">SignUp</Link>
</div>


class Auth extends Component {
  onLogOut = () => {
    localStorage.removeItem('jwtToken');
    window.location.href = '/';
  }

  logOut = (user) => {
    const { username, type } = user;
    console.log('==tye==', type === CONSTANTS.ADMIN);
    return (
      <div onClick={() => this.onLogOut()}>
        Welcome, {`${username}`}. Logout.
        {
          type === CONSTANTS.ADMIN &&
          <Link to="/users">Users</Link>
        }
      </div>
    );
  }

  render() {
    const { isLoggedIn, user } = this.props;
    return (
      <div>
        {
          isLoggedIn ?
            this.logOut(user) : <Login />
        }
      </div>
    )
  }
}

function mapStateToProps({ user: { data, isLoggedIn } }) {
  return {
    user: data,
    isLoggedIn,
  };
}

export default connect(mapStateToProps)(Auth);
