import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Game from './components/Game';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AddRun from './components/AddRun';
import NotFound from './components/NotFound';
import Community from './components/Community';
import Login from './components/Login';
import runAuth from './components/runAuth';
import MyProfile from './components/MyProfile';
import EditRun from './components/EditRun';
import Run from './components/Run';
import User from './components/User';
import News from './components/News';
import EditPokemon from './components/EditPokemon';
import AddPokemon from './components/AddPokemon';
import GameList from './components/GameList';
import ForgotPassword from './components/ForgotPassword';
import Feedback from './components/Feedback';
import Reset from './components/Reset';
import Admin from './components/Admin';

import ScrollToTop from './components/ScrollToTop';
import CheckLogin from './components/CheckLogin';
import withAuth from './components/withAuth';
import withoutAuth from './components/withoutAuth';
import withAdminAuth from './components/withAdminAuth';

function App() {
  return (
    <Router>
      <ScrollToTop>
      <CheckLogin>
      <div className="App">
        <Navbar />
        <main className="mainBody">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/game-list" component={GameList} />
            <Route path="/game/:id" component={Game} />
            <Route path="/add-run/:id" component={withAuth(AddRun)} />
            <Route path='/community' component={Community} />
            <Route path="/login" component={Login} />
            <Route path='/my-profile' component={withAuth(MyProfile)} />
            <Route path='/edit-run/:runId' component={withAuth(runAuth(EditRun))} />
            <Route path='/run/:id' component={Run} />
            <Route path='/user/:username' component={User} />
            <Route path='/reset/:token' component={withoutAuth(Reset)} />
            <Route path='/news' component={News} />
            <Route path='/edit-pokemon/:runId/:pokemonId' component={withAuth(runAuth(EditPokemon))} />
            <Route path='/add-pokemon/:runId' component={withAuth(runAuth(AddPokemon))} />
            <Route path='/forgot-password' component={withoutAuth(ForgotPassword)} />
            <Route path='/feedback' component={withAuth(Feedback)} />
            <Route path='/admin' component={withAdminAuth(Admin)} />
            <Route component={NotFound} />
          </Switch>
        </main>
        <Footer />
      </div>
      </CheckLogin>
      </ScrollToTop>
    </Router>
    
  );
}

export default App;