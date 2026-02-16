import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Server } from 'socket.io';

import { router as MessageRoute } from './routes/messagesRoute.ts';
import { router as AuthRoute } from './routes/authRoute.ts';
import { router as RoomRoute } from './routes/roomRoute.ts';
import { errorHandler } from './middlewares/errorHandler.ts';
import { validateToken } from './middlewares/validateToken.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:5173',
  },
  serveClient: false,
});

const allowCrossDomain = function (
  req: Request,
  res: Response,
  next: NextFunction,
) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Methods', '*');
  next();
};

// Middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.use('/foo', express.static(path.join(__dirname, 'ui', 'dist')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(allowCrossDomain);

app.set('socketio', io);

// Routes
app.use('/messages', validateToken, MessageRoute);
app.use('/rooms', validateToken, RoomRoute);
app.use('/', AuthRoute);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log('server is running on port ', PORT);
});
