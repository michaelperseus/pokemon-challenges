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
        this.setState({time: time[0]});
        if (document.querySelector(`[data-height='${this.props.time}'`).offsetHeight < 150) {
            document.querySelector(`[data-height='${this.props.time}'`).nextSibling.classList.add('hideButton');
        }
    }

    toggleMoreComment = (e) => {
        e.target.previousSibling.classList.toggle('max-height');
        e.target.innerHTML = e.target.innerHTML === 'Show More' ? 'Show Less' : 'Show More'
    }

    render() {
        return (
            <div className="comment">
                <Link to={`/user/${this.props.user}`} className="commentUser">{this.props.user}</Link><span className="commentTime">{this.state.time}</span>
                <p className="commentMessage max-height" data-height={this.props.time}>{this.props.message}</p>
                <button id="showMoreCommentButton" className="showMoreComment" onClick={this.toggleMoreComment}>Show More</button>
            </div>
        )
    }
}
