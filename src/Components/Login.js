import React, { Component } from 'react';

class Login extends Component {
  state = {}

  handleChange = (e, type) => {
    this.setState({ [type]: e.target.value });
  }

  render() {
    const { email, password } = this.state;
    return (
      <div>
        <form>
          <input type="text" placeholder="Email" onChange={(e) => this.handleChange(e, 'email')} value={email} />
          <input type="password" placeholder="Password" onChange={(e) => this.handleChange(e, 'password')} value={password} />
        </form>
      </div>
    )
  }
}

export default Login;