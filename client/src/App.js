import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Game from './components/Game';
import Home from './components/Home';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <header className="App-header">
          <h1>Welcome to Pokemon Challenges</h1>
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