import React, { Component } from 'react';

class Feedback extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comment: '',
            response: '',
            success: '',
            refId: ''
        }
    }


    handleChange = (e) => {
        this.setState({
            comment: e.target.value
        })
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        const button = document.getElementById('submitButton');
        button.innerHTML = "Submitting...";
        button.disabled = true;
        button.classList.add('submitting');


        const regex = /^(?=.*[A-Z0-9])[\w.,!"'#^()-_@\\\r\n/$ ]+$/i;
        const confirmNotes = this.state.comment.match(regex);
        if (!confirmNotes  && this.state.comment !== '') {
            button.classList.remove('submitting');
            button.innerHTML = 'Save Run';
            button.disabled = false;
            return alert('Your comment contains unsupported characters!')
        }

        if (this.state.comment === '') {
            button.classList.remove('submitting');
            button.innerHTML = 'Save Run';
            button.disabled = false;
            return alert('Please enter something into the text field')
        }

        if (this.state.comment.length > 1000) {
            button.classList.remove('submitting');
            button.innerHTML = 'Save Run';
            button.disabled = false;
            return alert('Comment is longer than the 1000 character limit');
        }

        const token = localStorage.getItem('token');
        const username = localStorage.getItem('user');

        const comment = {
            username: username,
            comment: this.state.comment
        }
        await fetch('/feedback/newComment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(comment)
        })
        .then(res => {
            if (res.status !== 201) {
                return this.setState({
                    success: 'failed',
                    response: 'An error has occured, please try again!'
                })
            }
            return res.json()
        })
        .then(data => this.setState({
            success: 'success',
            response: 'Feedback recieved! Your reference number is: ',
            refId: data.refId
        }))
        button.innerHTML = "Send Feedback";
        button.disabled = false;
        button.classList.remove('submitting');
    }

    render() {
        return (
            <div id="userFeedback">
                <h3>Send Feedback!</h3>
                <p className="feedbackBlurb">Did you find a bug?</p>
                <p className="feedbackBlurb">Would you like to request a fan-made game or a new challenge run variation to be added?</p>
                <p className="feedbackBlurb">Any and all feedback is appreciated!</p>
                <form onSubmit={this.handleSubmit}>
                    <textarea onChange={this.handleChange} value={this.state.comment}></textarea>
                    <button id="submitButton">Send Feedback</button>
                </form>
                <p id="response" className={this.state.success}>{this.state.response}<span className='refId'>{this.state.refId}</span></p>
            </div>
        )
    }
}

export default Feedback;
