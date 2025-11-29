import { MessageModel } from "../models/messageModel.js";

export const MessageService = {
  getAll() {
    return MessageModel.getAll();
  },
  getById(msgId) {
    const msg = MessageModel.get(msgId);
    if (!msg) {
      throw Error("Message not found");
    }

    return msg;
  },
  create({ user_id, message }) {
    if (!user_id) {
      return res.status(400).json({ error: "user_id is required" });
    }

    if (!message) {
      return res.status(400).json({ error: "message is required" });
    }
    const { id } = MessageModel.create(user_id, message);
    return MessageModel.get(id);
  },
};
