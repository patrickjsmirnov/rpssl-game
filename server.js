const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();
const config = require('./webpack.config.js');
const compiler = webpack(config);

const io = require('socket.io')();
const port = 8000;
// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}));

// Serve the files on port 3000.
app.listen(3000, function () {
  console.log('Example app listening on port 3000!\n');
});

// перешли по расшаренной ссылке
// /play/player=client.id
app.get('/play/', (req, res) => {
  const player = req.query.player;

  res.send('Play is here!')
});

revealWinner = () => {

}

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

io.listen(port);
console.log('listening on port ', port);
