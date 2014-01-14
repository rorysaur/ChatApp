var ChatServer = {};

module.exports = ChatServer;

var socketIO = ChatServer.socketIO = require("socket.io");

var createChat = ChatServer.createChat = function (server) {
  console.log("Creating chat...");
  var socketServer = socketIO.listen(server);

  var guestNumber = 1;
  var nicknames = {};

  socketServer.on("connection", function (socket) {
    var nick = "chatter" + guestNumber;
    guestNumber += 1;
    nicknames[socket.id] = nick;
    console.log(nicknames);

    socket.emit("news", { hello: nick });

    // other event handlers
    socket.on("message", function (msg) {
      var data = {
        nick: nicknames[socket.id],
        msg: msg
      };
      socketServer.sockets.emit("new-message", data)
    });

    socket.on("nick-change-request", function (nick) {
      // check that nick is not taken
      // handle nick being taken


      // add nick to nicknames

      socketServer.sockets.emit("nick-change-result", nick);
    });
  });
};

