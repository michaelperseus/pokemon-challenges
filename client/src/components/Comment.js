import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            time: ''
        }
    }

    componentDidMount() {
        const time = this.props.time.split('T');
        this.setState({ time: time[0] });
        if (document.querySelector(`[data-height='${this.props.time}'`).offsetHeight < 150) {
            document.querySelector(`[data-height='${this.props.time}'`).nextSibling.classList.add('hideButton');
        }
    }

    toggleMoreComment = (e) => {
        e.target.previousSibling.classList.toggle('max-height');
        e.target.innerHTML = e.target.innerHTML === 'Show More' ? 'Show Less' : 'Show More'
    }

    deleteComment = async (e) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this comment?');
        if (!confirmDelete) {
            return
        }
        const commentData = {
            runId: this.props.runId,
            commentId: this.props.commentId
        }
        console.log(commentData);
        e.target.innerHTML = 'Deleting...';
        e.target.disabled = true;

        await fetch('/runs/deleteComment', {
            method: 'DELETE',
            body: JSON.stringify(commentData),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Username': `${localStorage.getItem('user')}`
            }
        })
            .then(res => {
                if (res.status === 201) {
                    window.location.reload(true);
                } else {
                    e.target.innerHTML = 'Delete';
                    e.target.disabled = false;
                    return alert('There was an error deleting your comment');
                }
            })
    }

    renderDelete = () => {
        return this.props.user === localStorage.getItem('user') ? <button className='commentDelete' onClick={this.deleteComment}>Delete</button> : ''
    }

    render() {
        return (
            <div className="comment">
                <Link to={`/user/${this.props.user}`} className="commentUser">{this.props.user}</Link><span className="commentTime">{this.state.time}</span>{this.renderDelete()}
                <p className="commentMessage max-height" data-height={this.props.time}>{this.props.message}</p>
                <button id="showMoreCommentButton" className="showMoreComment" onClick={this.toggleMoreComment}>Show More</button>
            </div>
        )
    }
}
