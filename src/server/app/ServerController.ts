import express from 'express';
import http from 'http';
var path = require('path');

export default class ServerController {
  app: any;
  server_dir: string;
  server: any;

  constructor() {
    this.app = express();
    this.server = http.createServer(this.app);
    this.server_dir = __dirname + '/../../../src';
  }

  initServer() {
    this.app.get('/', (req, res) => {
      var name = path.resolve(this.server_dir + '/client/index.html');
      res.sendFile(name);
    });

    this.app.use('/client', express.static(path.resolve(this.server_dir + '/client')));

    let port = 2000;
    this.server.listen(port, () => {
      console.log('Server alive');
    });
  }

  printIp() {
    var os = require('os');
    var interfaces = os.networkInterfaces();
    var addresses = [];
    for (var k in interfaces) {
      var inter = interfaces[k];
      for (var j in inter) if (inter[j].family === 'IPv4' && !inter[j].internal) addresses.push(inter[j].address);
    }
    console.log(addresses);
  }
}
