import { sessionsService } from '../services';

export const sessionsController = {
  async post(req, res, next) {
    try {
      const returnData = await sessionsService.getToken(req.body.username, req.body.password);
      res.status(200).json(returnData);
    } catch (error) {
      next(error);
    }
  },

};
