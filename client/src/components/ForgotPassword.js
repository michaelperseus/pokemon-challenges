import React, { Component } from 'react';

class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            res: '',
            resCode: 0
        }
    }

    handleChange = (e) => {
        this.setState({
            email: e.target.value
        })
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        const button = document.getElementById('sendEmailButton');
        button.innerHTML = "sending...";
        await fetch('/users/verifyEmail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
              },
              body: JSON.stringify({email: this.state.email})
        })
        .then(res => {
            return res.json();
        })
        .then(data => {
                button.innerHTML = "Send Email";
                this.setState({
                    res: data.status,
                    email: ''
                })
        })
    }

    render() {
        return (
            <div>
                <h1>Reset Password does not work yet</h1>
                <form onSubmit={this.handleSubmit}>
                    <input type="email" placeholder="enter your email" value={this.state.email} onChange={this.handleChange}></input>
                    <button id="sendEmailButton">Send Reset Email</button>
                </form>
                <h3>{this.state.res}</h3>
            </div>
        )
    }
}

export default ForgotPassword;