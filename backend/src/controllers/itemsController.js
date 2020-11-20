import { itemsService } from '../services';

export const itemsController = {

  async getAllItems(req, res, next) {
    try {
      const allItems = await itemsService.getAllItems();
      res.status(200).json(allItems);
    } catch (error) {
      next(error);
    }
  },

  async getAllSellableItems(req, res, next) {
    try {
      const allSellableItems = await itemsService.getAllSellableItems();
      res.status(200).json(allSellableItems);
    } catch (error) {
      next(error);
    }
  },

  async getSingleItem(req, res, next) {
    try {
      const { itemId } = req.params;
      const item = await itemsService.getSingleItem(itemId);
      res.status(200).json(item);
    } catch (error) {
      next(error);
    }
  },

  async createItem(req, res, next) {
    try {
      const { itemParams } = req.body;
      const response = await itemsService.createItem(itemParams);
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  },
};
