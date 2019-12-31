import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class GameList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: '',
            hackList: '',
            origList: ''
        }
    }

    async componentDidMount() {
        const gameList = await this.callGames();
        const hackList = await gameList.filter(game => {
            return game.hack === true
        })
        const origList = await gameList.filter(game => {
            return game.hack === false
        })
        const hackListBuild = await hackList.map(game =>{
            return this.makeGameBox(game);
        })
        const origListBuild = await origList.map(game =>{
            return this.makeGameBox(game);
        })
        this.setState({
            hackList: hackListBuild,
            origList: origListBuild
        })
    }

    callGames = async () => {
        return fetch('/games/all')
        .then(res => res.json())
        .then(games => games);
    }

    makeGameBox = (game) => {
        const box = <div key={game.gameCode} className="gameBox">
                        <Link to={`/game/${game.gameCode}`}><img src={game.logo} alt={game.name}></img></Link>
                    </div>
        return box;
    }

    render() {
        return (
            <div>
                <h1 className="gameListTitle">Main Series Games!</h1>
                {this.state.origList}
                <h1 className="gameListTitle">Fan-Made Hacks</h1>
                {this.state.hackList}
            </div>
        )
    }
}


export default GameList;