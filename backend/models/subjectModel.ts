import { database } from '../db/db.ts';

interface Subject {
  id: number;
  name: string;
  user_id: number;
  created_at: string;
}

export const SubjectModel = {
  getById(subjectId: number): Subject | undefined {
    try {
      return database
        .prepare('SELECT * FROM subjects WHERE id = ?')
        .get(subjectId) as unknown as Subject | undefined;
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
