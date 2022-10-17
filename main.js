/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Other/javascript.js to edit this template
 */
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 1080;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
         socket.on('connect', () => {
            console.log('New websocket Connected');
        });
         socket.on('disconnect', () => {
            console.log('a websocket disconnected');
        });
        socket.on('chat message', function(msg){
            console.log(msg)
            io.emit('chat message', msg);
        });
        socket.on('image', function(msg){
          console.log(msg)
          socket.emit('image', msg);
        });
        socket.on('error', function (err) {
         if (err.description) throw err.description;
         else throw err; // Or whatever you want to do
       });  
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});

