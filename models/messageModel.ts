import { database } from '../db/db.js';

interface Message {
  id: number;
  message: string;
  created_at: string;
  username: string;
}

export const MessageModel = {
  get(msgId: number): Message | undefined {
    try {
      return database
        .prepare(
          'SELECT m.id, m.message, m.created_at, u.username FROM messages m JOIN users u ON m.user_id = u.id WHERE m.id = ?',
        )
        .get(msgId) as Message | undefined;
    } catch (e) {
      throw e;
    }
  },
  getByRoomId(roomId: number): Message[] {
    try {
      return database
        .prepare(
          'SELECT m.id, m.message, m.created_at, u.username FROM messages m JOIN users u ON m.user_id = u.id WHERE m.room_id = ?',
        )
        .all(roomId) as unknown as Message[];
    } catch (e) {
      throw e;
    }
  },
  getAll(): Message[] {
    try {
      return database
        .prepare(
          'SELECT m.id, m.message, m.created_at, u.username FROM messages m JOIN users u ON m.user_id = u.id',
        )
        .all() as unknown as Message[];
    } catch (e) {
      throw e;
    }
  },
  create(user_id: number, message: string, room_id: number): { id: number } {
    try {
      const result = database
        .prepare(
          'INSERT INTO messages (user_id, message, room_id) VALUES (?, ?, ?)',
        )
        .run(user_id, message, room_id);
      return { id: result.lastInsertRowid as number };
    } catch (e) {
      throw e;
    }
  },
};
