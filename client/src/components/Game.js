import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import TableGenerator from '../utils/TableGenerator';

import { sortRunsByType, sortRunsByStatus, returnRatingClass, returnUserRating } from '../utils/common';

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            test: 'false',
            game: '',
            search: '',
            avg: 0,
            runs: [],
            userRating: 0,
            runTable: <tr><td>loading...</td></tr>,
            typeTable: <tr><td>loading...</td></tr>,
            statusTable: <tr><td>loading...</td></tr>
        }
        this.sortRunsByType = sortRunsByType.bind(this);
        this.sortRunsByStatus = sortRunsByStatus.bind(this);
        this.returnRatingClass = returnRatingClass.bind(this);
    }

    async componentDidMount() {
        await fetch(`/games/${this.props.match.params.id}`)
            .then(res => res.json())
            .then((json) => {
                this.setState({
                    game: json.name,
                    search: json.gameCode,
                    logo: json.logo,
                    avg: json.average
                })
            });
        const runs = await this.fetchRuns();
        this.setState({
            runs: runs
        })
        this.createTable();
        this.sortRunsByType();
        this.sortRunsByStatus();
        this.initialRating();
    }

    async componentDidUpdate() {
        if (this.state.search === this.props.match.params.id) {
            return
        }
        const gameInfo = await this.fetchGame();
        if (this.state.search !== gameInfo.gameCode) {
            this.setState({
                game: gameInfo.name,
                search: gameInfo.gameCode,
                logo: gameInfo.logo
            })
        }
    }

    fetchRuns = async () => {
        return await fetch(`/runs/${this.props.match.params.id}/all`)
            .then(res => res.json());
    }

    initialRating = async () => {
        const userRating = await returnUserRating(this.state.search, localStorage.getItem('user'));
        if (userRating.check) {
            this.setState({ userRating: userRating.value })
        }
        const ratings = document.querySelectorAll('[data-rating]');
        ratings.forEach(rat => {
            rat.classList.remove('active');
            if (rat.dataset.rating == this.state.userRating) {
                rat.classList.add('active')
            }
        })
    }

    updateRating = async (e) => {
        await this.setState({ userRating: e.target.dataset.rating })
        const ratings = document.querySelectorAll('[data-rating]');
        ratings.forEach(rat => {
            rat.classList.remove('active');
            if (rat.dataset.rating == this.state.userRating) {
                rat.classList.add('active')
            }
        })
    }

    saveRating = async () => {
        const saveButton = document.getElementById('submitRating');
        saveButton.disabled = true;
        saveButton.innerHTML = 'Updating...';

        const data = {
            newRating: {
                user: localStorage.getItem('user'),
                rating: this.state.userRating
            }
        }

        fetch(`/games/newRating/${this.state.search}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(data)
        })
            .then(res => {
                if (res.status === 200) {
                    return window.location.reload(true);
                } else {
                    saveButton.disabled = false;
                    saveButton.innerHTML = 'Save Rating';
                    return alert('An error has occured');
                }
            })

    }

    createTable = async () => {
        const runTables = this.state.runs.map(run => {
            return <TableGenerator type='game' run={run} key={run._id} />
        })
        this.setState({
            runTable: runTables
        })
    }

    fetchGame = async () => {
        return await fetch(`/games/${this.props.match.params.id}`)
            .then(res => res.json())
    }

    render() {
        if (this.state.game === '') {
            return (
                <div>
                    <h1>Loading...</h1>
                </div>
            )
        } else {
            return (
                <div className="gamePage">
                    <img src={this.state.logo} alt={this.state.game}></img>
                    <h2 className={this.returnRatingClass(this.state.avg)}>Community Rating: {this.state.avg}</h2>
                    {localStorage.getItem('user') ?
                        <div id="ratingBox">
                            <h4>Rate this Game!</h4>
                            <ul>
                                <li data-rating={1} onClick={this.updateRating}>1</li>
                                <li data-rating={2} onClick={this.updateRating}>2</li>
                                <li data-rating={3} onClick={this.updateRating}>3</li>
                                <li data-rating={4} onClick={this.updateRating}>4</li>
                                <li data-rating={5} onClick={this.updateRating}>5</li>
                            </ul>
                            <button id="submitRating" onClick={this.saveRating}>Save Rating</button>
                        </div>
                        : ''}
                    {localStorage.getItem('user') ? <button className="addRun"><Link to={`/add-run/${this.state.search}`}>ADD A RUN!</Link></button> : ''}
                    <p>There have been {this.state.runs.length} runs(s) of this game!</p>
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
                                <td>Number</td>
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
                                <td>Type</td>
                                <td className="nonMobile">Status</td>
                                <td className="nonMobile">Pokemon</td>
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

export default Game