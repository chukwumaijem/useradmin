import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateUserData, deleteUser } from '../../actions';

class User extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      editing: false,
      email: props.email,
      username: props.username,
      isAdmin: props.isAdmin,
    }
  }
  showPresentationView = () => {
    const { email, username, isAdmin } = this.state;
    const { _id, qs } = this.props;
    return (
      <p>
        <strong><label>Email:</label></strong> {email} -
        <strong><label>Username:</label></strong> {username} -
        <strong><label>isAdmin:</label></strong> {isAdmin.toString()}
        <button onClick={() => this.setState({ editing: true })}>Edit</button>
        <button
          onClick={() => this.props.deleteUser({ _id }, qs)}>
          Delete
        </button>
      </p>
    )
  }
  handleInputChange = (e: any, type: any) => {
    this.setState({ [type]: e.target.value });
  }

  updateUser = () => {
    const { email, username, isAdmin } = this.state;
    const { _id } = this.props;
    this.setState({ editing: false });
    this.props.updateUserData({ email, username, isAdmin, _id }, this.props.qs);
  }
  cancelUpdate = () => {
    this.setState({ editing: false });
  }

  showEditingView = () => {
    const { email, username, isAdmin } = this.state;
    console.log('===isAdmin==', isAdmin)
    return (
      <p>
        <strong><label>Email:</label></strong>
        <input type="text" value={email} onChange={(e) => this.handleInputChange(e, 'email')} /> -
        <strong><label>Username:</label></strong>
        <input type="text" value={username} onChange={(e) => this.handleInputChange(e, 'username')} />  -
        <strong><label>isAdmin:</label></strong>
        <input type="checkbox" checked={isAdmin} onChange={() => this.setState({ isAdmin: !isAdmin })} />
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

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators({
    updateUserData,
    deleteUser,
  }, dispatch);
}
export default connect(null, mapDispatchToProps)(User);
