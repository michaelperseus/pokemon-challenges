import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export default function withAuth(ComponentToProtect) {
    return class extends Component {
        constructor() {
            super();
            this.state = {
                loading: true,
                redirect: false,
            }
        };

        componentDidMount() {

            if (!localStorage.getItem('token')) {
                return this.setState({ loading: false, redirect: true });
            }

            const token = localStorage.getItem('token');
            fetch('/users/adminCheck', {
                method: 'GET',
                withCredentials: true,
                credentials: 'include',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Username': `${localStorage.getItem('user')}`
                }
            })
                .then(res => {
                    if (res.status === 200) {
                        this.setState({ loading: false });
                    } else {
                        const error = new Error(res.error);
                        throw error;
                    }
                })
                .catch(err => {
                    console.error(err);
                    this.setState({ loading: false, redirect: true });
                });
        }

        render() {
            const { loading, redirect } = this.state;
            if (loading) {
                return null;
            }
            if (redirect) {
                return <Redirect to="/" />
            }
            return <ComponentToProtect {...this.props} />;
        }
    }
}
