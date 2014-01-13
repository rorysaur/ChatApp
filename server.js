var http = require("http");
var mime = require("mime");
var static = require("node-static");
var chatServer = require("./lib/chat_server");

var fileServer = new static.Server("./public");

var server = http.createServer(function (request, response) {

  request.addListener("end", function () {
    fileServer.serve(request, response, function (error, res) {
      if (error && (error.status === 404)) {
        fileServer.serveFile("/404.html", 404, {}, request, response);
      }
    });

  }).resume();
});

chatServer.createChat(server);

server.listen(8080);

console.log("Server running at http://127.0.0.1:8080/");