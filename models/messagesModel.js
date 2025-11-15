import { database } from "../db/db.js";

export const MessagesModel = {
  get(msgId) {
    return database.prepare("SELECT m.id, m.message, m.created_at, u.username FROM messages m JOIN users u ON m.user_id = u.id WHERE m.id = ?").get(msgId);
  },
  getAll() {
    return database.prepare("SELECT m.id, m.message, m.created_at, u.username FROM messages m JOIN users u ON m.user_id = u.id").all();
  },
  create(user_id, message) {
    const stmt = database.prepare(
      "INSERT INTO messages (user_id, message) VALUES (?, ?)"
    );
    const result = stmt.run(user_id, message);
    return { id: result.lastInsertRowid };
  },
};
