import React, { Component } from 'react'

export default class EditPokemon extends Component {
    constructor(props) {
        super(props);
        this.state = {
            species: '',
            starter: false,
            starterValue: this.starter ? 'yes' : 'no',
            nickname: ''
        }
    }

    async componentDidMount() {
        await fetch(`/runs/runPokemon/${this.props.match.params.runId}/${this.props.match.params.pokemonId}`)
        .then(res => res.json())
        .then(data => {
            console.log(data.pokemon[0]);
            this.setState({
                species: data.pokemon[0].pokemon,
                starter: data.pokemon[0].starter,
                nickname: data.pokemon[0].nickname || 'none set',
                status: data.pokemon[0].status || 'fainted'
            })
        })
    }

    handleChange = (e) => {
        if (e.target.name === "starter") {
            const text = e.target.name;
            this.setState({
                [text]: e.target.value === "yes" ? true : false,
                starterValue: e.target.value === "yes" ? "yes" : "no"
            })
        } else if (e.target.type === "text" || e.target.type === "select-one") {
            const text = e.target.name;
            this.setState({
                [text]: e.target.value
            })
        } 
        
    }

    handleSubmit(e) {
        e.preventDefault();
        alert('updating....')
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit} className="editRunForm">
                    <label>Species</label>
                    <input type="text" value={this.state.species} name="species" onChange={this.handleChange} />
                    <label>Nickname</label>
                    <input type="text" value={this.state.nickname} name="nickname" onChange={this.handleChange} />
                    <label>Starter?</label>
                    <select onChange={this.handleChange} value={this.state.starterValue} name="starter">
                        <option name="starter" value="yes">Yes</option>
                        <option name="starter" value="no">No</option>
                    </select>
                    <label>Status</label>
                    <select onChange={this.handleChange} value={this.state.status} name="status">
                        <option name="status" value="alive">Alive</option>
                        <option name="status" value="fainted">Fainted</option>
                    </select>
                    <button>Save</button>
                </form>
            </div>
        )
    }
}
