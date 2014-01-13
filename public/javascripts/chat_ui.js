(function (root) {
  var ChatApp = root.ChatApp = root.ChatApp || {};

  var installSocketHandlers = function () {
    ChatApp.socket.on("news", function (data) {
      console.log("Socketed.");
      installKeyHandler();
      ChatApp.chat.sendMessage("Say something.");
    });

    ChatApp.socket.on("new-message", function (msg) {
      $('div#messages').append(msg + '<br>');
    });
  }

  // var installSubmitHandler = function () {
  //   $('#speak').on('submit', function (event) {
  //       event.preventDefault();
  //       var msg = $(this).find('input').val();
  //       ChatApp.chat.sendMessage(msg);
  //   });
  // };

  var installKeyHandler = function () {
    $('input').on('keydown', function (event) {
      if (event.which === 13) {
        event.preventDefault();
        var msg = $(this).val();
        ChatApp.chat.sendMessage(msg);
        $(this).val("");
      }
    })
  }

  var start = ChatApp.start = function () {
    installSocketHandlers();
  }

})(this);

$(function () {
  ChatApp.socket = io.connect();
  ChatApp.chat = new ChatApp.Chat(ChatApp.socket);
  ChatApp.start();
});