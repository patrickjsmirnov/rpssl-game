import React, {Component} from 'react';
import Api from '../api';
import Link from '../Link';
import Gestures from '../Gestures';
import Result from '../Result';
import Header from '../Header';
import Instructions from '../Instructions';
import Preloader from '../Preloader';
import './style.css';

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      roomId: null,
      isLinkShow: false,
      isReadyPlay: false,
      selectedGesture: null,
      clientId: null,
      gestureOfOpponent: null,
      waitingForOpponentGesture: false,
      resultOfGame: null,
      isInstructionsOpen: false
    };

    this.api = new Api();

    this.api.waitingForPlay((error, isReadyPlay) => {
      this.setState({isReadyPlay: isReadyPlay})
    });

    this.api.getClientId((error, clientId) => {
      this.setState({clientId: clientId})
    });

    this.api.waitingForResultOfGame((error, resultOfGame) => {
      let temp = JSON.parse(resultOfGame);

      if ((this.state.isLinkShow || !this.state.isLinkShow && temp.ownerLink) && temp.clientId != this.state.clientId)
        this.setState({gestureOfOpponent: temp.gesture})
    });

    this.getParameterByName = this.getParameterByName.bind(this);
    this.chooseGesture = this.chooseGesture.bind(this);
    this.defineWinner = this.defineWinner.bind(this);
    this.openInstructions = this.openInstructions.bind(this);
    this.closeInstructions = this.closeInstructions.bind(this);
  }

  componentDidMount() {
    const url = window.location.href;
    const player = this.getParameterByName('player', url);

    if (!player) {
      const roomIdFromSessionStorage = sessionStorage.getItem('roomId');

      if (!roomIdFromSessionStorage) {
        this.api.getRoomId((error, roomId) => {
          this.setState({
            roomId: roomId,
            isLinkShow: true
          })
          sessionStorage.setItem('roomId', roomId);
          return;
        })
      }

      this.setState({
        roomId: roomIdFromSessionStorage,
        isLinkShow: true
      })

      this.api.firstPlayerJoinRoom(roomIdFromSessionStorage);
      return;
    }

    this.setState({roomId: player})
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

  play(clientId, roomId, gesture) {
    const clientGestureObj = {
      clientId: clientId,
      roomId: roomId,
      gesture: gesture,
      ownerLink: this.state.isLinkShow
    };
    let clientGestureJson = JSON.stringify(clientGestureObj);
    this.api.resultOfGame(clientGestureJson);
    this.setState({waitingForOpponentGesture: true})
  }

  defineWinner(ownGesture, opponentGesture) {
    this.setState({waitingForOpponentGesture: false})
    if (ownGesture === opponentGesture) {
      this.setState({resultOfGame: 'draw'})
      return;
    }

    const choices = {
      rock : {name: "Rock", defeats: ["scissors","lizard"]},
      paper: {name: "Paper", defeats: ["rock", "spock"]},
      scissors: {name: "Scissors", defeats: ["paper", "lizard"]},
      lizard: {name: "Lizard", defeats:["paper","spock"]},
      spock: {name: "Spock", defeats:["scissors","rock"]}
    };

    let victory = choices[ownGesture].defeats.indexOf(opponentGesture) > -1;
    if (victory) {
      this.setState({resultOfGame: 'You win'});
      return;
    }
    this.setState({resultOfGame: 'You lose'});
  }

  openInstructions() {
    this.setState({isInstructionsOpen: true})
  }

  closeInstructions() {
    this.setState({isInstructionsOpen: false})
  }

  render() {
    const isLinkShow = this.state.isLinkShow;
    const isReadyPlay = this.state.isReadyPlay;
    const clientId = this.state.clientId;
    const gesture = this.state.selectedGesture;
    const roomId = this.state.roomId;
    const gestureOfOpponent = this.state.gestureOfOpponent;
    const waitingForOpponentGesture = this.state.waitingForOpponentGesture;
    const resultOfgame = this.state.resultOfGame;
    const isInstructionsOpen = this.state.isInstructionsOpen;

    if (gestureOfOpponent && gesture && waitingForOpponentGesture) {
      this.defineWinner(gesture, gestureOfOpponent);
    }

    // присоединяемся к комнате, которой ждет первый игрок
    // вызывается 2 раза
    if (!isLinkShow && this.state.roomId && !this.state.isReadyPlay && !resultOfgame) {
      console.log('joinRoom in index.js');
      this.api.joinRoom(this.state.roomId);
    }

    const link = isLinkShow ? <Link roomId={this.state.roomId}/>: '';
    const gestures = isReadyPlay ? <Gestures chooseGesture={this.chooseGesture}/> : '';
    const playBtn = gesture ? <button className="play-btn" onClick={() => this.play(clientId,roomId, gesture)}>Play</button> : '';
    const loader = waitingForOpponentGesture ? <Preloader /> : '';
    const result = resultOfgame ? <Result result={resultOfgame} ownGesture={gesture} opponentGesture={gestureOfOpponent} /> : '';
    const instructions = isInstructionsOpen ? <Instructions closeInstructions={this.closeInstructions}/> : '';

    return (
      <div>
        <Header openInstructions={this.openInstructions} />
        <div className="game-container">
          {loader}
          {link}
          {gestures}
          <br/>
          {playBtn}
          {result}
          {instructions}
        </div>
      </div>
    )
  }
}

export default Game;
