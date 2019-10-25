import React, { Component } from 'react'

class intro extends Component {
    constructor(props) {
        super(props);
        this.state = {
            test: 'false',
            game: ''
        }
    }


    componentDidMount() {
        // console.log('heyo');
        // this.setState({
        //     test: 'true'
        // })
        fetch('/games/hgss')
        .then(res => res.json())
        .then((json) => {
            this.setState({
                game: json.name
            })
        });
    }

    render() {
        return (
            <div>
                <h1>Please enjoy {this.state.game}</h1>
            </div>
        )
    }
}

export default intro