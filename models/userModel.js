import { database } from "../db/db.js";

export const UserModel = {
  create(username, password) {
    const stmt = database.prepare(
      "INSERT INTO users (username,password) VALUES (?, ?)"
    );
    const result = stmt.run(username, password);
    return { id: result.lastInsertRowid };
  },
  get(username) {
    const stmt = database.prepare("SELECT * FROM users WHERE username = ?");
    const result = stmt.get(username);

    return result;
  },
};
