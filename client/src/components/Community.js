import React, { Component } from 'react';

import TableGenerator from '../utils/TableGenerator';

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
            // return <RunTable run={run} owned={false} key={run._id}></RunTable>
            return <TableGenerator type='community' run={run} key={run._id}/>
        })
        this.setState({runTable})
    }

    render() {
        return (
            <div id="communityPage">
                <h1>P.C. Community!</h1>
                <h3 id="commRunCount">{this.state.runs.length} runs have been submitted!</h3>
                <section id="commStats">
                    <h3 className="tableTitle">Most Common Variations</h3>
                        <table className="myRuns commRuns">
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
                    <h3 className="tableTitle">Status of All Runs</h3>
                        <table className="myRuns commRuns">
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
                    <h3 className="tableTitle">All Runs</h3>
                    <table className="myRuns commRuns">
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
                </section>
            </div>
        )
    }
}

export default Community;