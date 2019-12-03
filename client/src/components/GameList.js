import React, { Component } from 'react'

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
        console.log(this.state.hackList);
    }

    callGames = async () => {
        return fetch('/games/all')
        .then(res => res.json())
        .then(games => games);
    }

    makeGameBox = (game) => {
        console.log(game);
        const box = <div className="gameBox">
                        <h1>{game.name}</h1>
                        <img src={game.logo} alt="Game Logo"></img>
                    </div>
        return box;
    }

    render() {
        return (
            <div>
                <h1>Main Series Games!</h1>
                {this.state.origList}
                <h1>Fan-Made Hacks</h1>
                {this.state.hackList}
            </div>
        )
    }
}


export default GameList;