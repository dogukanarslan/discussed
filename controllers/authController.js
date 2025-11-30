import { UserService } from "../services/UserService.js";

export const signin = (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = UserService.signin(username, password);
    return res.status(200).json(user);
  } catch (e) {
    throw { message: e.message };
  }
};

export const signup = (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = UserService.signup(username, password);
    res.status(201).json({ id: user.id, username: user.username });
  } catch (e) {
    if (e.errcode === 2067) {
      return next({ status: 409, message: "Username already exists" });
    }

    return next(e);
  }
};
