import React, { Component } from 'react'

import RunTable from './RunTable';

export default class User extends Component {

    constructor(props){
        super(props);
        this.state = {
            user: [],
            validUser: true,
            runTable: <tr><td>loading...</td></tr>
        }
    }

    async componentDidMount() {
        await fetch(`/users/info/${this.props.match.params.username}`)
            .then(async res => {
                if (res.status === 200) {
                    await this.fetchRuns();
                    await this.createTable();
                } else {
                    this.setState({validUser: false})
                }
            })
    }

    fetchRuns = async () => {
        await fetch(`/runs/${this.props.match.params.username}`)
            .then(res => res.json())
            .then(data => {
                this.setState({user: data})
            })
    }

    createTable = async () => {
        const runTables = this.state.user.map(run => {
            return <RunTable run={run} owned={false} key={run._id}></RunTable>
        })
        this.setState({runTable: runTables})
    }

    render() {
        if (this.state.validUser === false) {
            return (
                <div>
                    <h1>User not found</h1>
                </div>
            )
        } else {
            return (
                <div id="userPage">
                    <h1>{this.props.match.params.username}</h1>
                    <h3>has submitted {this.state.user.length} runs!</h3>
                    <table className="myRuns">
                        <thead>
                            <tr>
                                <td>Game</td>
                                <td>Status</td>
                                <td>Pokemon</td>
                                <td>User</td>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.runTable}
                        </tbody>
                    </table>
                </div>
            )
        }
        
    }
}
