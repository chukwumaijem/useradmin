import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { confirmUser, userLogout } from '../actions';
import { IState, IUser } from '../interfaces';

const Login = () => <div style={{ width: '100px', display: 'flex', justifyContent: 'space-around' }}>
  <Link to="/login">Login</Link>
  <Link to="/signup">SignUp</Link>
</div>

interface IProps {
  userLogout: () => void;
  isLoggedIn: boolean;
  confirmUser: () => void;
  user: IUser;
}

class Auth extends Component<IProps> {
  onLogOut = () => {
    this.props.userLogout();
  }

  componentDidMount() {
    if (!this.props.isLoggedIn) this.setUser();
  }

  setUser = () => {
    if (!this.props.isLoggedIn && window.localStorage.getItem('jwt')) {
      this.props.confirmUser();
    }
  }

  logOut = () => {
    const { username, isAdmin } = this.props.user;
    return (
      <div>
        {
          isAdmin &&
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

function mapStateToProps(state: IState) {
  const { data, isLoggedIn } = state;
  return {
    user: data,
    isLoggedIn,
  };
}

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators({
    confirmUser,
    userLogout,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
