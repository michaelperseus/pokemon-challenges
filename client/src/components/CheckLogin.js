import { Component } from 'react';
import {withRouter} from 'react-router-dom';

class CheckLogin extends Component {
    async componentDidUpdate(prevProps) {
        const username = localStorage.getItem('user');
        if (username) {
            const token = localStorage.getItem('token');
            await fetch('/checkToken', {
                method: 'GET',
                withCredentials: true,
                credentials: 'include',
                headers: {
                   'Authorization': `Bearer ${token}`,
                   'Content-Type': 'application/json'
                }
            })
            .then(res => {
                if (res.status !== 200) {
                    localStorage.removeItem('user');
                    localStorage.removeItem('token');
                    window.location.reload(true);
                } 
            })
        }
    }

    render() {
        return this.props.children
    }
}

export default withRouter(CheckLogin);