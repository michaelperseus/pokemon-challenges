import React, { Component } from 'react'

export default class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: localStorage.getItem('user'),
            runs: []
        }
    }

    componentDidMount = () => {
        this.fetchUserData();
    }

    fetchUserData = async () => {
        await fetch(`/runs/${this.state.user}`)
        .then(res => res.json())
        .then(data => this.setState({runs: data}))
    }

    logoutUser = () => {
        localStorage.removeItem('user');
        this.props.history.push('/');
        window.location.reload(true);
    }

    render() {
        return (
            <div>
                <h1>Welcome, {this.state.user}</h1>
                <p>You have completed {this.state.runs.length} run(s)!</p>
                <button onClick={this.logoutUser}>Logout</button>
            </div>
        )
    }
}
