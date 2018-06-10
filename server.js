const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const config = require('./webpack.config.js');
const compiler = webpack(config);
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}));

let numberClientsInRoom = {}

http.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening on port 3000!\n');
});

io.on('connection', (client) => {


  client.on('getRoomId', () => {
    client.emit('setRoomId', client.id);
    let room = `${client.id}`;
    client.join(room);
  });

  client.on('firstPlayerJoinRoom', (roomId) => {
    client.join(roomId);
  });

  client.on('joinRoom', (roomId) => {

    console.log('check = ', numberClientsInRoom[roomId]);
    if (!numberClientsInRoom[roomId]) {
      numberClientsInRoom[roomId] = 1;
      client.join(roomId);
      io.to(roomId).emit('ReadyForPlay', true);
    }

    else {
      console.log('blyaat');
    }

  });

  client.on('getClientId', () => {
    client.emit('setClientId', client.id);
  });

  client.on('selectedGesture', (clientIdAndGesture) => {
    let clientIdAndGestureObj = JSON.parse(clientIdAndGesture);
    io.to(clientIdAndGestureObj.roomId).emit('resultOfGame', clientIdAndGesture);

  });

});
