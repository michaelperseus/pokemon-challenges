import React, { Component } from 'react'

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }

    handleInputChange = (e) => {
        const { value, name } = e.target;
        this.setState({
          [name]: value
        });
      }

      onSubmit = (e) => {
        e.preventDefault();
        fetch('/users/authenticate', {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            if (res.status === 200) {
                res.json().then(data => {
                  localStorage.setItem('user', data.user.username);
                  localStorage.setItem('token', data.token);
                  this.props.history.push('/');
                  window.location.reload(true);
                });
                // res.json().then(data => localStorage.setItem('user', data.username));
                // this.props.history.push('/');
                // window.location.reload(true);
            } else {
                const error = new Error(res.error);
                throw error;
            }
        })
        .catch(err => {
            console.error(err);
            alert('Error logging in');
        })
      }

      render() {
        return (
          <form onSubmit={this.onSubmit}>
            <h1>Login Below!</h1>
            <input
              type="text"
              name="username"
              placeholder="Enter username"
              value={this.state.username}
              onChange={this.handleInputChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={this.state.password}
              onChange={this.handleInputChange}
              required
            />
           <input type="submit" value="Submit"/>
          </form>
        );
      }
}
