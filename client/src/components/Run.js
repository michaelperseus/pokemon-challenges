import React, { Component } from 'react'

export default class Run extends Component {
    constructor(props) {
        super(props);
        this.state = {
            runId: this.props.match.params.id,
            runPokemon: [],
            runGame: '',
            runUser: '',
            runStatus: '',
            runVariation: ''
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
    }


    render() {
        return (
            <div>
                <h1>{this.state.runGame}</h1>
                <p>Pokemon used: {this.state.runPokemon.length}</p>
            </div>
        )
    }
}
