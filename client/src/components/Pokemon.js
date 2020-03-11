import React, { Component } from 'react';
import { capitalizeString } from '../utils/common';

export default class Pokemon extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pokemon: [],
            sprite: ''
        }
    }

    componentDidMount() {
        this.fetchPokemon()
    }

    async fetchPokemon() {
        if (!this.props.data) {
            return
        }
        await fetch(`https://pokeapi.co/api/v2/pokemon/${this.props.data.pokemon}`)
        .then(res => res.json())
        .then(data => {
            this.setState({pokemon: capitalizeString(data.name), sprite: data.sprites.front_default})
        })
    }


    render() {
        return (
            <tr>
                <td>{this.state.pokemon}</td>
                <td>{capitalizeString(this.props.data.status)}</td>
                <td className="nonMobile">{this.props.data.nickname}</td>
                <td className="nonMobile"><img src={this.state.sprite} alt={this.state.pokemon.name}></img></td>
            </tr>
        )
    }
}
