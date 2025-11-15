import { database } from "../db/db.js";

export const MessagesModel = {
  getAll() {
    return database.prepare("SELECT * FROM messages").all();
  },
  create(user_id, message) {
    const stmt = database.prepare(
      "INSERT INTO messages (user_id, message) VALUES (?, ?)"
    );
    const result = stmt.run(user_id, message);
    return { id: result.lastInsertRowid };
  },
};
