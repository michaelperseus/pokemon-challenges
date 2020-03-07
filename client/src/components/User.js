import React, { Component } from 'react'

import TableGenerator from '../utils/TableGenerator';

export default class User extends Component {

    constructor(props){
        super(props);
        this.state = {
            userRuns: [],
            validUser: true,
            runTable: <tr><td>loading...</td></tr>,
            avatar: '',
            badges: 'Loading...'
        }
    }

    async componentDidMount() {
        await fetch(`/users/info/${this.props.match.params.username}`)
            .then(async res => {
                if (res.status === 200) {
                    await this.fetchAvatar();
                    await this.fetchBadges();
                    await this.fetchRuns();
                    await this.createTable();
                } else {
                    this.setState({validUser: false})
                }
            });
    }

    fetchBadges = async () => {
        await fetch(`/users/badges/${this.props.match.params.username}`)
        .then(res => res.json())
        .then(data => {
            const badgeBox = data.badges.map(badge => {
                return <span className={`badge ${badge}`}>{badge}</span>
            });
            this.setState({badges: badgeBox})
        })
    }

    fetchAvatar = async () => {
        await fetch(`/users/avatar/${this.props.match.params.username}`)
            .then(res => res.json())
            .then(data => {
                this.setState({avatar: data.avatar})
            })
    }

    fetchRuns = async () => {
        await fetch(`/runs/${this.props.match.params.username}`)
            .then(res => res.json())
            .then(data => {
                this.setState({userRuns: data})
            })
    }

    createTable = async () => {
        const runTables = this.state.userRuns.map(run => {
            return <TableGenerator type='user' run={run} key={run._id}/>
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
                    <img src={this.state.avatar} alt={this.props.match.params.username}></img>
                    <h1>{this.props.match.params.username}</h1>
                    <h3>has submitted {this.state.userRuns.length} runs!</h3>
                    <div id="userBadges">
                        <h2>Badges</h2>
                        <div id="badgeBox">
                            {this.state.badges}
                        </div>
                    </div>
                    <table className="myRuns">
                        <thead>
                            <tr>
                                <td>Game</td>
                                <td className="nonMobile">Status</td>
                                <td className="nonMobile">Pokemon</td>
                                <td>Type</td>
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
