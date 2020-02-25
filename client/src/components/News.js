import React, { Component } from 'react';
import Marked from 'react-markdown';

export default class News extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            date: '',
            body: [],
            test: null,
            newsLoop: ''
        }
    }

    async componentDidMount() {
        await fetch('/news/post')
        .then(res => res.json())
        .then(data => {
            const newsLoop = data.map(news => {
                return <div key={news.date} className="blogPost"><h1>{news.title}</h1><h3>{news.date}</h3><div><Marked source={news.body} escapeHtml={false} /></div></div>
            })
            this.setState({
                newsLoop
            })
        })
    }

    render() {
        return (
            <div id="blogContainer">
                {this.state.newsLoop}
            </div>
        )
    }
}
