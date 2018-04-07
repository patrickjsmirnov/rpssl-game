import React, { Component } from 'react';
import Header from './Header';
import Game from './Game';
import './base.css';

class App extends Component {

  render() {
    return (
      <div>
        <Header />
        <Game />
      </div>
    );
  }
}

export default App;
