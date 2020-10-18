import React from 'react';
import Joi from 'joi';
import { Redirect } from 'react-router-dom';
import auth from '../services/authService';
import Form from './common/Form';

class LoginForm extends Form {
  state = {
    data: { email: '', password: '' },
    errors: {}
  };

  schema = {
    email: Joi.string().min(5).required().email({ tlds: { allow: false } }).label('Email'),
    password: Joi.string().min(5).required().label('Password'),
  };

  doSubmit = async () => {
    try {
      const { email, password } = this.state.data;
      await auth.login(email, password);

      const { state } = this.props.location;
      window.location = state ? state.from.pathname : '/';
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = error.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    if (auth.getAuthUser()) return <Redirect to="/" />

    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('email', 'Email')}
          {this.renderInput('password', 'Password', 'password')}
          {this.renderButton('Login')}
        </form>
      </div>
    );
  }
}

export default LoginForm;
