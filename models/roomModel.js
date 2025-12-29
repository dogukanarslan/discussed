import {database} from '../db/db.js';

export const RoomModel = {
  getById(roomId) {
    try {
      return database.prepare('SELECT * FROM rooms WHERE id = ?').get(roomId);
    } catch (e) {
      throw e;
    }
  },
  getAll() {
    try {
      return database.prepare('SELECT * FROM rooms').all();
    } catch (e) {
      throw e;
    }
  },
  create(name, user_id) {
    try {
      const result = database
        .prepare('INSERT INTO rooms (name, user_id) VALUES (?, ?)')
        .run(name, user_id);
      return {id: result.lastInsertRowid};
    } catch (e) {
      throw e;
    }
  }
};
