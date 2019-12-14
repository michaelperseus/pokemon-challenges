import React, { Component } from 'react'

export default class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: localStorage.getItem('user'),
            runs: [],
            runTable: ''
        }
    }

    componentDidMount = async () => {
        await this.fetchUserData();
        await this.createTable();
    }

    fetchUserData = async () => {
        await fetch(`/runs/${this.state.user}`)
        .then(res => res.json())
        .then(data => this.setState({runs: data}))
    }

    logoutUser = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        this.props.history.push('/');
        window.location.reload(true);
    }

    deleteRun = (id) => {

        const deleteData = {
            id: id
        }
        
        fetch(`/runs/delete`, {
            method: 'DELETE',
            body: JSON.stringify(deleteData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            if (res.status === 200) {
                alert('Run Deleted');
                window.location.reload(true);
            } else {
                alert('Error deleting')
            }
        })
    }

    createTable = async () => {
        const runTable = await this.state.runs.map(run => {
        return <tr><td>{run.game}</td><td>{run.completed}</td><td><button onClick={() => this.deleteRun(run._id)}>Delete</button></td></tr>})
        this.setState({runTable: runTable});
    }

    render() {
        return (
            <div>
                <h1>Welcome, {this.state.user}</h1>
                <p>You have completed {this.state.runs.length} run(s)!</p>
                <table className="myRuns">
                    <tr>
                        <td>Game</td>
                        <td>Status</td>
                        <td>Edit</td>
                    </tr>{this.state.runTable}</table>
                <button onClick={this.logoutUser}>Logout</button>
            </div>
        )
    }
}
