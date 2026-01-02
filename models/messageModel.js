import { database } from '../db/db.js';

export const MessageModel = {
  get(msgId) {
    try {
      return database
        .prepare(
          'SELECT m.id, m.message, m.created_at, u.username FROM messages m JOIN users u ON m.user_id = u.id WHERE m.id = ?',
        )
        .get(msgId);
    } catch (e) {
      throw e;
    }
  },
  getByRoomId(roomId) {
    try {
      return database
        .prepare(
          'SELECT m.id, m.message, m.created_at, u.username FROM messages m JOIN users u ON m.user_id = u.id WHERE m.room_id = ?',
        )
        .all(roomId);
    } catch (e) {
      throw e;
    }
  },
  getAll() {
    try {
      return database
        .prepare(
          'SELECT m.id, m.message, m.created_at, u.username FROM messages m JOIN users u ON m.user_id = u.id',
        )
        .all();
    } catch (e) {
      throw e;
    }
  },
  create(user_id, message, room_id) {
    try {
      const result = database
        .prepare(
          'INSERT INTO messages (user_id, message, room_id) VALUES (?, ?, ?)',
        )
        .run(user_id, message, room_id);
      return { id: result.lastInsertRowid };
    } catch (e) {
      throw e;
    }
  },
};
