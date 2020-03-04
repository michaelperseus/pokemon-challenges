import React, { Component } from 'react'

class AddRun extends Component {
    constructor(props) {
        super(props);
        this.state = {
            game: this.props.match.params.id,
            completed: 'completed',
            name: localStorage.getItem('user'),
            variation: 'nuzlocke',
            randomized: 'no'
        }
    }

    handleChange = (e) => {
        if(e.target.type === "radio" || e.target.type === "select-one") {
            this.setState({
                [e.target.name]: e.target.value
            })
        }
        else if (e.target.type === "text") {
            this.setState({
                [e.target.name]: e.target.value
            })
        }
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        if (this.state.name === '' || this.state.completed === '' || this.state.game === '') {
            alert('You need to complete all the field!');
        } else {
            const button = document.getElementById('submitRunButton');
            button.classList.add('submitting');
            button.innerHTML = 'Submitting...';
            const newRunData = {
                user: this.state.name,
                completed: this.state.completed,
                game: this.state.game,
                variation: this.state.variation,
                randomized: this.state.randomized
            }
            if (this.state.starter !== '') {
                newRunData.pokemon = this.state.starter
            }
            await fetch('/runs/newRun', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                  },
                body: JSON.stringify(newRunData)
            }).then(res => {
                if (res.status === 201) {
                    res.json().then(data => {
                        this.props.history.push('/my-profile');
                    })
                } else {
                    alert('an error has occured, please try again')
                }
            });
        }
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit} className="addRunForm">
                    <div className="formGroup">
                        <label>Name</label>
                        <input type="text" onChange={this.handleChange} value={this.state.name} name="name" disabled></input>
                    </div>
                    <div className="formGroup">
                        <label>Game</label>
                        <input type="text" value={this.props.match.params.id} disabled></input>
                    </div>
                    <div className="formGroup">
                        <label>Status</label>
                        <select onChange={this.handleChange} value={this.state.completed} name="completed">
                            <option name="completed" value="completed">Completed</option>
                            <option name="completed" value="in progress">In-Progress</option>
                            <option name="completed" value="failed">Failed</option>
                        </select>
                    </div>
                    <div className="formGroup">
                        <label>Variation</label>
                        <select onChange={this.handleChange} value={this.state.variation} name="variation">
                            <option name="variation" value="nuzlocke">Nuzlocke</option>
                            <option name="variation" value="egglocke">Egglocke</option>
                            <option name="variation" value="wedlocke">Wedlocke</option>
                            <option name="variation" value="solo-run">Solo Run</option>
                            <option name="monotype" value="monotype">Monotype</option>
                            <option name="variation" value="eeveelocke">Eeveelocke</option>
                            <option name="variation" value="wonderlocke">Wonderlocke</option>
                        </select>
                    </div>
                    <div className="formGroup">
                        <label>Randomized?</label>
                        <select onChange={this.handleChange} value={this.state.randomized} name="randomized">
                            <option name="randomized" value="yes">Yes</option>
                            <option name="randomized" value="no">No</option>
                        </select>
                    </div>
                    <div className="formGroup">
                        <button id="submitRunButton">Submit Run</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default AddRun;
