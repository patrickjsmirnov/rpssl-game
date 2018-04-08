import React, {Component} from 'react';
import './style.css';

class Gestures extends Component {

  render() {

    return (
      <div className="game-items">
        <button onClick={() => this.props.chooseGesture('Rock')}>Rock</button>
        <button onClick={() => this.props.chooseGesture('Paper')}>Paper</button>
        <button onClick={() => this.props.chooseGesture('Scissors')}>Scissors</button>
        <button onClick={() => this.props.chooseGesture('Spock')}>Spock</button>
        <button onClick={() => this.props.chooseGesture('Lizard')}>Lizard</button>
      </div>
    )
  }
}

export default Gestures;
