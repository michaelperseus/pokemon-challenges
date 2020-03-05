import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NewGameList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            test: 'heyo',
            filterType: 'all',
            filterGen: 'all',
            hacks: '',
            main: ''
        }
    }

    async componentDidMount() {
        const games = await fetch('/games/all').then(res => res.json());
        //filters out official games
        const mainGames = games.filter(game => game.hack === false);
        const mainGamesBoxes = mainGames.map(game => this.makeGameBox(game));

        //filters out hacks
        const hackGames = games.filter(game => game.hack === true);
        const hackGamesBoxes = hackGames.map(game => this.makeGameBox(game));

        this.setState({
            main: mainGamesBoxes,
            hacks: hackGamesBoxes
        })
    }



    makeGameBox = (game) => {
        const box = <div key={game.gameCode} className="game" data-gen={game.generation} data-type={game.hack ? "hack" : "main"}>
                        <Link to={`/game/${game.gameCode}`}><img src={game.logo} alt={game.name}></img></Link>
                    </div>
        return box;
    }

    filterGames = async (type, value) => {
        await this.setState({
            [type]: value
        })

        this.showTitles();
        this.changeFilterColor();

        const gameList = document.querySelectorAll('.game');

        //Filters for if 'Type' is 'all'
        if (this.state.filterType === "all") {
            if (this.state.filterGen === 'all') {
                return gameList.forEach(game => {
                    game.classList.remove('inactive')
                })
            } else {
                return gameList.forEach(game => {
                    if (game.dataset.gen === this.state.filterGen) {
                        game.classList.remove('inactive')
                    } else {
                        game.classList.add('inactive')
                    }
                })
            }
        }
        
        //Filters for if 'Type' is 'main'
        gameList.forEach(game => {
            if (this.state.filterGen === 'all') {
                if (game.dataset.type === this.state.filterType) {
                    game.classList.remove('inactive')
                } else {
                    game.classList.add('inactive');
                }
            } else {
                if (game.dataset.type === this.state.filterType && game.dataset.gen === this.state.filterGen) {
                    game.classList.remove('inactive')
                } else {
                    game.classList.add('inactive')
                }
            }
        })

    }

    //Shows or Hides the Titles for each section
    showTitles = () => {
        const titles = document.querySelectorAll('.gameListHeader');
        titles.forEach(title => {
            if (this.state.filterType === 'all' || title.dataset.header === this.state.filterType) {
                title.classList.remove('inactive')
            } else {
               title.classList.add('inactive')
            }
        })
    }

    //Changes the color of the filter buttons
    changeFilterColor = () => {
        const filterType = document.querySelectorAll('.filtertype');
        const filterGen = document.querySelectorAll('.filtergen');
        filterType.forEach(filter => {
            if (filter.classList.contains(this.state.filterType)) {
                filter.classList.add('active')
            } else {
                filter.classList.remove('active')
            }
        })
        filterGen.forEach(filter => {
            if (filter.classList.contains(this.state.filterGen)) {
                filter.classList.add('active')
            } else {
                filter.classList.remove('active')
            }
        })
    }

    render() {
        return (
            <div>
                <div id="filterBox">
                    <p id="filterType">
                        <span className="filtertype all active" onClick={() => this.filterGames("filterType", "all")}>All</span>
                        <span> | </span>
                        <span className="filtertype main" onClick={() => this.filterGames("filterType", "main")}>Main Series</span>
                        <span> | </span>
                        <span className="filtertype hack" onClick={() => this.filterGames("filterType", "hack")}>Hacks</span>
                    </p>
                    <p id="filterGen">
                        <span>Generation: </span>
                        <span className="filtergen all active" onClick={() => this.filterGames("filterGen", "all")}>All</span>
                        <span> | </span>
                        <span className="filtergen one" onClick={() => this.filterGames("filterGen", "one")}>1</span>
                        <span> | </span>
                        <span className="filtergen two" onClick={() => this.filterGames("filterGen", "two")}>2</span>
                        <span> | </span>
                        <span className="filtergen three" onClick={() => this.filterGames("filterGen", "three")}>3</span>
                        <span> | </span>
                        <span className="filtergen four" onClick={() => this.filterGames("filterGen", "four")}>4</span>
                        <span> | </span>
                        <span className="filtergen five" onClick={() => this.filterGames("filterGen", "five")}>5</span>
                        <span> | </span>
                        <span className="filtergen six" onClick={() => this.filterGames("filterGen", "six")}>6</span>
                        <span> | </span>
                        <span className="filtergen seven" onClick={() => this.filterGames("filterGen", "seven")}>7</span>
                        <span> | </span>
                        <span className="filtergen eight" onClick={() => this.filterGames("filterGen", "eight")}>8</span>
                    </p>
                </div>
                <div id="gameContainer">
                    <div id="mainSeries">
                        <h3 className="gameListHeader" data-header="main">Main Series</h3>
                        <div className="gameLinkContainer">
                            {this.state.main}
                        </div>
                    </div>
                    <div id="hacks">
                        <h3 className="gameListHeader" data-header="hack">Fan Made Hacks</h3>
                        <div className="gameLinkContainer">
                            {/* <div className="game" data-type="hack" data-gen="two">Vietnamese Crystal</div>
                            <div className="game" data-type="hack" data-gen="three">Perfect Emerald</div>
                            <div className="game" data-type="hack" data-gen="four">Renegade Platinum</div>
                            <div className="game" data-type="hack" data-gen="five">Blaze Black</div>
                            <div className="game" data-type="hack" data-gen="six">Neo Y</div> */}
                            {this.state.hacks}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewGameList;