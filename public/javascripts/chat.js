(function (root) {
  var ChatApp = root.ChatApp = root.ChatApp || {};

  var Chat = ChatApp.Chat = function (socket) {
    this.socket = socket;
  };

  Chat.prototype.sendMessage = function (msg) {
    this.socket.emit("message", msg);
  };

})(this);


