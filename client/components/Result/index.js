import React, {Component} from 'react';
import './style.css';
import winImg from '../../assets/images/you-win.png';
import loseImg from '../../assets/images/you-lose.png';
import drawImg from '../../assets/images/draw.png';


class Result extends Component {

  render() {
    let resultImg;

    switch (this.props.result) {
      case 'You win':
        resultImg = winImg;
        break;
      case 'You lose':
        resultImg = loseImg;
        break;
      default:
        resultImg = drawImg;
    }

    return (
      <div className="result-container">
        <div className="result-table-information">
          <img className="result-img" src={resultImg} />
          <span>Game result: {this.props.result}</span>
          <span>Your gesture: {this.props.ownGesture}</span>
          <span>Opponent gesture: {this.props.opponentGesture}</span>
        </div>

      </div>
    )
  }
}

export default Result;
