import io from 'socket.io-client';

export default class Api {

  constructor() {
    this.socket = io(`${window.location.protocol}//${window.location.hostname}:8000`);
    console.log(`${window.location.protocol}//${window.location.hostname}:8000`);
  }

  getRoomId(cb) {
    this.socket.on('setRoomId', roomId => cb(null, roomId));
    this.socket.emit('getRoomId');
  }

  firstPlayerJoinRoom(roomId) {
    this.socket.emit('firstPlayerJoinRoom', roomId);
  }

  secondPlayerJoinRoom(roomId) {
    this.socket.emit('secondPlayerJoinRoom', roomId);
  }

  joinRoom(roomId) {
    this.socket.emit('joinRoom', roomId);
  }

  waitForPlay(cb) {
    this.socket.on('ReadyForPlay', isReadyPlay => cb(null, isReadyPlay))
  }

  getClientId(cb) {
    this.socket.on('setClientId', clientId => cb(null, clientId));
    this.socket.emit('getClientId');
  }

  resultOfGame(clientGestureObj) {
    this.socket.emit('selectedGesture', clientGestureObj);
  }

  waitingForResultOfGame(cb) {
    this.socket.on('resultOfGame', resultOfGame => cb(null, resultOfGame));
  }

}
