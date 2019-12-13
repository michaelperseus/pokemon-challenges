import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import HomeBanner from '../img/Logos2.png'

class Home extends Component {

    removeLocal = () => {
        localStorage.removeItem('user');
        const test = localStorage.getItem('user');
        console.log(test);
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
                <div className="homeBox">
                    <img src={HomeBanner} alt="Home Screen Banner"></img>
                    <p>Pokémon Challenges is a hub for players who love to give their playthroughs a little extra spice!</p>
                    <p>Here, you can log in and track all the different playthroughs you've done, if you won or failed and what Pokémon you used along the way!</p>
                    <p>There is also a community feature to see what others players have done, what the most common games are and more!</p>
                    <p>So what are you waiting for? Let's take a look at the games list!</p>
                    <Link to={'/game-list'}><button>View All Games!</button></Link>
                </div>
                <button onClick={this.removeLocal}>Remove local</button>
            </div>
        )
    }
}

export default Home;