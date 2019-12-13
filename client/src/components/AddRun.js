import React, { Component } from 'react'

class AddRun extends Component {
    constructor(props) {
        super(props);
        this.state = {
            game: this.props.match.params.id,
            completed: '',
            name: localStorage.getItem('user')
        }
    }

    handleChange = (e) => {
        if(e.target.type === "radio") {
            this.setState({
                completed: e.target.value
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
            const newRunData = {
                user: this.state.name,
                completed: this.state.completed,
                game: this.state.game
            }
            const sendRun = await fetch('/runs/newRun', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                  },
                body: JSON.stringify(newRunData)
            });
            const returnRun = await sendRun.json();
        }
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>Game: </label>
                    <input type="text" value={this.props.match.params.id} disabled></input><br></br>
                    <label>Completed?</label><br></br>
                    <label>Completed</label><input type="radio" name="completed" value='completed' onChange={this.handleChange}></input>
                    <label>In Progress</label><input type="radio" name="completed" value='in progress' onChange={this.handleChange}></input>
                    <label>Failed</label><input type="radio" name="completed" value='failed' onChange={this.handleChange}></input><br></br>
                    <label>Name: </label>
                    <input type="text" onChange={this.handleChange} value={this.state.name} name="name" disabled></input><br></br>
                    <button>Submit</button>
                </form>
            </div>
        )
    }
}

export default AddRun;
