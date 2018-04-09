import React, {Component} from 'react';
import './style.css';

class Link extends Component {
  constructor(props) {
    super(props);

    this.generateLink = this.generateLink.bind(this);
  }

  generateLink(roomId) {
    return `${window.location.origin}/?player=${roomId}`
  }

  render() {

    return (
      <div className="share-link">
        <span>Please share this link:</span>
        <a
          href={this.generateLink(this.props.roomId)}
          target="_black">{this.generateLink(this.props.roomId)}
        </a>
      </div>
    )
  }
}



export default Link;
