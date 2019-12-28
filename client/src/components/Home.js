import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import HomeBanner from '../img/Logos2.png'

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            logo: ''
        }
    }

    componentDidMount = async () => {
        await this.fetchTopGame();
    }

    fetchTopGame = async () => {
        const game = await fetch('/games/mostPlayedGame')
                .then(res => res.json());
        this.setState({
            logo: <img src={game[0].logo} alt="game logo"></img>,
            name: game[0].gameCode
        })
    }


    render() {
        return (
            <div>
                <div className="homeBox">
                    <img src={HomeBanner} alt="Home Screen Banner"></img>
                    <p>Pokémon Challenges is a hub for players who love to give their playthroughs a little extra spice!</p>
                    <p>Here, you can log in and track all the different playthroughs you've done, if you won or failed and what Pokémon you used along the way!</p>
                    <p>There is also a community feature to see what others players have done, what the most common games are and more!</p>
                    <p>So what are you waiting for? Let's take a look at the games list!</p>
                    <Link to={'/game-list'}><button>View All Games!</button></Link>
                </div>
                <div className="gameHighlightContainer">
                    <div className="gameHighlight">
                        <h1>Most played Game!</h1>
                        <Link to={`/game/${this.state.name}`}>{this.state.logo}</Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;