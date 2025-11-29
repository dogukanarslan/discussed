import { MessageService } from "../services/MessageService.js";

export const index = (req, res) => {
  try {
    const messages = MessageService.getAll();
    res.send(messages);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

export const store = (req, res) => {
  try {
    const io = req.app.get("socketio");

    const { user_id, message } = req.body;
    const msg = MessageService.create({ user_id, message });

    io.emit("message", msg);
    res.sendStatus(201);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};
