import React, {Component} from 'react';
import './style.css';
import winImg from '../../assets/images/you-win.png';
import loseImg from '../../assets/images/you-lose.png';

class Result extends Component {

  render() {

    return (
      <div className="result-container">
        <img src={winImg} />
        <img src={loseImg} />
        <div className="result-table-information">
          <span>Game result: {this.props.result}</span>
          <span>Your gesture: {this.props.ownGesture}</span>
          <span>Opponent gesture: {this.props.opponentGesture}</span>
        </div>

      </div>
    )
  }
}

export default Result;
