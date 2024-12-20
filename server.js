const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const bodyParser = require("body-parser");
const port = process.env.PORT || 4001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

io.on("connection", (socket) => {
  var clientid = socket.username;
  socket.username = "Anonymous";

  socket.on("username", (res) => {
    socket.username = res.username;
  });

  socket.on("chat", (res) => {
    io.emit("chat response", {
      response: res.txt,
      sender: socket.username,
      createdAt: new Date().getTime(),
    });
  });
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}!`);
});
