import React, { Component } from 'react';

class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            res: '',
            success: false
        }
    }

    handleChange = (e) => {
        this.setState({
            email: e.target.value
        })
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        if (this.state.email === '') {
            return this.setState({res: 'Please enter an email address'});
        }
        const button = document.getElementById('sendEmailButton');
        button.innerHTML = "Sending...";
        await fetch('/users/forgotPassword', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({email: this.state.email})
        })
        .then(res => {
            if (res.status === 200) {
                this.setState({success: true})
            }
            return res.json();
        })
        .then(data => {
                button.innerHTML = "Send Email";
                this.setState({
                    res: data.response,
                    email: ''
                })
        })
    }

    render() {
        return (
            <div>
                <h1>Please enter your email</h1>
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