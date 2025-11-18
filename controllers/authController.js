import { UserModel } from "../models/userModel.js";

export const signin = (req, res) => {
  const { username, password } = req.body;
  const user = UserModel.get(username);
  if (user) {
    if (user.password !== password) {
      res.status(500).json({ error: "Invalid credentials" });
    } else {
      res.status(200).json({ id: user.id, username: user.username });
    }
  } else {
    res.status(404).json({ error: "User not found" });
  }
};

export const signup = (req, res) => {
  const { username, password } = req.body;

  try {
    const user = UserModel.create(username, password);
    if (user) {
      const user = UserModel.get(username);
      res.status(200).json({ id: user.id, username: user.username });
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
