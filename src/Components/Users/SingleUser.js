import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateUserData, deleteUser } from '../../actions';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      email: props.email,
      username: props.username,
      type: props.type,
    }
  }
  showPresentationView = () => {
    const { email, username, type } = this.state;
    const { _id, qs } = this.props;
    return (
      <p>
        <strong><label>Email:</label></strong> {email} -
        <strong><label>Username:</label></strong> {username} -
        <strong><label>UserType:</label></strong> {type}
        <button onClick={() => this.setState({ editing: true })}>Edit</button>
        <button
          onClick={() => this.props.deleteUser({ _id }, qs)}>
          Delete
        </button>
      </p>
    )
  }
  handleInputChange = (e, type) => {
    this.setState({ [type]: e.target.value });
  }

  updateUser = () => {
    const { email, username, type } = this.state;
    const { _id } = this.props;
    this.setState({ editing: false });
    this.props.updateUserData({ email, username, type, _id }, this.props.qs);
  }
  cancelUpdate = () => {
    this.setState({ editing: false });
  }

  showEditingView = () => {
    const { email, username, type } = this.state;
    return (
      <p>
        <strong><label>Email:</label></strong>
        <input type="text" value={email} onChange={(e) => this.handleInputChange(e, 'email')} /> -
        <strong><label>Username:</label></strong>
        <input type="text" value={username} onChange={(e) => this.handleInputChange(e, 'username')} />  -
        <strong><label>UserType:</label></strong>
        <input type="text" value={type} onChange={(e) => this.handleInputChange(e, 'type')} />
        <button onClick={this.updateUser}>Save</button>
        <button onClick={this.cancelUpdate}>Cancel</button>
      </p>
    )
  }

  render() {
    const { editing } = this.state;
    return (
      <div>
        {
          editing ?
            this.showEditingView() : this.showPresentationView()
        }
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    updateUserData,
    deleteUser,
  }, dispatch);
}
export default connect(null, mapDispatchToProps)(User);