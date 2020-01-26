import React, { Component } from 'react'

class EditRun extends Component {
    constructor(props) {
        super(props)
        this.state = {
            variation: '',
            user: '',
            game: '',
            pokemon: [],
            id: '',
            completed: '',
            newPokemon: '',
            newPokemonList: [],
            pokemonLi: [],
            newPokemonLi: []
        }
    }

    async componentDidMount() {
        const runData = await fetch(`/runs/view/${this.props.match.params.runId}`)
        .then(res => res.json());
        await this.matchPropsToState(runData);
        this.makeList(this.state.pokemon);
    }

    matchPropsToState = (run) => {
        this.setState({
            variation: run.variation,
            user: run.user,
            game: run.game,
            pokemon: run.pokemon,
            id: run._id,
            completed: run.completed
        })
    }

    deletePokemon = (poke) => {
        fetch(`/runs/${this.state.id}/pokemon/${poke._id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => {
            console.log(res);
            if (res.status === 200) {
                console.log('deleted');
                window.location.reload(true);
            } else {
                console.log("error deleting")
            }
        })
    }

    makeList = (pokemon) => {
        const list = pokemon.map(poke => {
        return <li key={poke.pokemon}>{poke.pokemon} <span className="delete" name={poke.pokemon} onClick={() => this.deletePokemon(poke)}>X</span></li>
        })
        this.setState({pokemonLi: this.state.pokemonLi.concat(list)})
    }


    handleChange = (e) => {
        console.log(e.target.type);
        if(e.target.type === "select-one") {
            this.setState({
                [e.target.name]: e.target.value
            })
        }
        else if (e.target.type === "text" || e.target.type === 'textarea') {
            this.setState({
                [e.target.name]: e.target.value
            })
        }
    }

    handlePokemon = async (e) => {
        e.preventDefault();
        await fetch(`https://pokeapi.co/api/v2/pokemon/${this.state.newPokemon}/`)
        .then(res => {
            if (res.status !== 200) {
                return alert('Please enter a valid pokemon')
            } else {
                const pokemon = this.state.newPokemon;
                this.setState({
                    newPokemonList: this.state.newPokemonList.concat(pokemon),
                    newPokemon: '',
                    newPokemonLi: this.state.newPokemonLi.concat(<li key={pokemon}>{pokemon}</li>)
                })
            }
        })
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            variation: this.state.variation,
            pokemon: this.state.newPokemonList,
            _id: this.state.id,
            completed: this.state.completed
        }
        fetch('/runs/updateRun', {
            method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                  },
                body: JSON.stringify(data)
        }).then(res => {
            if (res.status === 200) {
                this.props.history.push('/my-profile');
            }
            res.json();
        }).then(data => console.log(data))
    }


    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit} className="editRunForm">
                    <label>Name</label>
                    <input type="text" onChange={this.handleChange} value={this.state.user} name="name" disabled></input>
                    <label>Game</label>
                    <input type="text" value={this.state.game}   disabled></input>
                    <label>Status</label>
                    <select onChange={this.handleChange} value={this.state.completed} name="completed">
                        <option name="completed" value="completed">Completed</option>
                        <option name="completed" value="in progress">In-Progress</option>
                        <option name="completed" value="failed">Failed</option>
                    </select>
                    <label>Variation</label>
                    <select onChange={this.handleChange} value={this.state.variation} name="variation">
                        <option name="variation" value="nuzlocke">Nuzlocke</option>
                        <option name="variation" value="egglocke">Egglocke</option>
                        <option name="variation" value="wedlocke">Wedlocke</option>
                        <option name="variation" value="solo-run">Solo Run</option>
                        <option name="monotype" value="wedlocke">Monotype</option>
                        <option name="variation" value="eeveelocke">Eeveelocke</option>
                        <option name="variation" value="wonderlocke">Wonderlocke</option>
                    </select>
                    <label>Add Pokemon</label>
                    <input type="text" value={this.state.newPokemon} onChange={this.handleChange} name="newPokemon"></input>
                    <button onClick={this.handlePokemon} className="addPokemon">Add Pokemon</button>
                    <button>Save Run</button>
                </form>
                <div className="runPokemon">
                    <p>Current Pokemon</p>
                    <table>
                        <thead>
                            <tr>Pokemon</tr>
                        </thead>
                    </table>
                    <ul>
                        {this.state.pokemonLi}
                    </ul><br></br>
                    <p>Pokemon to add (Make sure to save!)</p>
                    <ul>
                        {this.state.newPokemonLi}
                    </ul>
                </div>
            </div>
        )
    }
}

export default EditRun;