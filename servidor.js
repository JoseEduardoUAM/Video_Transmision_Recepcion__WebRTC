//Para ocupar la consola del sistema operativo
const path = require('path');

//Para el servidor
const express = require("express");
const fs = require('fs');
const https = require('https');
const app = express();
app.set('port',process.env.PORT || 4000);

///Documentos estaticos
app.use('/Transmitir',express.static( path.join(__dirname , 'public','Transmisor','broadcast.html') ));
app.use(express.static( path.join(__dirname , 'public','Transmisor') ));
app.use('/Recibir',express.static( path.join(__dirname , 'public','Receptor','index.html') ));
app.use(express.static( path.join(__dirname , 'public','Receptor') ));

//Configuracion del Servidor https
const server = https.createServer({
  cert : fs.readFileSync("Certificados/cert.pem"),
  key : fs.readFileSync("Certificados/key.pem")
}, app).listen( app.get('port'), function(){
  console.log('Servidor https corriendo en puerto ' , app.get('port'));
});
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
///Configutracion de los sockets
const SocketIO = require('socket.io');
const io = SocketIO(server);
//////////////////////////////////////////////////////
let broadcaster;
//////////////////////////////////////////////////////
io.sockets.on("connection", socket => {

  socket.on("broadcaster", () => {
    broadcaster = socket.id;
    socket.broadcast.emit("broadcaster");
  });

  socket.on("watcher", () => {
    socket.to(broadcaster).emit("watcher", socket.id);
  });

  socket.on("offer", (id, message) => {
    socket.to(id).emit("offer", socket.id, message);
  });

  socket.on("answer", (id, message) => {
    socket.to(id).emit("answer", socket.id, message);
  });

  socket.on("candidate", (id, message) => {
    socket.to(id).emit("candidate", socket.id, message);
  });

  socket.on("disconnect", () => {
    socket.to(broadcaster).emit("disconnectPeer", socket.id);
  });

});
//////////////////////////////////////////////////////
io.sockets.on("error", e => console.log(e));
