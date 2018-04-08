import React, {Component} from 'react';

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
      <div>
        <a href={this.generateLink(this.props.roomId)} target="_black">{this.generateLink(this.props.roomId)}</a>
      </div>
    )
  }
}



export default Link;
