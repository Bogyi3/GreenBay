import { itemsService } from '..';
import { itemsRepo } from '../../repositories';

const database = {
  item1: {
    id: 1,
    itemName: 'Persepolis book',
    itemImg: 'https://images-na.ssl-images-amazon.com/images/I/81gx3hw9EEL.jpg',
    price: 28,
    description: 'Wise, funny, and heartbreaking, Persepolis is Marjane Satrapi’s memoir of growing up in Iran during the Islamic Revolution.',
    seller: 'Bogyi3',
    buyer: null,
  },
  item2: {
    id: 2,
    itemName: 'Pandemic boardgame',
    itemImg: 'https://cdn.vox-cdn.com/thumbor/uzLWgjTpGjMXWPKmTxny8mzQc5w=/1400x1050/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/19788611/pandemicboard.jpg',
    price: 28,
    description: 'Beat the pandemic in the Covid times. A fun boardgame for the family.',
    seller: 'Bogyi3',
    buyer: 'Mazsi',
  },
};

const spyOnGetAllSellableItems = jest.spyOn(itemsRepo, 'getAllSellableItems');
const spyOnGetSingleItem = jest.spyOn(itemsRepo, 'getSingleItem');
const spyOnCreateItem = jest.spyOn(itemsRepo, 'createItem');

test('should contain all sellable items', async () => {
  spyOnGetAllSellableItems.mockReturnValue({
    results: [database.item1],
  });
  const result = await itemsService.getAllSellableItems();
  expect(result).toEqual({
    results: [database.item1],
  });
});

test('should contain a single item', async () => {
  spyOnGetSingleItem.mockReturnValue({
    results: database.item1,
  });
  const result = await itemsService.getSingleItem(1);
  expect(result).toEqual({
    results: database.item1,
  });
});

test('should give back an error message if id is not a number', async () => {
  let errorMessage;
  try {
    await itemsService.getSingleItem('a');
  } catch (error) {
    errorMessage = error;
  }
  expect(errorMessage).toEqual({
    message: 'The request should only contain numbers',
    status: 400,
  });
});

test('should give back 404 if item doesn\'t exist', async () => {
  let errorMessage;
  spyOnGetSingleItem.mockReturnValue({ results: [] });

  try {
    await itemsService.getSingleItem(9999999);
  } catch (error) {
    errorMessage = error;
  }
  expect(errorMessage).toEqual({
    status: 404,
    message: 'Not found',
  });
});

test('should return success message & 201', async () => {
  spyOnCreateItem.mockReturnValue({
    results: 'somedata',
    message: 'Your item was added to sellable items.',
    status: 201,
  });
  const result = await itemsService.createItem({
    itemName: 'Headphone',
    itemImg: 'https://d2j6dbq0eux0bg.cloudfront.net/images/1107006/481998861.jpg',
    price: 39,
    description: 'High quality headphone for gamers.',
    seller: 'Mazsi',
  });
  expect(result.message).toBe('Your item was added to sellable items.');
  expect(result.status).toBe(201);
});

test('should return error message if a field is empty', async () => {
  let thrownError;
  try {
    await itemsService.createItem({
      itemName: 'Headphone',
      itemImg: 'https://d2j6dbq0eux0bg.cloudfront.net/images/1107006/481998861.jpg',
      price: 32,
      description: '',
      seller: 'Mazsi',
    });
  } catch (err) {
    thrownError = err;
  }
  expect(thrownError).toEqual({ message: 'All fields are required!', status: 400 });
});

test('should return error message if price is not a positive integer', async () => {
  let thrownError;
  try {
    await itemsService.createItem({
      itemName: 'Headphone',
      itemImg: 'https://d2j6dbq0eux0bg.cloudfront.net/images/1107006/481998861.jpg',
      price: 32.45,
      description: 'High quality headphone for gamers.',
      seller: 'Mazsi',
    });
  } catch (err) {
    thrownError = err;
  }
  expect(thrownError).toEqual({ message: 'The price must be a positive integer.', status: 400 });
});

test('should return error message if url format is not valid', async () => {
  let thrownError;
  try {
    await itemsService.createItem({
      itemName: 'Headphone',
      itemImg: 'invaliUrl',
      price: 32,
      description: 'High quality headphone for gamers.',
      seller: 'Mazsi',
    });
  } catch (err) {
    thrownError = err;
  }
  expect(thrownError).toEqual({ message: 'You must enter a valid url.', status: 400 });
});
