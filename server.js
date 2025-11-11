import express from 'express';
import http from 'node:http';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {Server} from 'socket.io';
import {router as MessageRoute} from './routes/messagesRoute.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer);

var allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', '*');
  next();
};

// Middlewares
app.use(express.static(__dirname));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(allowCrossDomain);

app.set('socketio', io);

app.use('/messages', MessageRoute);

const server = httpServer.listen(process.env.PORT || 3000, () => {
  console.log('server is runnning on port ', server.address().port);
});
