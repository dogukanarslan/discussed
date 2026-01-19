import { database } from '../db/db.js';

interface User {
  id: number;
  username: string;
  password: string;
  created_at: string;
}

export const UserModel = {
  create(username: string, password: string): { id: number } {
    try {
      const result = database
        .prepare('INSERT INTO users (username, password) VALUES (?, ?)')
        .run(username, password);
      return { id: result.lastInsertRowid as number };
    } catch (e) {
      throw e;
    }
  },
  get(username: string): User | undefined {
    try {
      return database
        .prepare('SELECT * FROM users WHERE username = ?')
        .get(username) as unknown as User | undefined;
    } catch (e) {
      throw e;
    }
  },
};
