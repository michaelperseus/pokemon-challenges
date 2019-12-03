import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Game from './components/Game';
import GameList from './components/GameList';
import Home from './components/Home';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main className="mainBody">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/game-list" component={GameList} />
            <Route path="/game/:id" component={Game} />
          </Switch>
        </main>
      </div>
    </Router>
    
  );
}

export default App;