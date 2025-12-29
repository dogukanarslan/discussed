import express from 'express';
import http from 'node:http';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {Server} from 'socket.io';
import {router as MessageRoute} from './routes/messagesRoute.js';
import {router as AuthRoute} from './routes/authRoute.js';
import {router as RoomRoute} from './routes/roomRoute.js';
import {errorHandler} from './middlewares/errorHandler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:5173'
  },
  serveClient: false
});

const connectedUsers = new Map();

io.on('connection', (socket) => {
  socket.on('user:join', (user) => {
    if (!user.id || !user.username) {
      return;
    }

    socket.userId = user.id;
    connectedUsers.set(user.id, user);

    io.emit('users:update', Array.from(connectedUsers.values()));
  });

  socket.on('disconnect', () => {
    if (socket.userId) {
      connectedUsers.delete(socket.userId);
    }
    io.emit('users:update', Array.from(connectedUsers.values()));
  });
});

var allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', '*');
  next();
};

// Middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.use('/foo', express.static(path.join(__dirname, '/ui/dist')));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(allowCrossDomain);

app.set('socketio', io);

app.use('/messages', MessageRoute);
app.use('/rooms', RoomRoute);
app.use('/', AuthRoute);
app.use(errorHandler);

const server = httpServer.listen(process.env.PORT || 3000, () => {
  console.log('server is runnning on port ', server.address().port);
});
