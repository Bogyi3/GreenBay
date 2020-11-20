import request from 'supertest';
import jwt from 'jsonwebtoken';
import { itemsRepo } from '../../repositories';
import app from '../../app';
import config from '../../config';

config.secret = 'myLittleSecret';

const myToken = jwt.sign({ id: 1234, username: 'Mazsi', userType: 'admin' }, config.secret);

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
    buyer: null,
  },
};

const spyOnGetSingleItem = jest.spyOn(itemsRepo, 'getSingleItem');
const spyOngetAllSellableItems = jest.spyOn(itemsRepo, 'getAllSellableItems');
const spyOnCreateItem = jest.spyOn(itemsRepo, 'createItem');

describe('GET /api/item/sellable/all', () => {
  it('should return all the sellable items', (done) => {
    spyOngetAllSellableItems.mockReturnValue({
      results: [database.item1, database.item2],
    });
    request(app)
      .get('/api/item/sellable/all')
      .set('Authorization', `Bearer ${myToken}`)
      .expect(200)
      .end((err, res) => {
        expect(res.body.results).toEqual([database.item1, database.item2]);

        if (err) return done(err);

        return done();
      });
  });
});

describe('GET /api/item/1', () => {
  it('should return the first item', (done) => {
    spyOnGetSingleItem.mockReturnValue({
      results: database.item1,
    });
    request(app)
      .get('/api/item/1')
      .set('Authorization', `Bearer ${myToken}`)
      .expect(200)
      .end((err, res) => {
        expect(res.body.results).toEqual(database.item1);

        if (err) return done(err);

        return done();
      });
  });
});

describe('POST /api/item/new', () => {
  it('should return a 201 status ', (done) => {
    spyOnCreateItem.mockReturnValue({
      results: [database.item2],
      fields: 'somedata',
    });

    request(app)
      .post('/api/item/new')
      .set('Accept', 'application/json')
      .send({
        itemParams: {
          itemName: database.item2.itemName,
          itemImg: database.item2.itemImg,
          price: database.item2.price,
          description: database.item2.description,
          seller: database.item2.seller,
        },
      })
      .set('Authorization', `Bearer ${myToken}`)
      .expect('Content-Type', /json/)
      .expect(201)
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });
});

describe('POST /api/item/new', () => {
  it('should return a 400 status due to missing field', (done) => {
    spyOnCreateItem.mockReturnValue({
      results: [database.item2],
      fields: 'somedata',
    });

    request(app)
      .post('/api/item/new')
      .set('Accept', 'application/json')
      .send({
        itemParams: {
          itemName: database.item2.itemName,
          itemImg: '',
          price: database.item2.price,
          description: database.item2.description,
          seller: database.item2.seller,
        },
      })
      .set('Authorization', `Bearer ${myToken}`)
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });
});

describe('POST /api/item/new', () => {
  it('should return a 400 status due to invalid url', (done) => {
    spyOnCreateItem.mockReturnValue({
      message: 'You must enter a valid url.',
      status: 400,
    });

    request(app)
      .post('/api/item/new')
      .set('Accept', 'application/json')
      .send({
        itemParams: {
          itemName: database.item2.itemName,
          itemImg: database.item2.itemImg,
          price: 'price',
          description: database.item2.description,
          seller: database.item2.seller,
        },
      })
      .set('Authorization', `Bearer ${myToken}`)
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });
});
