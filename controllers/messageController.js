import {MessagesModel} from '../models/messagesModel.js';

export const index = (req, res) => {
  const messages = MessagesModel.getAll();
  res.send(messages);
};

export const store = (req, res) => {
  const io = req.app.get('socketio');

  const {user_id, message} = req.body;

  const response = MessagesModel.create(user_id, message);
  const msg = MessagesModel.get(response.id)

  io.emit('message', msg);
  res.sendStatus(200);
};
