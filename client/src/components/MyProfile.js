import React, { Component } from 'react';


import RunTable from './RunTable';

export default class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: localStorage.getItem('user'),
            runs: [],
            runTable: <tr><td>loading...</td></tr>,
            newAvatar: null,
            userAvatar: ''
        }
    }

    componentDidMount = async () => {
        await this.fetchUserPic();
        await this.fetchUserRuns();
        await this.createTable();
    }

    fetchUserPic = async () => {
        await fetch(`/users/avatar/${this.state.user}`)
            .then(res => res.json())
            .then(data => {
                this.setState({userAvatar: data.avatar})
            })
    }

    fetchUserRuns = async () => {
        await fetch(`/runs/${this.state.user}`)
        .then(res => res.json())
        .then(data => this.setState({runs: data}))
    }

    logoutUser = async () => {
        const logoutData = {
            username: localStorage.getItem('user'),
            token: localStorage.getItem('token')
        }
        await fetch('/users/logout', {
            method: 'POST',
            body: JSON.stringify(logoutData),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then(res => {
            if (res.status === 200) {
                localStorage.removeItem('user');
                localStorage.removeItem('token');
                this.props.history.push('/');
                window.location.reload(true);
            } else {
                console.log('error logging out');
            }
        })
    }

    logoutAll = async () => {
        const logoutData = {
            username: localStorage.getItem('user'),
            token: localStorage.getItem('token')
        }
        await fetch('/users/logoutAll', {
            method: 'POST',
            body: JSON.stringify(logoutData),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then(res => {
            if (res.status === 200) {
                localStorage.removeItem('user');
                localStorage.removeItem('token');
                this.props.history.push('/');
                window.location.reload(true);
            } else {
                console.log('error logging out');
            }
        })
    }

    createTable = async () => {
        const runTable = await this.state.runs.map(run => {
            return <RunTable run={run} owned={true} key={run._id}></RunTable>
        })
        this.setState({runTable: runTable});
    }

    handleImage = (e) => {
        this.setState({
            newAvatar: e.target.files[0]
        })
    }

    deleteProfile = async () => {
        const confirm = await this.confirmPassword();
        if (confirm) {
            const deleteData = {
                username: this.state.user
            }
    
            await fetch('/users/deleteProfile', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(deleteData)
            })
            .then(res => {
                if (res.status === 200) {
                    localStorage.removeItem('user');
                    localStorage.removeItem('token');
                    this.props.history.push('/');
                    window.location.reload(true);
                } else {
                    console.log('error deleting profile');
                }
            })
        } else {
            alert('Your password is incorrect');
            return
        }
    }

    testUpload = async (e) => {
        e.preventDefault();
        
        if (this.state.newAvatar === null) {
            return alert('Please select a file!');
        }

        if (this.state.newAvatar.size > 2000000) {
            return alert('File size is too large');
        }

        if (this.state.newAvatar.type !== 'image/png' && this.state.newAvatar.type !== 'image/jpeg') {
            return alert('Please select a png or jpeg file!');
        }

        const fd = new FormData();
        fd.append('name', this.state.user);
        fd.append('type', 'users');
        fd.append('image', this.state.newAvatar, 'avatar.png');
        await fetch('/users/newAvatar', {
            method: 'POST',
            headers: { 
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: fd
        })
        .then(res => res.json())
        .then(data => {
            window.location.reload(true);
        });
    }

    confirmPassword = async () => {
        const pass = prompt('Please enter your password');
        if (pass === '') {
            alert('Please enter your password');
            return false;
        }
        const user = localStorage.getItem('user');
        const correct = await fetch('/users/passConfirm', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: user,
                password: pass
            })
        })
        .then(res => {
            if (res.status !== 200) {
                return false
            }
            return true
        })
        return correct
    }

    render() {
        return (
            <div id="userPage">
                <h1>Welcome, {this.state.user}</h1>
                <img src={this.state.userAvatar} alt={this.state.user}></img>
                <h3>You have completed {this.state.runs.length} run(s)!</h3>
                <table className="myRuns">
                    <thead>
                        <tr>
                            <td>Game</td>
                            <td className="nonMobile">Status</td>
                            <td className="nonMobile">Pokemon</td>
                            <td>Edit</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.runTable}
                    </tbody>
                </table>
                <form onSubmit={this.testUpload} id="newAvatar">
                    <label>Upload New Avatar</label>
                    <input type="file" id="avatarUpload" name="upload" onChange={this.handleImage}></input>
                    <button>Upload</button>
                </form>
                <div id="logoutGroup">
                    <button onClick={this.logoutUser}>Logout</button>
                    <button onClick={this.logoutAll}>Logout Everywhere</button>
                </div>
                <button id="deleteProfile" onClick={this.deleteProfile}>Delete Profile</button>
            </div>
        )
    }
}
