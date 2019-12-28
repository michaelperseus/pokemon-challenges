import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Pokemon from './Pokemon';

export default class Run extends Component {
    constructor(props) {
        super(props);
        this.state = {
            runId: this.props.match.params.id,
            runPokemon: [],
            runGame: '',
            runUser: '',
            runStatus: '',
            runVariation: '',
            pokemonList: ''
        }
    }

    async componentDidMount() {
        await fetch(`/runs/view/${this.state.runId}`).then(res => res.json()).then(data => {this.setState({
            runPokemon: data.pokemon,
            runGame: data.game,
            runUser: data.user,
            runStatus: data.completed,
            runVariation: data.variation
        })});
        this.listPokemon()
    }

     listPokemon = async () => {
        const list = this.state.runPokemon.map(poke => {
            console.log(poke)
        return <Pokemon key={poke.id} name={poke.pokemon} />
        })
        this.setState({pokemonList: list})
    }


    render() {
        return (
            <div>
                <Link to={'/game-list'}>Return to Game List</Link>
                <h1>{this.state.runGame}</h1>
                <p>Pokemon used: {this.state.runPokemon.length}</p>
                <div>
                    {this.state.pokemonList}
                </div>
            </div>
        )
    }
}
