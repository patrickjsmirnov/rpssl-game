import io from 'socket.io-client';

export default class Api {

  constructor() {
    this.socket = io('http://localhost:8000');
  }

  getRoomId(cb) {
    this.socket.on('setRoomId', roomId => cb(null, roomId));
    this.socket.emit('getRoomId');
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

}
