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

    var joinMsg = nick + " joined the room.";
    var data = {
      nick: nick,
      msg: joinMsg,
      users: nicknames
    };
    socketServer.sockets.emit("notice-room", data);

    socket.emit("news", { hello: nick });

    socket.on("message", function (msg) {
      var data = {
        nick: nicknames[socket.id],
        msg: msg
      };
      socketServer.sockets.emit("new-message", data)
    });

    socket.on("nick-change-request", function (nick) {
      var response = {
        success: true,
      };

      if (nick.match(/^chatter/)) {
        response.success = false;
        response.msg = "Nick cannot begin with 'chatter'.";
      }

      for (var socketId in nicknames) {
        if (nicknames[socketId] === nick) {
          response.success = false,
          response.msg = "Nick is already taken."
        }
      }

      if (response.success) {
        var oldNick = nicknames[socket.id];
        nicknames[socket.id] = nick;
        response.msg = oldNick + " is now known as " + nick;
        response.users = nicknames;
      }

      socketServer.sockets.emit("nick-change-result", response);
    });

    socket.on("disconnect", function () {
      var partMsg = nicknames[socket.id] + " left the room.";
      delete nicknames[socket.id];
      var data = {
        nick: nick,
        msg: partMsg,
        users: nicknames
      };
      socketServer.sockets.emit("notice-room", data);
    });
  });
};

