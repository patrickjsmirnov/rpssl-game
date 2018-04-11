import React, {Component} from 'react';
import './style.css';

class Header extends Component {
  constructor(props) {
    super(props);

    this.openInstructions = this.openInstructions.bind(this);
  }

  openInstructions() {
    this.props.openInstructions();
  }

  render() {

    return (
      <header>
        <button onClick={this.openInstructions} className="instructions-btn">Instructions</button>
        <div>The online Rock-Paper-Scissors-Spock-Lizard game</div>
      </header>
    )
  }
}



export default Header;
