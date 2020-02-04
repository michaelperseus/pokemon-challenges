import React, { Component } from 'react';

import RunTable from './RunTable';

import {sortRunsByType, sortRunsByStatus} from '../utils/common';

class Community extends Component {
    constructor(props) {
        super(props);
        this.state = {
            runs: [],
            runTable: <tr><td>loading...</td></tr>,
            typeTable: <tr><td>loading...</td></tr>,
            statusTable: <tr><td>loading...</td></tr>
        }
        this.sortRunsByType = sortRunsByType.bind(this);
        this.sortRunsByStatus = sortRunsByStatus.bind(this);
    }

    async componentDidMount() {
        await this.fetchRunData();
        await this.createTable();
        await this.sortRunsByType();
        await this.sortRunsByStatus();
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
            <div id="userPage">
                <h1> Community Page!</h1>
                <h3>{this.state.runs.length} have been submitted by users!</h3>
                <h3>Most Common Variations</h3>
                    <table className="myRuns">
                        <thead>
                            <tr>
                                <td>Type</td>
                                <td>Runs</td>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.typeTable}
                        </tbody>
                </table>
                <h3>Status of All Runs</h3>
                    <table className="myRuns">
                        <thead>
                            <tr>
                                <td>Status</td>
                                <td>Runs</td>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.statusTable}
                        </tbody>
                </table>
                <h3>All Runs</h3>
                <table className="myRuns">
                    <thead>
                        <tr>
                            <td>Game</td>
                            <td className="nonMobile">Status</td>
                            <td className="nonMobile">Pokemon</td>
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