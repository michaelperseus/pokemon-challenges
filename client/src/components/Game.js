import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            test: 'false',
            game: '',
            search: '',
            runs: []
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
        .then(res => res.json())
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
                    <h1>Pokemon {this.state.game}</h1>
                    <img src={this.state.logo} alt={this.state.game}></img>
                    <p>There have been {this.state.runs.length} runs(s) of this game!</p>
                    <p>Would you like to add one?</p>
                    <button><Link to={`/add-run/${this.state.search}`}>Go Here!</Link></button>
                </div>
            )
        }
        
    }
}

export default Game