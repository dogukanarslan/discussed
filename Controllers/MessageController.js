import {MessagesModel} from '../models/messagesModel.js';

export const index = (req, res) => {
  console.log('hi')
  const messages = MessagesModel.getAll();
  res.send(messages);
};

export const store = (req, res) => {
  const io = req.app.get('socketio');

  const {username, message} = req.body;

  MessagesModel.create(username, message);
  io.emit('message', req.body);
  res.sendStatus(200);
};
