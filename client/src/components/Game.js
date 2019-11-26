import React, { Component } from 'react';

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            test: 'false',
            game: '',
            search: ''
        }
    }
    componentDidMount() {
        fetch(`/games/${this.props.match.params.id}`)
        .then(res => res.json())
        .then((json) => {
            this.setState({
                game: json.name,
                search: json.gameCode,
                logo: json.logo
            })
        });
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
                <div>
                    <h1>Please enjoy Pokemon {this.state.game}</h1>
                    <img src={this.state.logo} alt={this.state.game}></img>
                </div>
            )
        }
        
    }
}

export default Game