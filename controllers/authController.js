import { UserModel } from "../models/userModel.js";

export const signin = (req, res) => {
  const { username, password } = req.body;
  const user = UserModel.get(username);
  if (user) {
    res.status(200).json({ id: user.id, username: user.username });
  } else {
    res.status(404).text("User not found");
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
    console.log(e.message);
    res.sendStatus(500);
  }
};
