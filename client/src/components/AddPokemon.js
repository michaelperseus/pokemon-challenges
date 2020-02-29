import React, { Component } from 'react'

export default class EditPokemon extends Component {
    constructor(props) {
        super(props);
        this.state = {
            species: '',
            starter: false,
            starterValue: this.starter ? 'yes' : 'no',
            nickname: '',
            status: 'alive',
            disabledButton: false
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
        this.setState({disabledButton: true});
        const saveButton = document.getElementById('addingPokemon');
        saveButton.innerHTML = 'Adding...';
        saveButton.classList.add('disabledButton');
        const regex = /^(?=.*[A-Z0-9])[\w.,!"'#^()-_@\\/$ ]+$/i;
        const confirmNotes = this.state.nickname.match(regex);

        if (this.state.species === '') {
            saveButton.classList.remove('disabledButton');
            saveButton.innerHTML = "Save";
            this.setState({disabledButton: false});
            return alert('Please enter a Pokemon');
        }

        if (!confirmNotes) {
            saveButton.classList.remove('disabledButton');
            saveButton.innerHTML = "Save";
            this.setState({disabledButton: false});
            return alert('invalid nickname!')
        }
    
        const update = {
            pokemon: this.state.species.toLowerCase(),
            starter: this.state.starter,
            nickname: this.state.nickname === '' ? this.state.species : this.state.nickname,
            status: this.state.status,
        }

        const fetchurl = `https://pokeapi.co/api/v2/pokemon/${update.pokemon}/`
        //Checks to make sure it is a valid pokemon
        await fetch(fetchurl)
        .then(async res => {
            if (res.status !== 200) {
                // const data = await res.json();
                return alert('invalid pokemon')
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
                    <div className="formGroup">
                        <label>Species</label>
                        <input type="text" value={this.state.species} name="species" onChange={this.handleChange} />
                    </div>
                    <div className="formGroup">
                        <label>Nickname</label>
                        <input type="text" value={this.state.nickname} name="nickname" onChange={this.handleChange} />
                    </div>
                    <div className="formGroup">
                        <label>Starter?</label>
                        <select onChange={this.handleChange} value={this.state.starterValue} name="starter">
                            <option name="starter" value="yes">Yes</option>
                            <option name="starter" value="no">No</option>
                        </select>
                    </div>
                    <div className="formGroup">
                        <label>Status</label>
                        <select onChange={this.handleChange} value={this.state.status} name="status">
                            <option name="status" value="alive">Alive</option>
                            <option name="status" value="fainted">Fainted</option>
                        </select>
                    </div>
                    <div className="formGroup">
                        <button id="addingPokemon" disabled={this.state.disabledButton}>Save</button>
                    </div>
                </form>
            </div>
        )
    }
}
