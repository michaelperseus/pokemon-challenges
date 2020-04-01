import React, { Component } from 'react'

import TableGenerator from '../utils/TableGenerator';
import { fetchUserFeatRun, fetchUserPic, fetchBadges } from '../utils/userFunction';
import { capitalizeString } from '../utils/common';

import Loading from '../img/Loading.png';

export default class User extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userRuns: [],
            validUser: true,
            runTable: <tr><td>loading...</td></tr>,
            userAvatar: '',
            badges: 'Loading...',
            featuredRun: {
                img: <img src={Loading} alt='Placeholder' />,
                variation: 'Loading',
                name: 'Loading',
                id: '',
                completed: 'Loading'
            }
        }
        this.fetchUserFeatRun = fetchUserFeatRun.bind(this);
        this.fetchUserPic = fetchUserPic.bind(this);
        this.fetchBadges = fetchBadges.bind(this);
    }

    async componentDidMount() {
        await fetch(`/users/info/${this.props.match.params.username}`)
            .then(async res => {
                if (res.status === 200) {
                    await this.fetchUserPic(this.props.match.params.username);
                    await this.fetchBadges(this.props.match.params.username);
                    await this.fetchRuns();
                    await this.createTable();
                    await this.fetchUserFeatRun(this.props.match.params.username);
                } else {
                    this.setState({ validUser: false })
                }
            });
    }

    fetchRuns = async () => {
        await fetch(`/runs/${this.props.match.params.username}`)
            .then(res => res.json())
            .then(data => {
                this.setState({ userRuns: data })
            })
    }

    createTable = async () => {
        const runTables = this.state.userRuns.map(run => {
            return <TableGenerator type='user' run={run} key={run._id} />
        })
        this.setState({ runTable: runTables })
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
                    <img src={this.state.userAvatar} alt={this.props.match.params.username}></img>
                    <h1>{this.props.match.params.username}</h1>
                    <h3>has submitted {this.state.userRuns.length} runs!</h3>
                    <div id="userBadges">
                        <h2>Badges</h2>
                        <div id="badgeBox">
                            {this.state.badges}
                        </div>
                    </div>
                    <div id="featGame">
                        <h2>Featured Run!</h2>
                        {this.state.featuredRun.img}
                        <h3>{capitalizeString(this.state.featuredRun.variation)}<span>{capitalizeString(this.state.featuredRun.completed)}</span></h3>
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
