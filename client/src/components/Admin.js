import React, { Component } from 'react'

export default class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: ''
        }
    }

    async componentDidMount() {
        await fetch('/feedback/all')
        .then(res => res.json())
        .then(data => {
            const posts = data.map(post => {
                return (
                <div key={post._id}>
                    <h1>{post.username}</h1>
                    <p>{post.comment}</p>
                </div>)
            })
            this.setState({posts})
        })
    }
    render() {
        return (
            <div>
                <h1>Hey, Admin</h1>
                {this.state.posts}
            </div>
        )
    }
}
