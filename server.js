const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);

const arr = [];

http.listen(8080, () => {
  console.log("listening on 8080");
});

app.get("/", (req, res) => {
  res.send({ msg: "hello world" });
});

io.on("connection", socket => {
  socket.on("player connected", data => {
    arr.push(data);
    io.emit(arr);
  });
});
