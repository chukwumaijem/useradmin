import React, { Component } from 'react';

class SignUp extends Component {
  state = {}

  handleChange = (e, type) => {
    this.setState({ [type]: e.target.value });
  }

  render() {
    const { username, email, password } = this.state;
    return (
      <div>
        <form>
          <input type="text" placeholder="Username" onChange={(e) => this.handleChange(e, 'username')} value={username} />
          <input type="text" placeholder="Email" onChange={(e) => this.handleChange(e, 'email')} value={email} />
          <input type="password" placeholder="Password" onChange={(e) => this.handleChange(e, 'password')} value={password} />
        </form>
      </div>
    )
  }
}

export default SignUp;