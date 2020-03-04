import React, { Component } from 'react';

import Pokemon from './Pokemon';
import Comment from './Comment';

export default class Run extends Component {
    constructor(props) {
        super(props);
        this.state = {
            runId: this.props.match.params.id,
            runPokemon: [],
            runGame: '',
            runUser: '',
            runStatus: '',
            runVariation: '',
            runComments: [],
            pokemonList: <tr><td>loading...</td></tr>,
            commentText: '',
            comments: [],
            runNotes: '',
            runRandomized: ''
        }
        this.goBack = this.goBack.bind(this);
    }

    async componentDidMount() {
        await fetch(`/runs/view/${this.state.runId}`)
        .then(res => res.json())
        .then(data => {this.setState({
            runPokemon: data.pokemon,
            runGame: data.game,
            runUser: data.user,
            runStatus: data.completed,
            runVariation: data.variation,
            runComments: data.comments,
            runNotes: data.runNotes,
            runRandomized: data.randomized
        })});
        await fetch(`/games/gameName/${this.state.runGame}`)
        .then(res => res.json())
        .then(data => this.setState({runGame: data.game}));
        this.listPokemon();
        this.loadComment();
    }

    handleComment = async (e) => {
        e.preventDefault();

        const submitButton = document.getElementById('submitComment');
        submitButton.disabled = true;
        submitButton.innerHTML = 'Submitting...';

        const regex = /^(?=.*[A-Z0-9])[\w.,!"'#^()-_@\\/$ ]+$/i;
        const confirmComment = this.state.commentText.match(regex);
        if (!confirmComment) {
            submitButton.disabled = false;
            submitButton.innerHTML = 'Submit';
            return alert('invalid comment!')
        }

        const data = {
            runId: this.state.runId,
            username: localStorage.getItem('user'),
            message: this.state.commentText,
            posted: Date.now()
        }

        await fetch('/runs/newComment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data => window.location.reload(true))
    }

    listPokemon = async () => {
        const list = this.state.runPokemon.map(poke => {
        return <Pokemon key={poke.pokemon} data={poke} />
        })
        this.setState({pokemonList: list})
    }

    handleCommentText = (e) => {
        this.setState({
            commentText: e.target.value
        })
    }

    loadComment = () => {
        const comments = this.state.runComments.map(com => {
            return <Comment key={com.posted} user={com.user} time={com.posted} message={com.message} />
        })
        this.setState({comments: comments})
    }

    goBack() {
        this.props.history.goBack();
    }

    renderComment = () => {
        if (localStorage.getItem('user') !== null && localStorage.getItem('token') !== null) {
            return (
                <form id="newcomment" onSubmit={this.handleComment}>
                        <label>Leave a Comment!</label>
                        <textarea onChange={this.handleCommentText} value={this.state.commentText} placeholder="Write a comment"></textarea>
                        <button id="submitComment">Submit</button>
                    </form>
            )
        } else {
            return ('')
        }
    }


    render() {
        return (
            <div>
                <p className="goBack" onClick={this.goBack}>Go back</p>
                <table className="runTable">
                    <thead>
                        <tr>
                            <td colSpan='2'>Run Info</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>User</td>
                            <td>{this.state.runUser}</td>
                        </tr>
                        <tr>
                            <td>Game</td>
                            <td>{this.state.runGame}</td>
                        </tr>
                        <tr>
                            <td>Mode</td>
                            <td>{this.state.runVariation}</td>
                        </tr>
                        <tr>
                            <td>Randomized</td>
                            <td>{this.state.runRandomized}</td>
                        </tr>
                        <tr>
                            <td>Status</td>
                            <td>{this.state.runStatus}</td>
                        </tr>
                        <tr>
                            <td>Pokemon Caught</td>
                            <td>{this.state.runPokemon.length}</td>
                        </tr>
                    </tbody>
                </table>
                <table>
                    <thead>
                        <tr>
                            <td>Pokemon Used</td>
                            <td>Status</td>
                            <td className="nonMobile">Nickname</td>
                            <td className="nonMobile"></td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.pokemonList}
                    </tbody>
                </table>
                <div id="runNotes">
                    <h3>User Notes:</h3>
                    <p>{this.state.runNotes}</p>
                    <hr></hr>
                </div>
                <div id="commentContainer">
                    {this.renderComment()}
                    <h5>All Comments! ({this.state.runComments.length})</h5>
                    {this.state.comments}
                </div>
            </div>
        )
    }
}
