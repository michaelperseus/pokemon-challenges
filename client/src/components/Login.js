import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '', 
            password2: '',
            email: '',
            login: true,
            res: ''
        }
    }

    togglePage = () => {
      this.setState({
        login: !this.state.login
      })
    }

    handleInputChange = (e) => {
        const { value, name } = e.target;
        this.setState({
          [name]: value
        });
      }

      onSubmit = async (e) => {
        e.preventDefault();
        //Send the user information to sign up
        if (this.state.username === '' || this.state.password === '') {
          return alert('Please fill out all fields!')
        }
        if (e.target.name === 'signUp') {
          if (this.state.password !== this.state.password2) {
            return alert('Passwords do not match');
          }
          const userInfo = {
            username: this.state.username,
            password: this.state.password,
            email: this.state.email
          }
          await fetch('/users/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(userInfo)
          }).then((res) => {
            console.log(res);
            this.setState({res: res.status})
            return res.json()
          }).then(data => {
            console.log(this.data);
            if (this.state.res !== 201) {
              return alert('Signup Failed')
            } else {
              localStorage.setItem('user', data.user.username);
              localStorage.setItem('token', data.token);
              this.props.history.push('/');
              window.location.reload(true);
            }
          })
        } 
        //Send the user information to log in
        else {
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
                    localStorage.setItem('avatar', data.user.avatar);
                    this.props.history.push('/');
                    window.location.reload(true);
                  });
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
        
      }

      render() {
        if (this.state.login) {
          return (
            <div className='loginPage'>
              <form onSubmit={this.onSubmit} className="loginForm" name="login">
                <h1>Login!</h1>
                <label>Username</label>
                <input
                  className="loginInput"
                  type="text"
                  name="username"
                  placeholder="Enter username"
                  value={this.state.username}
                  onChange={this.handleInputChange}
                  required
                />
                <label>Password</label>
                <input
                  className="loginInput"
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  value={this.state.password}
                  onChange={this.handleInputChange}
                  required
                />
              <input type="submit" value="Login" className="loginButton"/>
              </form>
              <p className="togglePage"><span onClick={this.togglePage}>Don't have an account? Sign up!</span></p>
              <p className="forgotPass"><Link to={"/forgot-password"}>Forget your password?</Link></p>
            </div>
          );
        } else {
          return (
            <div className='loginPage'>
              <form onSubmit={this.onSubmit} className="loginForm" name="signUp">
                <h1>Sign Up!</h1>
                <label>Email</label>
                <input
                  className="loginInput"
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  value={this.state.email}
                  onChange={this.handleInputChange}
                  required
                />
                <label>Username <span className="smallWarning">Length: 3 - 20 characters, only AlphaNumeric</span></label>
                <input
                  className="loginInput"
                  type="text"
                  name="username"
                  placeholder="Enter username"
                  value={this.state.username}
                  onChange={this.handleInputChange}
                  required
                />
                <label>Password <span className="smallWarning">Length: 6 - 20 characters, only AlphaNumeric</span></label>
                <input
                  className="loginInput"
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  value={this.state.password}
                  onChange={this.handleInputChange}
                  required
                />
                <label>Repeat Password</label>
                <input
                  className="loginInput"
                  type="password"
                  name="password2"
                  placeholder="Enter password"
                  value={this.state.password2}
                  onChange={this.handleInputChange}
                  required
                />
              <input type="submit" value="Sign Up" className="loginButton"/>
              </form>
              <p className="togglePage"><span onClick={this.togglePage}>Already have an account? Log in!</span></p>
            </div>
          );
        }
        
      }
}
