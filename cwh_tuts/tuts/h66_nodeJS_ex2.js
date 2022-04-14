const http = require('http');
const fs = require('fs');

const fileContent = fs.readFileSync('temp.html');

const server = http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-type': 'text/html' });
  res.end(fileContent);
});

const port = 80;
const hostName = '127.0.0.1';
server.listen(port, hostName, function () {
  console.log('Listening on port', port);
})