import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
            pokemonLi: [],
            runNotes: ''
        }
    }

    async componentDidMount() {
        const runData = await fetch(`/runs/view/${this.props.match.params.runId}`)
        .then(res => res.json());
        this.matchPropsToState(runData);
        this.makeList(this.state.pokemon);
    }

    matchPropsToState = (run) => {
        this.setState({
            variation: run.variation,
            user: run.user,
            game: run.game,
            pokemon: run.pokemon,
            id: run._id,
            completed: run.completed,
            runNotes: run.runNotes
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
        return <tr><td>{poke.pokemon}</td><td>{poke.status}</td><td>{poke.nickname}</td><td><Link to={`/edit-pokemon/${this.props.match.params.runId}/${poke._id}`}>Edit</Link></td></tr>
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

    handleSubmit = async (e) => {
        e.preventDefault();
        const regex = /^(?=.*[A-Z0-9])[\w.,!"'#^()-_@\/$ ]+$/i;
        const confirmNotes = this.state.runNotes.match(regex);
        if (!confirmNotes) {
            return alert('invalid notes!')
        }
        const data = {
            variation: this.state.variation,
            _id: this.state.id,
            completed: this.state.completed,
            runNotes: this.state.runNotes
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
                        <option name="variation" value="monotype">Monotype</option>
                        <option name="variation" value="eeveelocke">Eeveelocke</option>
                        <option name="variation" value="wonderlocke">Wonderlocke</option>
                    </select>
                    <label>Run Notes</label>
                    <textarea onChange={this.handleChange} value={this.state.runNotes} name='runNotes'></textarea>
                    <button>Save Run</button>
                </form>
                <button className="addPokemon"><Link to={`/add-pokemon/${this.props.match.params.runId}`}>Add Pokemon</Link></button>
                <div className="runPokemon">
                    <p>Current Pokemon</p>
                    <table>
                        <thead>
                            <td>Pokemon</td>
                            <td>Status</td>
                            <td>Nickname</td>
                            <td>edit</td>
                        </thead>
                        <tbody>
                            {this.state.pokemonLi}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default EditRun;