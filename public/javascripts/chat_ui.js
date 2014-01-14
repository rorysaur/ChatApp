(function (root) {
  var ChatApp = root.ChatApp = root.ChatApp || {};

  var UI = ChatApp.UI = function (chat) {
    this.chat = chat;
  };

  var installSocketHandlers = function () {
    var ui = this;

    ChatApp.socket.on("news", function (data) {
      console.log(data);
      installKeyHandler.call(ui);
      ui.chat.sendMessage("JOINED THE ROOM!");
    });

    ChatApp.socket.on("new-message", function (data) {
      var $message = $('<p>');
      $message.text(data.nick + ": " + data.msg);
      $('div#messages').append($message);
    });
  }

  var installKeyHandler = function () {
    var ui = this;

    $('input').on('keydown', function (event) {
      if (event.which === 13) {
        event.preventDefault();
        var msg = $(this).val();
        ui.chat.sendMessage(msg);
        $(this).val("");
      }
    })
  }

  UI.prototype.start = function () {
    installSocketHandlers.call(this);
  }

})(this);

$(function () {
  ChatApp.socket = io.connect();
  var chat = new ChatApp.Chat(ChatApp.socket);
  var ui = new ChatApp.UI(chat);
  ui.start();
});