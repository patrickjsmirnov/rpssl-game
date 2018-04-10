const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();
const config = require('./webpack.config.js');
const compiler = webpack(config);


const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}));

http.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening on port 3000!\n');
});

io.on('connection', (client) => {

  client.on('getRoomId', () => {
    client.emit('setRoomId', client.id);
    let room = `${client.id}`;
    console.log('join room without link ', room);
    client.join(room);
  });

  // добавляем в комнату
  client.on('firstPlayerJoinRoom', (roomId) => {
    client.join(roomId);
  });

  // добавляем в комнату
  client.on('joinRoom', (roomId) => {
    console.log('join room with link', roomId);
    client.join(roomId);
    io.to(roomId).emit('ReadyForPlay', true);
  });

  client.on('getClientId', () => {
    client.emit('setClientId', client.id);
  });

  // отправляем клиентам результаты выборов

  client.on('selectedGesture', (clientIdAndGesture) => {
    let clientIdAndGestureObj = JSON.parse(clientIdAndGesture)

    io.to(clientIdAndGestureObj.roomId).emit('resultOfGame', clientIdAndGesture);

  });

});
