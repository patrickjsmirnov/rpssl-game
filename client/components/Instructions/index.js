import React, {Component} from 'react';
import './style.css';
import schemaImg from '../../assets/images/rpssl-game-schema.jpg';

class Instructions extends Component {
  constructor(props) {
    super(props);

    this.closeInstructions = this.closeInstructions.bind(this);
  }

  closeInstructions() {
    this.props.closeInstructions();
  }

  render() {

    return (
      <div className="instructions-wrapper">
        <div className="instructions-modal-window">
          <div className="instructions-window-container">
            <div className="instructions-window-close-btn" onClick={this.closeInstructions}></div>
            <div className="instructions-window-content">
              <div>
                <p className="title">It is very simple</p>
                <p>Scissors cuts Paper</p>
                <p>Paper covers Rock</p>
                <p>Rock crushes Lizard</p>
                <p>Lizard poisons Spock</p>
                <p>Spock smashes Scissors</p>
                <p>Scissors decapitates Lizard</p>
                <p>Lizard eats Paper</p>
                <p>Paper disproves Spock</p>
                <p>Spock vaporizes Rock</p>
                <p>(and as it always has)</p>
                <p>Rock crushes Scissors</p>
              </div>

              <img className="instructions-img" src={schemaImg} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}



export default Instructions;
