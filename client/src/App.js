import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Game from './components/Game';
import GameList from './components/GameList';
import Home from './components/Home';
import Navbar from './components/Navbar';
import AddRun from './components/AddRun';
import NotFound from './components/NotFound';
import Community from './components/Community';
import Login from './components/Login';
import withAuth from './components/withAuth';
import MyProfile from './components/MyProfile';

import ProtectTest from './components/ProtectTest';

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
            <Route path="/add-run/:id" component={withAuth(AddRun)} />
            <Route path='/community' component={Community} />
            <Route path="/protectTest" component={withAuth(ProtectTest)} />
            <Route path="/login" component={Login} />
            <Route path='/my-profile' component={withAuth(MyProfile)} />
            <Route component={NotFound} />
          </Switch>
        </main>
      </div>
    </Router>
    
  );
}

export default App;