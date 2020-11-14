import { registrationService } from '../services';

export const registrationController = {
  async post(req, res, next) {
    try {
      const {
        username, firstName, lastName, email, password,
      } = req.body;
      await registrationService.validateUser(
        username, firstName, lastName, email, password,
      );
      const registration = await registrationService.insertNewUser(
        username, firstName, lastName, email, password,
      );
      res.status(201).json(registration);
    } catch (error) {
      next(error);
    }
  },
};
