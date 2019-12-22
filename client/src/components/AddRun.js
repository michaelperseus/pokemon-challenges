import React, { Component } from 'react'

class AddRun extends Component {
    constructor(props) {
        super(props);
        this.state = {
            game: this.props.match.params.id,
            completed: 'completed',
            name: localStorage.getItem('user')
        }
    }

    handleChange = (e) => {
        console.log(e.target.type);
        if(e.target.type === "radio" || e.target.type === "select-one") {
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
            await fetch('/runs/newRun', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                  },
                body: JSON.stringify(newRunData)
            }).then(res => {
                if (res.status === 201) {
                    res.json().then(data => {
                        console.log(data);
                        this.props.history.push('/');
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
                <form onSubmit={this.handleSubmit}>
                    <label>Game: </label>
                    <input type="text" value={this.props.match.params.id} disabled></input><br></br>
                    <label>Status:</label>
                    <select onChange={this.handleChange} value={this.state.completed}>
                        <option name="completed" value="completed">Completed</option>
                        <option name="completed" value="in progress">In-Progress</option>
                        <option name="completed" value="failed">Failed</option>
                    </select><br></br>
                    <label>Name: </label>
                    <input type="text" onChange={this.handleChange} value={this.state.name} name="name" disabled></input><br></br>
                    <button>Submit Run</button>
                </form>
            </div>
        )
    }
}

export default AddRun;
