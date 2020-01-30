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

    // async componentDidMount() {

    // }

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

    handleSubmit = async (e) => {
        e.preventDefault();
        alert('Adding....');
        // if (this.state.species === '') {
        //     return alert('Please enter a Pokemon');
        // }
        const update = {
            pokemon: this.state.species,
            starter: this.state.starter,
            nickname: this.state.nickname === '' ? this.state.species : this.state.nickname,
            status: this.state.status,
        }
        //Checks to make sure it is a valid pokemon
        await fetch(`https://pokeapi.co/api/v2/pokemon/${update.pokemon}/`, {
            mode: 'no-cors'
        })
        .then(async res => {
            if (res.status !== 200) {
                // const data = await res.json();
                return alert(res.status, 'invalid pokemon')
            }
            await fetch(`/runs/addPokemon/${this.props.match.params.runId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                  },
                body: JSON.stringify(update)

            })
            .then(res => {
                if (res.status === 201) {
                    this.props.history.push(`/edit-run/${this.props.match.params.runId}`);
                } else {
                    alert('an error occured while updating')
                }
            })
        })
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
