import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import CONSTANTS from '../constants';
import { confirmUser, userLogout } from '../actions';

const Login = () => <div style={{ width: '100px', display: 'flex', justifyContent: 'space-around' }}>
  <Link to="/login">Login</Link>
  <Link to="/signup">SignUp</Link>
</div>


class Auth extends Component {
  onLogOut = () => {
    this.props.userLogout();
  }

  componentDidMount() {
    if (!this.props.isLoggedIn) this.setUser();
  }

  setUser = () => {
    if(!this.props.isLoggedIn && window.localStorage.getItem('jwt')) {
      this.props.confirmUser();
    }
  }

  logOut = () => {
    const { username, type } = this.props.user;
    return (
      <div>
        {
          type === CONSTANTS.ADMIN &&
          <Link to="/users">Users</Link>
        }
        Welcome, {username}. <span onClick={() => this.onLogOut()}>Logout</span>.
      </div>
    );
  }

  render() {
    const { isLoggedIn } = this.props;
    return (
      <div>
        {
          isLoggedIn ?
            this.logOut() : <Login />
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

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    confirmUser,
    userLogout,
  }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Auth);
