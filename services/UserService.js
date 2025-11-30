import bcrypt from "bcrypt";
import { UserModel } from "../models/userModel.js";

export const UserService = {
  signin(username, password) {
    if (!username || !password) {
      throw {
        status: 400,
        message: "username and password are required",
      };
    }

    try {
      const user = UserModel.get(username);
      if (!user) {
        throw { status: 404, message: "User not found" };
      }

      if (!bcrypt.compareSync(password, user.password)) {
        throw { status: 400, message: "Invalid credentials" };
      }

      return { id: user.id, username: user.username };
    } catch (e) {
      throw Error(e.message);
    }
  },
  signup(username, password) {
    if (!username || !password) {
      throw { status: 400, message: "username and password are required" };
    }

    const saltRounds = 10;
    let hashedPassword = bcrypt.hashSync(password, saltRounds);
    UserModel.create(username, hashedPassword);
    const user = UserModel.get(username);
    return user;
  },
};
