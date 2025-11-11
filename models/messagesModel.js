import {database} from '../db/db.js';

export const MessagesModel = {
  getAll() {
    return database.prepare('SELECT * FROM messages').all();
  },
  create(username, message) {
    const stmt = database.prepare(
      'INSERT INTO messages (username, message) VALUES (?, ?)'
    );
    const result = stmt.run(username, message);
    return {id: result.lastInsertRowid};
  }
};
