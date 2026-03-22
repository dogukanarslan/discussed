import { MessageModel } from '../models/messageModel.ts';

export const MessageService = {
  getAll() {
    return MessageModel.getAll();
  },
  getById(msgId: number) {
    const msg = MessageModel.get(msgId);
    if (!msg) {
      throw { status: 404, message: 'Message not found' };
    }

    return msg;
  },
  getByRoomId(roomId: number) {
    const msgs = MessageModel.getByRoomId(roomId);
    if (!msgs) {
      throw { status: 404, message: 'Messages not found' };
    }

    return msgs;
  },
  create({
    user_id,
    message,
    room_id,
  }: {
    user_id: number;
    message: string;
    room_id: number;
  }) {
    if (!user_id) {
      throw { status: 400, message: 'user_id is required' };
    }

    if (!message) {
      throw { status: 400, message: 'message is required' };
    }

    const { id } = MessageModel.create(user_id, message, room_id);
    return MessageModel.get(id);
  },
};
