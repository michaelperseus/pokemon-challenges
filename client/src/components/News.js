import React, { Component } from 'react';
import Marked from 'react-markdown';

export default class News extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            date: '',
            body: [],
            test: null
        }
    }

    async componentDidMount() {
        await fetch('/news/post')
        .then(res => res.json())
        .then(data => {
            console.log(data);
            this.setState({
                title: data.title,
                date: data.date,
                test: data.body
            })
        })
    }

    render() {
        return (
            <div id="blogContainer">
                <div className="blogPost">
                    <h1>{this.state.title}</h1>
                    <h3>{this.state.date}</h3>
                    <div><Marked source={this.state.test} escapeHtml={false} /></div>
                </div>
            </div>
        )
    }
}
