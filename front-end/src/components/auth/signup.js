import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

class Signup extends Component {
  handleFormSubmit(formProps) {
    // Call action creator to sign up the user!
    this.props.signupUser(formProps);
  }

  renderAlert(){
    if(this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }

  render() {
    const { handleSubmit, fields: { email, username, password, passwordConfirm }} = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <fieldset className="form-group">
          <label>Email:</label>
          <input {...email} className="form-control" />
          {email.touched && email.error && <div className="error">{email.error}</div>}
        </fieldset>
        <fieldset className="form-group">
          <label>Username:</label>
          <input {...username} className="form-control" />
          {username.touched && username.error && <div className="error">{username.error}</div>}
        </fieldset>
        <fieldset className="form-group">
          <label>Password:</label>
          <input {...password} type="password" className="form-control" />
          {password.touched && password.error && <div className="error">{password.error}</div>}
        </fieldset>
        <fieldset className="form-group">
          <label>Confirm password:</label>
          <input {...passwordConfirm} type="password"  className="form-control" />
          {passwordConfirm.touched && passwordConfirm.error && <div className="error">{passwordConfirm.error}</div>}
        </fieldset>

        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">Sign up</button>

      </form>
    );
  }
}

function validate(formProps) {
  const errors = {};

  if(!formProps.email) {
    errors.email = 'Please enter your email address.';
  }

  if(!formProps.username) {
    errors.username = 'Please enter a username.';
  }

  if(!formProps.password) {
    errors.password = 'Please enter a password.';
  }

  if(!formProps.passwordConfirm) {
    errors.passwordConfirm = 'Please enter a password confirmation.';
  }

  if (formProps.password !== formProps.passwordConfirm) {
    errors.password = 'Passwords must match.';
  }

  return errors;
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

export default reduxForm({
  form: 'signup',
  fields: ['email', 'username', 'password', 'passwordConfirm'],
  validate
}, mapStateToProps, actions)(Signup);