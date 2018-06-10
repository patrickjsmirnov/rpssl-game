import io from 'socket.io-client';

export default class Api {

  constructor() {
    this.socket = io(API_URL);
  }

  getRoomId(cb) {
    this.socket.on('setRoomId', roomId => cb(null, roomId));
    this.socket.emit('getRoomId');
  }

  firstPlayerJoinRoom(roomId) {
    this.socket.emit('firstPlayerJoinRoom', roomId);
  }

  joinRoom(roomId) {
    console.log('call joinRoom');
    this.socket.emit('joinRoom', roomId);
  }

  waitingForPlay(cb) {
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
