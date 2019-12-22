import React, { Component } from 'react';

import RunTable from './RunTable';

class Community extends Component {
    constructor(props) {
        super(props);
        this.state = {
            runs: [],
            runTable: <tr><td>loading...</td></tr>
        }
    }

    async componentDidMount() {
        await this.fetchRunData();
        await this.createTable();
    }

    fetchRunData = async () => {
        const runs = await fetch('/runs/all')
        .then(res => res.json());
        this.setState({
            runs: runs
        })
    }

    createTable = async () => {
        const runTable = await this.state.runs.map(run => {
            return <RunTable run={run} owned={false} key={run._id}></RunTable>
        })
        this.setState({runTable})
    }

    render() {
        return (
            <div>
                <h1> Community Page!</h1>
                <p>A total of {this.state.runs.length} have been entered into the site!</p>
                <table className="myRuns">
                    <thead>
                        <tr>
                            <td>Game</td>
                            <td>Status</td>
                            <td>Pokemon</td>
                            <td>User</td>
                        </tr>
                    </thead>
                    <tbody>{this.state.runTable}</tbody>
                </table>
            </div>
        )
    }
}

export default Community;