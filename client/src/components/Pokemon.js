import React, { Component } from 'react'

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
        if (!this.props.name) {
            return
        }
        await fetch(`https://pokeapi.co/api/v2/pokemon/${this.props.name}`)
        .then(res => res.json())
        .then(data => {
            this.setState({pokemon: data, sprite: data.sprites.front_default})
        })
    }


    render() {
        return (
            <tr>
                <td>{this.state.pokemon.name}</td>
                <td><img src={this.state.sprite} alt={this.state.pokemon.name}></img></td>
            </tr>
        )
    }
}
