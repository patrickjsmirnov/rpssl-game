import io from 'socket.io-client';

export default class Api {

  constructor() {
    this.socket = io('http://localhost:8000');
  }

  getClientId(cb) {
    this.socket.on('setClientId', clientId => cb(null, clientId));
    this.socket.emit('getClientId');
  }

  setNewNamespace(clientId) {
    this.socket = io(`/${clientId}`);
  }
}
