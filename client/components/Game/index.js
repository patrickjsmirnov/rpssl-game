import React, {Component} from 'react';
import Api from '../api';
import Link from '../Link';
import Gestures from '../Gestures'
import './style.css';

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      roomId: null,
      isLinkShow: false,
      isReadyPlay: false,
      selectedGesture: null,
      clientId: null
    };

    this.api = new Api();

    this.api.waitForPlay((error, isReadyPlay) => {
      this.setState({
        isReadyPlay: isReadyPlay
      })
    });

    this.api.getClientId((error, clientId) => {
      this.setState({
        clientId: clientId
      })
    });

    this.getParameterByName = this.getParameterByName.bind(this);
    this.chooseGesture = this.chooseGesture.bind(this);
  }

  componentDidMount() {
    const url = window.location.href;
    const player = this.getParameterByName('player', url);

    if (!player) {
      this.api.getRoomId((error, roomId) => {
        this.setState({
          roomId: roomId,
          isLinkShow: true
        })
      })
    }

    else {
      this.setState({
        roomId: player
      })
    }
  }

  getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

  chooseGesture(gesture) {
    this.setState({selectedGesture: gesture});
  }

  render() {
    const isLinkShow = this.state.isLinkShow;
    const isReadyPlay = this.state.isReadyPlay;
    console.log('gesture', this.state.selectedGesture);
    console.log('client id = ', this.state.clientId);

    if (!isLinkShow && this.state.roomId && !this.state.isReadyPlay) {
      this.api.joinRoom(this.state.roomId);
    }



    const link = isLinkShow ? <Link roomId={this.state.roomId}/>: '';
    const gestures = isReadyPlay ? <Gestures chooseGesture={this.chooseGesture}/> : '';

    return (
      <div className="game-container">
        {link}
        {gestures}
      </div>
    )
  }
}

export default Game;
