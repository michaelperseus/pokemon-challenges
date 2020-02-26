import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Reset extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pass1: '',
            pass2: '',
            tokenCheck: '',
            response: '',
            success: null
        }
    }

    async componentDidMount() {
        await fetch(`/users/verifyToken/${this.props.match.params.token}`)
        .then(res => {
            if (res.status !== 200) {
                this.setState({tokenCheck: 'Reset Password token is invalid or has expired. Please try again'})
            }
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();

        if (this.state.pass1 !== this.state.pass2 || this.state.pass1 === '') {
            console.error('Passwords do not match')
        } 

        const button = document.getElementById('resetButton');
        button.disabled = true;
        button.innerHTML = "Please Wait...";

        const newData = {
            resetToken: this.props.match.params.token,
            password: this.state.pass1
        }

        fetch('/users/resetPassword', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newData)
        })
        .then(res => {
            if (res.status === 201) {
                this.setState({success: true})
            } else {
                this.setState({success: false})
            }
            return res.json()
        })
        .then(data => {
            this.setState({response: data.response})
            if (this.state.success === false) {
                button.disabled = false;
                button.innerHTML = 'Save Password';
            } else {
                button.innerHTML = 'Save Password';
            }
        })

    }

    render() {
        if (this.state.tokenCheck !== '') {
            return (
                <div id="resetPassword">
                    <p>{this.state.tokenCheck}</p>
                    <Link to={'/forgot-password'}>Reset Password</Link>
                </div>
            )
        } else {
            return (
                <div id="resetPassword">
                    <h1>Please enter your new password below</h1>
                    <form onSubmit={this.handleSubmit}>
                        <label>New Password</label><br></br>
                        <input type='password' name='pass1' onChange={this.handleChange} value={this.state.pass1}/><br></br>
                        <label>Repeat New Password</label><br></br>
                        <input type='password' name='pass2' onChange={this.handleChange} value={this.state.pass2}/>
                        <button id="resetButton">Save Password</button>
                    </form>
                    <h3>{this.state.response}</h3>
                </div>
            )
        }
    }
}


export default Reset;