import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { userSignup } from '../actions';

class SignUp extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    type: 'User'
  }

  handleChange = (e, type) => {
    this.setState({ [type]: e.target.value });
  }

  handleCheckboxChange = (e) => {
    let { type } = this.state;
    if (type !== 'Admin') {
      type = 'Admin';
    } else {
      type = 'User';
    }
    this.setState({ type });
  }

  onSubmit = () => {
    const { username, email, password, type } = this.state;
    this.props.userSignup({ username, email, password, type })
      .then(() => {
        window.location.href = '/';
      });
  }

  render() {
    const { username, email, password, type } = this.state;
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
          checked={type === 'Admin'}
        />
        <button type="button" onClick={this.onSubmit}>Signup</button>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    userSignup
  }, dispatch);
}

export default connect(null, mapDispatchToProps)(SignUp);