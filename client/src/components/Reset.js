import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Reset extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pass1: '',
            pass2: '',
            tokenCheck: '',
            goodResponse: '',
            badResponse: '',
            success: null
        }
    }

    async componentDidMount() {
        await fetch(`/users/verifyToken/${this.props.match.params.token}`)
        .then(res => {
            if (res.status !== 200) {
                this.setState({tokenCheck: 'Reset Password token is invalid or has expired. Please try again by clicking the link below!'})
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
            return this.setState({badResponse: 'Your passwords do not match'})
        } 

        const button = document.getElementById('resetButton');
        button.disabled = true;
        button.classList.add('disabledButton');
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
            if (this.state.success === false) {
                this.setState({badResponse: data.response})
                button.disabled = false;
                button.classList.remove('disabledButton');
                button.innerHTML = 'Save Password';
            } else {
                this.setState({
                    goodResponse: data.response,
                    badResponse: ''
                });
                button.innerHTML = 'Password Updated';
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
                    <p>Please enter your new password below</p>
                    <form onSubmit={this.handleSubmit}>
                        <div className="formGroup">
                        <label>New Password <span className="smallWarning">Length: 6 - 20 characters, only AlphaNumeric</span></label>
                        <input type='password' name='pass1' onChange={this.handleChange} value={this.state.pass1}/>
                        </div>
                        <div className="formGroup">
                        <label>Repeat New Password</label>
                        <input type='password' name='pass2' onChange={this.handleChange} value={this.state.pass2}/>
                        </div>
                        <button id="resetButton">Save Password</button>
                    </form>
                    <h3 className="goodResponse">{this.state.goodResponse}</h3>
                    <h3 className="badResponse">{this.state.badResponse}</h3>
                </div>
            )
        }
    }
}


export default Reset;