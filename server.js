const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);

const arr = [];
let playerNumber = 1;

http.listen(8080, () => {
  console.log("listening on 8080");
});

app.get("/", (req, res) => {
  res.send({ msg: "hello world" });
});

io.on("connection", socket => {
  socket.on("playerJoined", msg => {
    socket.emit("connection verified", playerNumber);
    playerNumber++;
  });

  socket.on("player connected", data => {
    arr.push(data);
    io.emit("player connected update", arr);
    console.log("playerconupdate");
  });
  socket.on("playerMovement", data => {
    console.log("someone said they moved");
    arr.forEach(player => {
      if (player.id === data.id) {
        player.x = data.x;
        player.y = data.y;
      }
      io.emit("player connected update", arr);
    });
  });
});
