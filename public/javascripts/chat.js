(function (root) {
  var ChatApp = root.ChatApp = root.ChatApp || {};

  var Chat = ChatApp.Chat = function (socket) {
    this.socket = socket;
  };

  Chat.prototype.processCommand = function (command, data) {
    if (command === "nick") {
      this.socket.emit("nick-change-request", data);
    }
  };

  Chat.prototype.sendMessage = function (msg) {
    this.socket.emit("message", msg);
  };

})(this);


