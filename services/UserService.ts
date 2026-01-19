import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/userModel.ts';

export const UserService = {
  signin(username: string, password: string) {
    if (!username || !password) {
      throw {
        status: 400,
        message: 'username and password are required',
      };
    }

    try {
      const user = UserModel.get(username);
      if (!user) {
        throw { status: 404, message: 'User not found' };
      }

      if (
        user.password &&
        typeof user.password === 'string' &&
        !bcrypt.compareSync(password, user.password)
      ) {
        throw { status: 400, message: 'Invalid credentials' };
      }

      const token = jwt.sign(
        { username: user.username },
        process.env.JWT_SECRET!,
        {
          expiresIn: '1h',
        },
      );

      return { id: user.id, username: user.username, token };
    } catch (e) {
      if (e instanceof Error) {
        throw Error(e.message);
      }
    }
  },
  signup(username: string, password: string) {
    if (!username || !password) {
      throw { status: 400, message: 'username and password are required' };
    }

    const saltRounds = 10;
    let hashedPassword = bcrypt.hashSync(password, saltRounds);
    UserModel.create(username, hashedPassword);
    const user = UserModel.get(username);
    if (!user) {
      throw Error('User creation failed');
    }
    const token = jwt.sign(user, process.env.JWT_SECRET!, { expiresIn: '1h' });
    return { ...user, token };
  },
};
