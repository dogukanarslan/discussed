import {database} from '../db/db.js';

export const RoomModel = {
  getAll() {
    try {
      return database.prepare('SELECT * FROM rooms').all();
    } catch (e) {
      throw e;
    }
  },
  create(name, user_id) {
    console.log(process.env.HOME, process.env.DB);
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
