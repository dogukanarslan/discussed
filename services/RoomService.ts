import { RoomModel } from '../models/roomModel.ts';

export const RoomService = {
  getById(roomId: number) {
    const room = RoomModel.getById(roomId);
    if (!room) {
      throw { status: 404, message: 'Room not found' };
    }

    return room;
  },
  getAll() {
    return RoomModel.getAll();
  },
  create({ name, user_id }: { name: string; user_id: number }) {
    if (!user_id) {
      throw { status: 400, message: 'user_id is required' };
    }

    if (!name) {
      throw { status: 400, message: 'name is required' };
    }

    const { id } = RoomModel.create(name, user_id);
    return RoomModel.getById(id);
  },
  delete(roomId: number) {
    const deleteRoomId = RoomModel.delete(roomId);
    if (!deleteRoomId) {
      throw { status: 404, message: 'Room not found' };
    }

    return deleteRoomId;
  },
};
