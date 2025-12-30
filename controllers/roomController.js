import {RoomService} from '../services/RoomService.js';

export const index = (req, res) => {
  try {
    const rooms = RoomService.getAll();
    res.send(rooms);
  } catch (e) {
    return res.status(500).json({error: e.message});
  }
};

export const store = (req, res) => {
  try {
    const {name, user_id} = req.body;
    const room = RoomService.create({name, user_id});

    res.status(201).json(room);
  } catch (e) {
    res.status(400).json({error: e.message});
  }
};

export const deleteRoom = (req, res) => {
  try {
    const {roomId} = req.params;
    RoomService.delete(roomId);
    res.sendStatus(204);
  } catch (e) {
    res.status(400).json({error: e.message});
  }
};
