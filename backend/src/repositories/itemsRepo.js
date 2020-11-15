import { db } from '../data/connection';

export const itemsRepo = {

  async getAllItems() {
    const sql = 'SELECT id, item_name as itemName, item_img as itemImg, price, description, seller, buyer FROM items';
    return await db.query(sql, []);
  },

  async getAllSellableItems() {
    const sql = 'SELECT id, item_name as itemName, item_img as itemImg, price, description, seller FROM items WHERE buyer IS NULL';
    return await db.query(sql, []);
  },

  async getSingleItem(itemId) {
    const sql = 'SELECT id, item_name as itemName, item_img as itemImg, price, description, seller, buyer FROM items WHERE id=?;';
    return await db.query(sql, [itemId]);
  },

  async addBuyerToItem(buyer, itemId) {
    const sql = 'UPDATE items SET buyer = ? WHERE id = ?';
    return await db.query(sql, [buyer, itemId]);
  },

  async createItem(itemParams) {
    const sql = 'INSERT INTO items (item_name, item_img, price, description, seller) VALUES (?, ?, ?, ?, ?);';
    return await db.query(sql,
      [itemParams.itemName,
        itemParams.itemImg,
        itemParams.price,
        itemParams.description,
        itemParams.seller,
      ]);
  },
};
