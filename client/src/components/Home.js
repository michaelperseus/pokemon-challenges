import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Marked from 'react-markdown';

import HomeBanner from '../img/Logos2.png';
import Highlights from '../img/Highlights.png';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            top: {
                name: '',
                logo: ''
            },
            completed: {
                name: '',
                logo: ''
            },
            highest: {
                name: '',
                logo: ''
            },
            failed: {
                name: '',
                logo: ''
            },
            news: {
                title: '',
                date: '',
                body: ''
            }
        }
    }

    componentDidMount = async () => {
        await this.fetchTopGame();
        await this.fetchLatestNews();
        await this.fetchFinishedGame('completed');
        await this.fetchFinishedGame('failed');
        await this.fetchHighestRated();
    }

    fetchLatestNews = async () => {
        await fetch('/news/latestPost')
            .then(res => res.json())
            .then(data => {
                this.setState({
                    news: {
                        title: data[0].title,
                        date: data[0].date,
                        body: data[0].body

                    }
                })
            })
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

    fetchHighestRated = async () => {
        const game = await fetch('/games/highestRated')
            .then(res => res.json());
        this.setState({
            highest: {
                logo: <img src={game[0].logo} alt="game logo"></img>,
                name: game[0].gameCode
            }
        })
    }

    fetchFinishedGame = async (type) => {
        const game = await fetch(`/games/mostFinished/${type}`)
            .then(res => res.json());
        this.setState({
            [type]: {
                logo: <img src={game[0].logo} alt="game logo"></img>,
                name: game[0].gameCode
            }
        })
    }


    render() {
        return (
            <div id="home">
                <div className="announcement">
                    <h3>Hello Beta Testers!</h3>
                    <p>There is an official Trello Board for this project! You can go here to see all known issues/bugs as well as upcoming features for the Beta build! Thank you!</p>
                    <button><a href="https://trello.com/b/Tp15Sn0e/pokemon-challenges">Visit the Trello Board!</a></button>
                </div>
                <div id="homeSplash">
                    <img src={HomeBanner} alt="Home Screen Banner"></img>
                    <p>Pokémon Challenges is a hub for players who love to give their playthroughs a little extra spice and fun!</p>
                    <p>Here, you can log in and track all the different playthroughs you've done, if you won or failed and what Pokémon you used along the way!</p>
                    <p>There is also a community feature to see what others players have done, what the most common games are and more!</p>
                    <p>So what are you waiting for? Let's take a look at the games list!</p>
                    <button><Link to={'/game-list'}>View All Games!</Link></button>
                    <div id="homeBlog">
                        <h1>{this.state.news.title}</h1>
                        <h3>{this.state.news.date}</h3>
                        <div>
                            <Marked source={this.state.news.body} escapeHtml={false} />
                        </div>
                    </div>
                </div>
                <div id="gameHighlightContainer">
                    <img className="highlights" src={Highlights} alt="Highlight Banner"></img>
                    <div className="gameHighlight">
                        <h1>Most Played Game!</h1>
                        <Link to={`/game/${this.state.top.name}`}>{this.state.top.logo}</Link>
                    </div>
                    <div className="gameHighlight">
                        <h1>Most Completed Game!</h1>
                        <Link to={`/game/${this.state.completed.name}`}>{this.state.completed.logo}</Link>
                    </div>
                    <div className="gameHighlight">
                        <h1>Most Failed Game!</h1>
                        <Link to={`/game/${this.state.failed.name}`}>{this.state.failed.logo}</Link>
                    </div>
                    <div className="gameHighlight">
                        <h1>Highest Rated Game!</h1>
                        <Link to={`/game/${this.state.highest.name}`}>{this.state.highest.logo}</Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;