import { itemsRepo, usersRepo } from '../repositories';

export const transactionService = {

  async buyItem(itemId, buyer) {
    const itemExists = await itemsRepo.getSingleItem(itemId);
    if (itemExists.results.length === 0) {
      throw { status: 404, message: 'Not found' };
    }
    if (itemExists.results[0].buyer) {
      throw { status: 403, message: 'Sorry, but this item is no longer for sale.' };
    }
    if (itemExists.results[0].seller === buyer) {
      throw { status: 403, message: 'You cannot buy your own item, silly.' };
    }

    const hasEnoughMoney = await usersRepo.checkIfEnoughMoney(buyer, itemExists.results[0].price);
    if (hasEnoughMoney.results.length === 0) {
      throw { status: 403, message: 'Sorry, you don\'t have enough money to buy this item.' };
    }

    await itemsRepo.addBuyerToItem(buyer, itemId);
    await usersRepo.subtractPrice(buyer, itemExists.results[0].price);
    await usersRepo.addPrice(itemExists.results[0].seller, itemExists.results[0].price);
    const itemData = await itemsRepo.getSingleItem(itemId);
    return itemData;
  },
};
