import { MessageModel } from '../models/messageModel.js';

export const MessageService = {
  getAll() {
    return MessageModel.getAll();
  },
  getById(msgId) {
    const msg = MessageModel.get(msgId);
    if (!msg) {
      throw { status: 404, message: 'Message not found' };
    }

    return msg;
  },
  getByRoomId(roomId) {
    const msgs = MessageModel.getByRoomId(roomId);
    if (!msgs) {
      throw { status: 404, message: 'Messages not found' };
    }

    return msgs;
  },
  create({ user_id, message }) {
    if (!user_id) {
      throw { status: 400, message: 'user_id is required' };
    }

    if (!message) {
      throw { status: 400, message: 'message is required' };
    }

    const { id } = MessageModel.create(user_id, message);
    return MessageModel.get(id);
  },
};
