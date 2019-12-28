import React, { Component } from 'react'

export default class User extends Component {

    constructor(props){
        super(props);
        this.state = {
            user: [],
            validUser: true
        }
    }

    async componentDidMount() {
        await fetch(`/users/info/${this.props.match.params.username}`)
            .then(async res => {
                if (res.status === 200) {
                    this.fetchRuns()
                } else {
                    this.setState({validUser: false})
                }
            })
    }

    fetchRuns = async () => {
        await fetch(`/runs/${this.props.match.params.username}`)
            .then(res => res.json())
            .then(data => {
                this.setState({user: data})
            })
    }

    render() {
        if (this.state.validUser === false) {
            return (
                <div>
                    <h1>User not found</h1>
                </div>
            )
        } else {
            return (
                <div>
                    <h1>{this.props.match.params.username}</h1>
                    <h3>Has completed {this.state.user.length} runs!</h3>
                </div>
            )
        }
        
    }
}
