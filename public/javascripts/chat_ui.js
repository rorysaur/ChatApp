(function (root) {
  var ChatApp = root.ChatApp = root.ChatApp || {};

  var socket = io.connect();
  socket.on("news", function (data) {
    console.log(data);
    var chat = new ChatApp.Chat(socket);
    chat.sendMessage("HI IM IN THE CHATROOM");
  });

  socket.on("new-message", function (msg) {
    $("div#messages").append(msg);
  })
})(this);
