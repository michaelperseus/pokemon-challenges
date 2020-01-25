import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class GameList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: '',
            hackList: '',
            origList: '',
            filter: 'all',
            generation: 'all'
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
        const box = <div key={game.gameCode} className="gameBox" data-gen={game.generation}>
                        <Link to={`/game/${game.gameCode}`}><img src={game.logo} alt={game.name}></img></Link>
                    </div>
        return box;
    }

    filterList = (filter) => {
        const filterList = document.querySelectorAll('.filter');
        filterList.forEach(item => {
            item.classList.remove('active');
        })
        const active = document.querySelector(`.${filter}`);
        active.classList.add('active');
        this.setState({
            filter: filter
        })
    }

    filterGen = (gen) => {
        const filterList = document.querySelectorAll('.filterGen');
        filterList.forEach(item => {
            item.classList.remove('active');
        })
        const active = document.querySelector(`.${gen}`);
        console.log(active.dataset.test);
        active.classList.add('active');
        if (gen === 'allGen') {
            const goodGen = document.querySelectorAll(`[data-gen]`);
            goodGen.forEach(game => {
                game.classList.remove('boxBeGone')
            }) 
        } else {
            const games = document.querySelectorAll('[data-gen]');
            games.forEach(item => {
                item.classList.add('boxBeGone')
            })
            const goodGen = document.querySelectorAll(`[data-gen=${gen}]`);
            goodGen.forEach(game => {
                game.classList.remove('boxBeGone')
            })
        }
    }

    renderFilter() {
        if (this.state.filter === 'all') {
            return <div><h1 className="gameListTitle">Main Series Games!</h1> {this.state.origList}<h1 className="gameListTitle">Fan-Made Hacks</h1>{this.state.hackList}</div>;
        } else if (this.state.filter === 'main') {
            return <div><h1 className="gameListTitle">Main Series Games!</h1> {this.state.origList}</div>;
        } else {
            return <div><h1 className="gameListTitle">Fan-Made Hacks</h1>{this.state.hackList}</div>
        }

        
    }

    render() {
        return (
            <div>
                <div id="filterBox">
                    <p className="series">
                        <span className="filter all active" onClick={() => this.filterList('all')}>All</span>
                        <span> | </span>  
                         <span className="filter main" onClick={() => this.filterList('main')}>Main Series</span>
                         <span> | </span>    
                         <span className="filter hacks" onClick={() => this.filterList('hacks')}>Hacks</span>
                    </p>
                    <p className="generation">
                        <span className="filterGen allGen active" onClick={() => this.filterGen('allGen')} data-test="yes">All</span>
                        <span> | </span>  
                         <span className="filterGen one" onClick={() => this.filterGen('one')}>1</span>
                         <span> | </span>   
                         <span className="filterGen two" onClick={() => this.filterGen('two')}>2</span>
                         <span> | </span>  
                         <span className="filterGen three" onClick={() => this.filterGen('three')}>3</span>
                         <span> | </span>  
                         <span className="filterGen four" onClick={() => this.filterGen('four')}>4</span>
                         <span> | </span>   
                         <span className="filterGen five" onClick={() => this.filterGen('five')}>5</span>
                         <span> | </span>  
                         <span className="filterGen six" onClick={() => this.filterGen('six')}>6</span>
                         <span> | </span>  
                         <span className="filterGen seven" onClick={() => this.filterGen('seven')}>7</span>
                         <span> | </span>  
                         <span className="filterGen eight" onClick={() => this.filterGen('eight')}>8</span>
                    </p>
                </div>
                {this.renderFilter()}
            </div>
        )
    }
}


export default GameList;