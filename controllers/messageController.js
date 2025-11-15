import {MessagesModel} from '../models/messagesModel.js';

export const index = (req, res) => {
  const messages = MessagesModel.getAll();
  res.send(messages);
};

export const store = (req, res) => {
  const io = req.app.get('socketio');

  const {username, message} = req.body;

  const response = MessagesModel.create(username, message);

  io.emit('message', {id: response.id, ...req.body});
  res.sendStatus(200);
};
