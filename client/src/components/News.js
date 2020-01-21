import React, { Component } from 'react'

export default class News extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            date: '',
            body: []
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
                body: data.body
            })
        })
    }

    render() {
        return (
            <div id="blogContainer">
                <div className="blogPost">
                    <h1>{this.state.title}</h1>
                    <h3>{this.state.date}</h3>
                    <div>{this.state.body}</div>
                </div>
                <div className="blogPost">
                    <h1>Version 0.3.4.1 is live!</h1>
                    <h3>Jan 19, 2020</h3>
                    <p>The lastest update to the site adds updates to the comment section on each run! There are still some tweaks to be made but it's coming together well.</p>
                    <p>Moving forward, the next thing I want to work on is adding a rating system for games. This will be a challenge for me as I'm not 100% sure how to do it in a way that isn't full of bad code practices!</p>
                    <p>Thanks for using the site and please keep sending feedback as we move through the Alpha phase!</p>
                    <ul>
                        <li>this is</li>
                        <li>a test btw</li>
                    </ul>
                    <p>~Hardy</p>
                </div>
            </div>
        )
    }
}
