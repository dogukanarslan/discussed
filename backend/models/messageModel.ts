import { database } from '../db/db.ts';

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
          'SELECT m.id, m.message, m.created_at, m.subject_id, u.username FROM messages m JOIN users u ON m.user_id = u.id WHERE m.id = ?',
        )
        .get(msgId) as Message | undefined;
    } catch (e) {
      throw e;
    }
  },
  getBySubjectId(subjectId: number): Message[] {
    try {
      return database
        .prepare(
          'SELECT m.id, m.message, m.created_at, u.username FROM messages m JOIN users u ON m.user_id = u.id WHERE m.subject_id = ?',
        )
        .all(subjectId) as unknown as Message[];
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
  create(user_id: number, message: string, subject_id: number): { id: number } {
    console.log(subject_id)
    try {
      const result = database
        .prepare(
          'INSERT INTO messages (user_id, message, subject_id) VALUES (?, ?, ?)',
        )
        .run(user_id, message, subject_id);
      return { id: result.lastInsertRowid as number };
    } catch (e) {
      throw e;
    }
  },
};
