import { database } from '../db/db.ts';

interface Room {
  id: number;
  name: string;
  user_id: number;
  created_at: string;
}

export const RoomModel = {
  getById(roomId: number): Room | undefined {
    try {
      return database
        .prepare('SELECT * FROM rooms WHERE id = ?')
        .get(roomId) as unknown as Room | undefined;
    } catch (e) {
      throw e;
    }
  },
  getAll(): Room[] {
    try {
      return database.prepare('SELECT * FROM rooms').all() as unknown as Room[];
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
          'INSERT INTO rooms (name, description, user_id) VALUES (?, ?, ?)',
        )
        .run(name, description, user_id);
      return { id: result.lastInsertRowid as number };
    } catch (e) {
      throw e;
    }
  },
  delete(roomId: number): { id: number } {
    try {
      database.prepare('DELETE FROM rooms WHERE id = ?').run(roomId);
      return { id: roomId };
    } catch (e) {
      throw e;
    }
  },
};
