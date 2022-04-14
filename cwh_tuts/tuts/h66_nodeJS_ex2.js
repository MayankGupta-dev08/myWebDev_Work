const http = require('http');
const fs = require('fs');

const fileContent = fs.readFileSync('temp.html');

const server = http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-type': 'text/html' });
  res.end(fileContent);
});

const port = 80;
server.listen(port, '127.0.0.1', function () {
  console.log('Listening on port', port);
})