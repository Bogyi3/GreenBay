import { usersRepo } from '../repositories';

export const usersService = {
  async getAllUsers() {
    return await usersRepo.getAllUsers();
  },

  async getUserByUsername(username) {
    if (!username) {
      throw { message: 'Username is required.', status: 400 };
    }

    const userData = await usersRepo.getUserByUsername(username);
    if (userData.results.length === 0) {
      throw { status: 404, message: 'Not found' };
    }
    return userData;
  },
};
