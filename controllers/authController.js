import { UserModel } from "../models/userModel.js";

export const signin = (req, res, next) => {
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      return next({ status: 400, message: "Username and password required" });
    }

    const user = UserModel.get(username);
    if (!user) {
      return next({ status: 404, message: "User not found" });
    }

    if (user.password !== password) {
      return next({ status: 401, message: "Invalid credentials" });
    }
    return res.status(200).json({ id: user.id, username: user.username });
  } catch (e) {
    next(e);
  }
};

export const signup = (req, res, next) => {
  try {
    const { username, password } = req.body;

    UserModel.create(username, password);
    const user = UserModel.get(username);
    res.status(201).json({ id: user.id, username: user.username });
  } catch (e) {
    if (e.errcode === 2067) {
      return next({ status: 409, message: "Username already exists" });
    }

    return next(e);
  }
};
