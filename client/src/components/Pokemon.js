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
        if (!this.props.data) {
            return
        }
        await fetch(`https://pokeapi.co/api/v2/pokemon/${this.props.data.pokemon}`)
        .then(res => res.json())
        .then(data => {
            this.setState({pokemon: data, sprite: data.sprites.front_default})
        })
    }


    render() {
        return (
            <tr>
                <td>{this.state.pokemon.name}</td>
                <td>{this.props.data.status}</td>
                <td>{this.props.data.nickname}</td>
                <td><img src={this.state.sprite} alt={this.state.pokemon.name}></img></td>
            </tr>
        )
    }
}
