import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { userSignup } from '../actions';

class SignUp extends Component <any, any> {
  state = {
    username: '',
    email: '',
    password: '',
    isAdmin: false,
  }

  handleChange = (e: any, type: any) => {
    this.setState({ [type]: e.target.value });
  }

  handleCheckboxChange = (e: any) => {
    let { isAdmin } = this.state;

    this.setState({ isAdmin: !isAdmin });
  }

  onSubmit = () => {
    const { username, email, password, isAdmin } = this.state;
    this.props.userSignup({ username, email, password, isAdmin })
      .then(() => {
        window.location.href = '/';
      });
  }

  render() {
    const { username, email, password, isAdmin } = this.state;
    return (
      <div>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => this.handleChange(e, 'username')}
          value={username}
        />
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
        <input
          type="checkbox"
          value="isAdmin"
          onChange={this.handleCheckboxChange}
          checked={isAdmin}
        />
        <button type="button" onClick={this.onSubmit}>Signup</button>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators({
    userSignup
  }, dispatch);
}

export default connect(null, mapDispatchToProps)(SignUp);
