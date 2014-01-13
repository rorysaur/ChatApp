(function (root) {
  var ChatApp = root.ChatApp = root.ChatApp || {};

  var ChatServer = ChatApp.ChatServer = {};

  module.exports = ChatServer;

  var socketIO = ChatServer.socketIO = require("socket.io");

  var createChat = ChatServer.createChat = function (server) {
    console.log("Creating chat...");
    var socketServer = socketIO.listen(server);

    socketServer.on("connection", function (socket) {
      socket.emit("news", { hello: "world" });

      // other event handlers
      socket.on("message", function (msg) {
        socketServer.sockets.emit("new-message", msg)
      });
    });
  };
})(this);




