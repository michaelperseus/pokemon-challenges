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
        this.setState({time: time[0]})
    }

    render() {
        return (
            <div className="comment">
    <Link to={`/user/${this.props.user}`} className="commentUser">{this.props.user}</Link><span className="commentTime">{this.state.time}</span>
                <p className="commentMessage">{this.props.message}</p>
            </div>
        )
    }
}
