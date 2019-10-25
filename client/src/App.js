import React from 'react';
import './App.css';

import Intro from './components/intro'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
         Welcome to React
        </p>
        <Intro />
      </header>
    </div>
  );
}

export default App;
