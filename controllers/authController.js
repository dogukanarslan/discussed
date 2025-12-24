import {UserService} from '../services/UserService.js';

const users = [];

export const signin = (req, res, next) => {
  const {username, password} = req.body;

  try {
    const io = req.app.get('socketio');
    const user = UserService.signin(username, password);
    res.cookie('jwt', user.token);
    io.emit('message', {new_user: user.username});
    io.emit('connectedUsers', users);
    users.push(user);

    return res.status(200).json(user);
  } catch (e) {
    throw {message: e.message};
  }
};

export const signup = (req, res, next) => {
  try {
    const {username, password} = req.body;

    const user = UserService.signup(username, password);
    res.cookie('jwt', user.token);
    res.status(201).json({id: user.id, username: user.username});
  } catch (e) {
    if (e.errcode === 2067) {
      return next({status: 409, message: 'Username already exists'});
    }

    return next(e);
  }
};

export const getConnectedUsers = (req, res, next) => {
  try {
    res.status(200).json(users);
  } catch (e) {
    return next(e);
  }
};
