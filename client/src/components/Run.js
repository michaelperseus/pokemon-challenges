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
            runVariation: data.variation,
        })});
        this.listPokemon()
    }

     listPokemon = async () => {
        const list = this.state.runPokemon.map(poke => {
        return <Pokemon key={poke.pokemon} name={poke.pokemon} />
        })
        this.setState({pokemonList: list})
    }


    render() {
        return (
            <div>
                <Link to={'/game-list'} className="return">Return to Previous Page</Link>
                <table>
                    <thead>
                        <tr>
                            <td colSpan='2'>Run Info</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>User</td>
                            <td>{this.state.runUser}</td>
                        </tr>
                        <tr>
                            <td>Game</td>
                            <td>{this.state.runGame}</td>
                        </tr>
                        <tr>
                            <td>Mode</td>
                            <td>{this.state.runVariation}</td>
                        </tr>
                        <tr>
                            <td>Status</td>
                            <td>{this.state.runStatus}</td>
                        </tr>
                        <tr>
                            <td>Pokemon Caught</td>
                            <td>{this.state.runPokemon.length}</td>
                        </tr>
                    </tbody>
                </table>
                <div>
                    {this.state.pokemonList}
                </div>
            </div>
        )
    }
}
