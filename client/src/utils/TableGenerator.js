import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { capitalizeString } from './common';

class TableGenerator extends Component {

    constructor(props) {
        super(props);
        this.state = {
            gameName: '',
            pokemon: []
        }
    }

    deleteRun = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this run?');
        if (!confirmDelete) {
            return
        }

        const deleteData = {
            id: id
        }
        await fetch(`/runs/delete`, {
            method: 'DELETE',
            body: JSON.stringify(deleteData),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => {
                if (res.status === 200) {
                    window.location.reload(true);
                } else {
                    alert('Error deleting')
                }
            })
    }

    async componentDidMount() {
        if (this.props.run.pokemon === undefined) {
            this.setState({ pokemon: [] })
        } else {
            this.setState({ pokemon: this.props.run.pokemon })
        }
        if (this.props.type === 'community' || this.props.type === 'user' || this.props.type === 'myRuns') {
            await fetch(`/games/gameName/${this.props.run.game}`)
                .then(res => res.json())
                .then(data => {
                    this.setState({ gameName: data.game })
                })
        }
    }

    render() {
        if (this.props.type === 'community') {
            return (
                <tr>
                    <td className='tableOverflow'><Link to={`/run/${this.props.run._id}`}>{this.state.gameName}</Link></td>
                    <td className="tableOverflow nonMobile">{capitalizeString(this.props.run.completed)}</td>
                    <td className="tableOverflow nonMobile">{this.state.pokemon.length}</td>
                    <td className='tableOverflow'><Link to={`/user/${this.props.run.user}`}>{this.props.run.user}</Link></td>
                </tr>
            )
        } else if (this.props.type === 'game') {
            return (
                <tr>
                    <td className='tableOverflow'><Link to={`/run/${this.props.run._id}`}>{this.props.run.variation}</Link></td>
                    <td className="tableOverflow nonMobile">{capitalizeString(this.props.run.completed)}</td>
                    <td className="tableOverflow nonMobile">{this.state.pokemon.length}</td>
                    <td className='tableOverflow'><Link to={`/user/${this.props.run.user}`}>{this.props.run.user}</Link></td>
                </tr>
            )
        } else if (this.props.type === 'user') {
            return (
                <tr>
                    <td className='tableOverflow'><Link to={`/run/${this.props.run._id}`}>{this.state.gameName}</Link></td>
                    <td className="tableOverflow nonMobile">{capitalizeString(this.props.run.completed)}</td>
                    <td className="tableOverflow nonMobile">{this.state.pokemon.length}</td>
                    <td className='tableOverflow'>{capitalizeString(this.props.run.variation)}</td>
                </tr>
            )
        } else if (this.props.type === 'myRuns') {
            return (
                <tr>
                    <td className='tableOverflow'><Link to={`/run/${this.props.run._id}`}>{this.state.gameName}</Link></td>
                    <td className="tableOverflow nonMobile">{capitalizeString(this.props.run.completed)}</td>
                    <td className="tableOverflow nonMobile">{this.state.pokemon.length}</td>
                    <td className="tableOverflow userEdit"><Link to={{ pathname: `/edit-run/${this.props.run._id}`, state: { run: this.props.run } }}><button>Edit</button></Link><button onClick={() => this.deleteRun(this.props.run._id)} className="userDeleteRun">Delete</button></td>
                </tr>
            )
        } else {
            return (
                <div>
                    <h1>goodbye</h1>
                </div>
            )
        }

    }
}


export default TableGenerator