import { database } from '../db/db.js';
import { MessageModel } from './messageModel.js';

interface Message {
  id: number;
  message: string;
  created_at: string;
  username: string;
}

interface Subject {
  id: number;
  name: string;
  user_id: number;
  created_at: string;
  messages: Message[];
}

export const SubjectModel = {
  getById(subjectId: number): Subject | undefined {
    try {
      const subject = database
        .prepare('SELECT * FROM subjects WHERE id = ?')
        .get(subjectId) as Omit<Subject, 'messages'> | undefined;

      if (!subject) return undefined;

      const messages = MessageModel.getBySubjectId(subjectId);

      return { ...subject, messages };
    } catch (e) {
      throw e;
    }
  },
  getAll(): Subject[] {
    try {
      return database
        .prepare('SELECT * FROM subjects')
        .all() as unknown as Subject[];
    } catch (e) {
      throw e;
    }
  },
  create(
    name: string,
    description: string | null,
    user_id: number,
  ): { id: number } {
    try {
      const result = database
        .prepare(
          'INSERT INTO subjects (name, description, user_id) VALUES (?, ?, ?)',
        )
        .run(name, description, user_id);
      return { id: result.lastInsertRowid as number };
    } catch (e) {
      throw e;
    }
  },
  delete(subjectId: number): { id: number } {
    try {
      database.prepare('DELETE FROM subjects WHERE id = ?').run(subjectId);
      return { id: subjectId };
    } catch (e) {
      throw e;
    }
  },
};
