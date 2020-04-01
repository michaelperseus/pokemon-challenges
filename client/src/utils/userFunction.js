import React from 'react';
import { Link } from 'react-router-dom';
import Placeholder from '../img/Placeholder.png';



// Logs out user on THIS device only
export async function logoutUser() {
    const logoutData = {
        username: localStorage.getItem('user'),
        token: localStorage.getItem('token')
    }
    await fetch('/users/logout', {
        method: 'POST',
        body: JSON.stringify(logoutData),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Username': `${localStorage.getItem('user')}`
        }
    }).then(res => {
        if (res.status === 200) {
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            this.props.history.push('/');
            window.location.reload(true);
        } else {
            console.log('error logging out');
        }
    })
}


// Logs out user on ALL devices
export async function logoutAll() {
    const logoutData = {
        username: localStorage.getItem('user'),
        token: localStorage.getItem('token')
    }
    await fetch('/users/logoutAll', {
        method: 'POST',
        body: JSON.stringify(logoutData),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Username': `${localStorage.getItem('user')}`
        }
    }).then(res => {
        if (res.status === 200) {
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            this.props.history.push('/');
            window.location.reload(true);
        } else {
            console.log('error logging out');
        }
    })
}


// Confirms if password is correct for users profile
export async function confirmPassword() {
    const pass = prompt('Please enter your password');
    if (pass === '') {
        alert('Please enter your password');
        return false;
    }
    const user = localStorage.getItem('user');
    const correct = await fetch('/users/passConfirm', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: user,
            password: pass
        })
    })
        .then(res => {
            if (res.status !== 200) {
                return false
            }
            return true
        })
    return correct
}



// Fetches the users Badges
export async function fetchBadges(user) {
    await fetch(`/users/badges/${user}`)
        .then(res => res.json())
        .then(data => {
            const badgeBox = data.badges.map(badge => {
                return <span className={`badge ${badge}`}>{badge}</span>
            });
            this.setState({ badges: badgeBox })
        })
}

// Fetches the users Profile Picture
export async function fetchUserPic(user) {
    await fetch(`/users/avatar/${user}`)
        .then(res => res.json())
        .then(data => {
            this.setState({ userAvatar: data.avatar })
        })
}

// Fetches the users 'Featured Run'
export async function fetchUserFeatRun(user) {
    await fetch(`/users/featuredRun/${user}`)
        .then(res => {
            console.log(res);
            if (res.status === 200) {
                return res.json()
            }
            return
        })
        .then(data => {
            if (!data) {
                return this.setState({
                    featuredRun: {
                        img: <img src={Placeholder} alt='Placeholder' />,
                        variation: 'No Runs',
                        name: 'No Runs Entered',
                        id: '',
                        completed: ' Entered'
                    }
                })
            }
            this.setState({
                featuredRun: {
                    img: <Link to={`/run/${data._id}`}><img alt='Game Logo' src={data.logo} /></Link>,
                    variation: `${data.variation}: `,
                    name: data.game,
                    id: data._id,
                    completed: data.completed
                }
            })
        });
}