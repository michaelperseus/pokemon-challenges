import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import HomeBanner from '../img/Logos2.png';
import PlaceHolder from '../img/Placeholder.png';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            top: {
                name: '',
                logo: ''
            },
            recent: {
                name: '',
                logo: ''
            }
        }
    }

    componentDidMount = async () => {
        await this.fetchTopGame();
        await this.fetchRecentGame();
    }

    fetchTopGame = async () => {
        const game = await fetch('/games/mostPlayedGame')
                .then(res => res.json());
        this.setState({
            top: {
                logo: <img src={game[0].logo} alt="game logo"></img>,
                name: game[0].gameCode
            }
        })
    }

    fetchRecentGame = async () => {
        const game = await fetch('/games/mostRecentGame')
                .then(res => res.json());
        this.setState({
            recent: {
                logo: <img src={game[0].logo} alt="game logo"></img>,
                name: game[0].gameCode
            }
        })
    }


    render() {
        return (
            <div>
                <div className="homeBox">
                    <img src={HomeBanner} alt="Home Screen Banner"></img>
                    <p>Pokémon Challenges is a hub for players who love to give their playthroughs a little extra spice and fun!</p>
                    <p>Here, you can log in and track all the different playthroughs you've done, if you won or failed and what Pokémon you used along the way!</p>
                    <p>There is also a community feature to see what others players have done, what the most common games are and more!</p>
                    <p>For a list of all known bugs and upcoming features, please visit this <a href="https://github.com/Hardytack/pokemon-challenges/blob/master/VersionDocumentation.md">Version Documentation</a> page!</p>
                    <p>So what are you waiting for? Let's take a look at the games list!</p>
                    <Link to={'/game-list'}><button>View All Games!</button></Link>
                </div>
                <div className="gameHighlightContainer">
                    <div className="gameHighlight">
                        <h1>Most Played Game!</h1>
                        <Link to={`/game/${this.state.top.name}`}>{this.state.top.logo}</Link>
                    </div>
                    <div className="gameHighlight">
                        <h1>Most Recent Game!</h1>
                        <Link to={`/game/${this.state.recent.name}`}>{this.state.recent.logo}</Link>
                    </div>
                    <div className="gameHighlight">
                        <h1>Highest Rated Game!</h1>
                        <Link to={`/`}><img src={PlaceHolder} alt="Placeholder"></img></Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;