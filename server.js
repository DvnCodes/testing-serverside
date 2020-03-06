const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);

const players = {};

http.listen(8080, () => {
  console.log("listening on 8080");
});

app.get("/", (req, res) => {
  res.send({ msg: "hello world" });
});

io.on("connection", socket => {
  console.log("player connected");
  players[socket.id] = { id: socket.id, pos: { x: 0, y: 0 } };
  io.emit("playerArrayUpdate", players);

  // socket.on("player connected", data => {
  //   arr.push(data);
  //   io.emit(arr);
  // });
  socket.on("playerMovement", data => {
    // console.log("player: ", socket.id, "moving: ", data);
  });
  socket.on("playerPosUpdate", data => {
    // console.log("player: ", socket.id, "moving: ", data);
    players[socket.id].pos = data;
    io.emit("playerArrayUpdate", players);
  });

  socket.on("disconnect", () => {
    console.log("socket");
    delete players[socket.id];
  });
});
