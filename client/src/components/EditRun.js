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
            pokemonList: ''
        }
    }

    componentDidMount() {
        console.log(this.props.location.state);
        this.matchPropsToState(this.props.location.state.run);
    }

    matchPropsToState = (run) => {
        this.setState({
            variation: run.variation,
            user: run.user,
            game: run.game,
            pokemon: run.pokeon,
            id: run._id,
            completed: run.completed
        })
    }

    handleChange = (e) => {
        console.log(e.target.type);
        if(e.target.type === "radio" || e.target.type === "select-one") {
            this.setState({
                completed: e.target.value
            })
        }
        else if (e.target.type === "text" || e.target.type === 'textarea') {
            this.setState({
                [e.target.name]: e.target.value
            })
        }
    }

    handlePokemon = () => {
        const pokemon = this.state.pokemonList.split(" ");
        this.setState({
            pokemon
        })
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            variation: this.state.variation,
            pokemon: this.state.pokemon,
            _id: this.state.id,
            completed: this.state.completed
        }
        fetch('/runs/updateRun', {
            method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
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
                <form onSubmit={this.handleSubmit}>
                    <label>Game: </label>
                    <input type="text" value={this.state.game}   disabled></input><br></br>
                    <label>Status:</label>
                    <select onChange={this.handleChange} value={this.state.completed}>
                        <option name="completed" value="completed">Completed</option>
                        <option name="completed" value="in progress">In-Progress</option>
                        <option name="completed" value="failed">Failed</option>
                    </select><br></br>
                    <label>Name: </label>
                    <input type="text" onChange={this.handleChange} value={this.state.user} name="name" disabled></input><br></br>
                    <textarea onChange={this.handleChange} name="pokemonList"></textarea><br></br>
                    <p onClick={this.handlePokemon}>Update Pokemon</p>
                    <button>Submit Run</button>
                </form>
            </div>
        )
    }
}

export default EditRun;