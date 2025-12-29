import {RoomModel} from '../models/roomModel.js';

export const RoomService = {
  getAll() {
    return RoomModel.getAll();
  },
  create({name, user_id}) {
    if (!user_id) {
      throw {status: 400, message: 'user_id is required'};
    }

    if (!name) {
      throw {status: 400, message: 'name is required'};
    }

    const {id} = RoomModel.create(name, user_id);
    return RoomModel.get(id);
  }
};
