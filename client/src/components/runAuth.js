import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';

export default function runAuth(ComponentToProtect) {
    return class extends Component {
        constructor() {
            super();
            this.state = {
                loading: true,
                redirect: false
            }
        };

        async componentDidMount () {
            await fetch(`/runs/view/${this.props.match.params.id}`)
            .then(res => res.json())
            .then(data => {
                if (data.user !== localStorage.getItem('user')) {
                   const error = new Error(data);
                   throw error;
                } else {
                    this.setState({loading: false})
                }
            }).catch(err => {
                console.log(err);
                this.setState({loading: false, redirect: true})
            })
        }
        render() {
            const {loading, redirect} = this.state;
            if (loading) {
                return null
            }
            if (redirect) {
                return <Redirect to="/" />
            }
            return <ComponentToProtect {...this.props} />
        }
    }
}
