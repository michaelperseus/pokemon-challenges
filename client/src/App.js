import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Game from './components/Game'
import Home from './components/Home'

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Welcome to Pokemon Challenges</h1>
          <ul>
          <li><Link to={'/'}>Home</Link></li>
            <li><Link to={'/game/hg'}>Heart Gold</Link></li>
            <li><Link to={'/game/blk'}>Black</Link></li>
            <li><Link to={'/game/ss'}>Soul Silver</Link></li>
            <li><Link to={'/game/ylw'}>Yellow</Link></li>
          </ul>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/game/:id" component={Game} />
          </Switch>
        </header>
      </div>
    </Router>
    
  );
}

export default App;