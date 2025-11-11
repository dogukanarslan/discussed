import {MessagesModel} from '../models/messagesModel.js';

export const index = (req, res) => {
  const messages = MessagesModel.getAll();
  res.send(messages);
};

export const store = (req, res) => {
  const io = req.app.get('socketio');

  const {name, message} = req.body;

  MessagesModel.create(name, message);
  io.emit('message', req.body);
  res.sendStatus(200);
};
