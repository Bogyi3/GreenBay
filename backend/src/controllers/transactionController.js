import { transactionService } from '../services';

export const transactionController = {

  async buyItem(req, res, next) {
    try {
      const { itemId, buyer } = req.body;
      const itemData = await transactionService.buyItem(itemId, buyer);
      res.status(200).json(itemData);
    } catch (error) {
      next(error);
    }
  },
};
