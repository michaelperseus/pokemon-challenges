import React, { Component } from 'react';

class Community extends Component {
    constructor(props) {
        super(props);
        this.state = {
            runs: []
        }
    }

    async componentDidMount() {
        const runs = await fetch('/runs/all')
        .then(res => res.json());
        this.setState({
            runs: runs
        })
    }

    render() {
        return (
            <div>
                <h1> Community Page!</h1>
                <p>A total of {this.state.runs.length} have been entered into the site!</p>
            </div>
        )
    }
}

export default Community;