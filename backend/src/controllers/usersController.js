import { usersService } from '../services';

export const usersController = {

  async getAllUsers(req, res, next) {
    try {
      const allUsers = await usersService.getAllUsers();
      res.status(200).json(allUsers);
    } catch (error) {
      next(error);
    }
  },

  async getUserByUsername(req, res, next) {
    try {
      const { username } = req.params;
      const userData = await usersService.getUserByUsername(username);
      res.status(200).json(userData);
    } catch (error) {
      next(error);
    }
  },
};
