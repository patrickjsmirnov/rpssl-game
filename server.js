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

io.on('connection', (client) => {
  client.on('getClientId', () => {
    client.emit('setClientId', client.id);
    let nsp = io.of(`/${client.id}`);
    nsp.on('connection', (client) => {
      console.log('specific namespace');
      console.log(client.id);
    })
  });
});

io.listen(port);
console.log('listening on port ', port);
