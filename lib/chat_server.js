var chatServer = {};

module.exports = chatServer;

var socketIO = chatServer.socketIO = require("socket.io");

var createChat = chatServer.createChat = function (server) {
  console.log("Creating chat...");
  var socketServer = socketIO.listen(server);

  socketServer.on("connection", function (socket) {
    socket.emit("news", { hello: "world" });
    console.log("socket!");

    // other event handlers
  });
};


