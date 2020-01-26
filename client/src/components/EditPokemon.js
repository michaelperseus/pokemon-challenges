import React, { Component } from 'react'

export default class EditPokemon extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>
                <h1>{this.props.match.params.runId}</h1>
                <h3>{this.props.match.params.pokemonId}</h3>
            </div>
        )
    }
}
