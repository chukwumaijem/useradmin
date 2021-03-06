import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from "react-router-dom";
import { userLogin } from '../actions';

class Login extends Component<any> {
  state = {
    email: '',
    password: '',
  }

  handleChange = (e: any, type: any) => {
    this.setState({ [type]: e.target.value });
  }

  onSubmit = () => {
    const { email, password } = this.state;
    this.props.userLogin({ email, password });
  }
  loginForm = () => {
    const { email, password } = this.state;
    return (
      <div>
        <input
          type="text"
          placeholder="Email"
          onChange={(e) => this.handleChange(e, 'email')}
          value={email}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => this.handleChange(e, 'password')}
          value={password}
        />
        <button type="button" onClick={this.onSubmit}>Login</button>
      </div>
    )
  }
  render() {
    const { isLoggedIn, isLookingForUser } = this.props;
    return (
      <div>
        {isLoggedIn && <Redirect to='/' />}
        {isLookingForUser && <p>Logging In</p>}
        {!isLoggedIn && !isLookingForUser && this.loginForm()}
      </div>
    )
  }
}

function mapStateToProps(state: any) {
  const { user: { isLoggedIn, isLookingForUser } } = state;
  return {
    isLoggedIn,
    isLookingForUser
  }
}

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators({
    userLogin
  }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);
