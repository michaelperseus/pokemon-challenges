import React, { Component } from 'react'
// import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Link } from 'react-router-dom';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: 'Login / Signup',
            navOpen: false
        }
    }

    componentDidMount = () => {
        this.returnName();
    }

    returnLoginStatus = () => {
        const user = localStorage.getItem('user');
        if (!user) {
        return <Link to={'/login'} onClick={this.toggleNav}>Login / Sign Up</Link>
        } else {
            return <Link to={`/my-profile`} onClick={this.toggleNav}>{user}</Link>
        }
    }

    toggleNav = () => {
        const nav = document.querySelector('.navbarSmall');
        nav.classList.toggle('navbarSmall-On');
        this.setState({navOpen: !this.state.navOpen});
    }

    returnName = () => {
        const user = localStorage.getItem('user');
        if (!user) {
            return this.setState({user: 'Login / Sign Up'})
        } else {
            return this.setState({user: user});
        }
    }

    render() {
        window.addEventListener('click', (e) => {
            if(this.state.navOpen) {
                if (document.getElementById('smallNav').contains(e.target)) {
                    return
                } else {
                    this.toggleNav()
                }
            } else {
                return
            }
        })
        return (
            <div>
                <nav className="webNav">
                    <nav className='navbarBig'>
                        <Link to={'/'}>
                            <h1>P.C.</h1>
                        </Link>
                        <ul>
                            <li><Link to={'/game-list'}>Games</Link></li>
                            <li className="navLine"> | </li>
                            <li><Link to={'/community'}>Community</Link></li>
                            <li className="navLine"> | </li>
                            <li><Link to={'/news'}>News</Link></li>
                            <li className="navLine"> | </li>
                            <li>{this.returnLoginStatus()}</li>
                        </ul>
                    </nav>
                </nav>
                <nav className="mobileNav" id="smallNav">
                    <div className="navbarButton" onClick={this.toggleNav}>
                        <div className="innerButton"></div>
                    </div>
                    <div className="navbarSmall">
                        <ul>
                            <li><Link to={'/'} onClick={this.toggleNav}>Home</Link></li>
                            <li><Link to={'/game-list'} onClick={this.toggleNav}>Games</Link></li>
                            <li><Link to={'/community'} onClick={this.toggleNav}>Community</Link></li>
                            <li><Link to={'/news'} onClick={this.toggleNav}>News</Link></li>
                            <li>{this.returnLoginStatus()}</li>
                        </ul>
                        <span onClick={this.toggleNav}>X</span>
                    </div>
                </nav>
            </div>
        )
    }
}


export default Navbar;



