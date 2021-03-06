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
    });

    ChatApp.socket.on("new-message", function (data) {
      var $message = $('<p>');
      $message.text(data.nick + ": " + data.msg);
      $('div#messages').append($message);
    });

    ChatApp.socket.on("nick-change-result", function (data) {
      var $message = $('<p>');
      $message.text(data.msg);
      $('div#messages').append($message);
      if (data.success) {
        renderUsers(data.users);
      }
    });

    ChatApp.socket.on("notice-room", function (data) {
      var $message = $('<p>');
      $message.text(data.msg);
      $('div#messages').append($message);

      renderUsers(data.users);
    })
  }

  var installKeyHandler = function () {
    var ui = this;

    $('input').on('keydown', function (event) {
      if (event.which === 13) {
        event.preventDefault();
        var msg = $(this).val();
        if (msg.match(/^\//)) {
          var input = msg.split(" ");
          var command = input[0].slice(1);
          var data = input[1];
          ui.chat.processCommand(command, data);
        } else {
          ui.chat.sendMessage(msg);
        }
        $(this).val("");
      }
    })
  }

  var renderUsers = function (users) {
    var ui = this;
    var userList = "";

    for (var socketId in users) {
      userList += "<br>" + users[socketId];
    }

    $('#users').html(userList);
  };

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