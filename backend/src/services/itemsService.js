import { itemsRepo } from '../repositories';

export const itemsService = {
  async getAllItems() {
    return await itemsRepo.getAllItems();
  },

  async getAllSellableItems() {
    return await itemsRepo.getAllSellableItems();
  },

  async getSingleItem(itemId) {
    if (!itemId) {
      throw { message: 'Item id is required.', status: 400 };
    }
    const numsOnly = /^\d+$/;

    if (!numsOnly.test(itemId)) {
      throw { message: 'The request should only contain numbers', status: 400 };
    }
    const itemData = await itemsRepo.getSingleItem(itemId);
    if (itemData.results.length === 0) {
      throw { status: 404, message: 'Not found' };
    }
    return itemData;
  },

  async createItem(itemParams) {
    const {
      itemName, itemImg, price, description,
    } = itemParams;
    if (!itemName || !itemImg || !price || !description) {
      throw { message: 'All fields are required!', status: 400 };
    }

    const numsOnly = /^\d+$/;
    if (!numsOnly.test(price) || price < 1) {
      throw { message: 'The price must be a positive integer.', status: 400 };
    }

    // eslint-disable-next-line no-useless-escape
    const validUrl = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/;
    if (!validUrl.test(itemImg)) {
      throw { message: 'You must enter a valid url.', status: 400 };
    }

    const created = await itemsRepo.createItem(itemParams);
    const itemId = created.results.insertId;
    const newItemData = await itemsRepo.getSingleItem(itemId);

    return { itemData: newItemData.results, message: 'Your item was added to sellable items.', status: 201 };
  },

};
