import { database } from '../db/db.js';

export const UserModel = {
  create(username, password) {
    try {
      return database
        .prepare('INSERT INTO users (username,password) VALUES (?, ?)')
        .run(username, password);
    } catch (e) {
      throw e;
    }
  },
  get(username) {
    try {
      return database
        .prepare('SELECT * FROM users WHERE username = ?')
        .get(username);
    } catch (e) {
      throw e;
    }
  },
};
