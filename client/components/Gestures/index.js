import React, {Component} from 'react';
import './style.css';

class Gestures extends Component {
  constructor(props) {
    super(props);

    this.state = {
      buttons: Array(5).fill(0)
    }
  }

  makeActive(number) {
    let buttons = Array(5).fill(0);
    buttons[number] = 1;
    this.setState({buttons: buttons})
  }

  render() {
    const buttons = this.state.buttons;
    const chooseGesture = this.props.chooseGesture;

    return (
      <div className="gestures-container">
        <div className="gestures-title">Please choose a gesture and click play</div>
        <div className="game-items">
          <button
            className={buttons[0] ? "gesture-btn active": "gesture-btn"}
            onClick={() => {chooseGesture('rock');this.makeActive(0)}}>Rock</button>
          <button
            className={buttons[1] ? "gesture-btn active": "gesture-btn"}
            onClick={() => {chooseGesture('paper');this.makeActive(1)}}>Paper</button>
          <button
            className={buttons[2] ? "gesture-btn active": "gesture-btn"}
            onClick={() => {chooseGesture('scissors');this.makeActive(2)}}>Scissors</button>
          <button
            className={buttons[3] ? "gesture-btn active": "gesture-btn"}
            onClick={() => {chooseGesture('spock');this.makeActive(3)}}>Spock</button>
          <button
            className={buttons[4] ? "gesture-btn active": "gesture-btn"}
            onClick={() => {chooseGesture('lizard');this.makeActive(4)}}>Lizard</button>
        </div>
      </div>
    )
  }
}

export default Gestures;
