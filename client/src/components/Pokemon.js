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
        let galarcheck = false;
        await fetch(`https://pokeapi.co/api/v2/pokemon/${this.props.data.pokemon}`)
            .then(res => {
                if (res.status === 200) {
                    return res.json();
                } else {
                    galarcheck = true;
                    return
                }
            }
            )
            .then(data => {
                if (galarcheck) {
                    return this.setState({ pokemon: capitalizeString(this.props.data.pokemon), sprite: 'https://cdn.bulbagarden.net/upload/6/60/Question_Mark.png' })
                }
                this.setState({ pokemon: capitalizeString(this.props.data.pokemon), sprite: data.sprites.front_default })
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
