import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import RunTable from './RunTable';

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            test: 'false',
            game: '',
            search: '',
            runs: [],
            runTable: <tr><td>loading...</td></tr>
        }
    }
    async componentDidMount() {
        fetch(`/games/${this.props.match.params.id}`)
        .then(res => res.json())
        .then((json) => {
            this.setState({
                game: json.name,
                search: json.gameCode,
                logo: json.logo
            })
        });
        const runs = await this.fetchRuns();
        this.setState({
            runs: runs
        })
        this.createTable();
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

    createTable = async () => {
        const runTables = this.state.runs.map(run => {
            return <RunTable run={run} owned={false} key={run._id}></RunTable>
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
                    {localStorage.getItem('user') ? <button className="addRun"><Link to={`/add-run/${this.state.search}`}>ADD A RUN!</Link></button> : ''}
                    <p>There have been {this.state.runs.length} runs(s) of this game!</p>
                    <h3>All Runs</h3>
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

export default Game