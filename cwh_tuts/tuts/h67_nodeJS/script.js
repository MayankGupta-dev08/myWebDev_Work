const fs = require('fs');
const http = require('http');

const hostName = '127.0.0.1';
const port = 3000;

const homeFile = fs.readFileSync('./index.html');
const aboutFile = fs.readFileSync('./about.html');
const contactFile = fs.readFileSync('./contact.html');
const servicesFile = fs.readFileSync('./services.html');

const server = http.createServer((req, res) => {
  let url = req.url;
  console.log(url);

  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  if (url == '/') {
    res.end(homeFile);
  } else if (url == '/about') {
    res.end(aboutFile);
  } else if (url == '/contact') {
    res.end(contactFile);
  } else if (url == '/services') {
    res.end(servicesFile);
  } else {
    res.statusCode = 404;
    res.end('<h1>Err:404, Page not Found!</h1>');
  }
});

server.listen(port, hostName, () => {
  console.log(`Server running at http://${hostName}:${port}/`);
})