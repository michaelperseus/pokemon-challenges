import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Intro from './components/intro'
import Home from './components/home'

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <ul>
          <li><Link to={'/'}>Home</Link></li>
            <li><Link to={'/game/hg'}>Heart Gold</Link></li>
            <li><Link to={'/game/blk'}>Black</Link></li>
          </ul>
          <p>
          Welcome to React
          </p>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/game/:id" component={Intro} />
          </Switch>
        </header>
      </div>
    </Router>
    
  );
}

export default App;