import React, { Component } from 'react'

export default class ProtectTest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: 'Loading'
        }
    }

    componentDidMount() {
        fetch('/test/test')
        .then(res => res.text())
        .then(res => this.setState({message: res}))
    }

    render() {
        return (
            <div>
                <h1>{this.state.message}</h1>
            </div>
        )
    }
}
