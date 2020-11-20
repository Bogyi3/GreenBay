import request from 'supertest';
import app from '../../app';
import { usersRepo } from '../../repositories';
import config from '../../config';

config.secret = 'myLittleSecret';

const database = {
  user1: {
    id: 1,
    username: 'BookWorm',
    firstName: 'Hermione',
    lastName: 'Granger',
    email: 'knowitall@mail.com',
    passwordHash: '$2b$10$mEn3S1wXDeormso1Yyc0VuC51yWcoXrE2p8hdy/oQdPCUKNbMtKYy',
    money: 100,
    profileImg: 'https://static.wikia.nocookie.net/characters/images/a/a5/Latest_%2810%29.jpg/revision/latest?cb=20141230074301',
    userType: 'student',
  },
  user2: {
    id: 2,
    username: 'MoonGirl',
    firstName: 'Luna',
    lastName: 'Lovegood',
    email: 'friends4ever@mail.com',
    passwordHash: '$2b$10$m1uDRSCD/7FqsWRuZjhq1.gPGKLNEHKmmUaCTlLcY8NHnlDtvUyAS',
    money: 73,
    profileImg: 'https://images.ctfassets.net/usf1vwtuqyxm/Mam68Vfou2OO6kqEcyW8W/41657e4dbb7d42d2cab591276105bcc1/LunaLovegood_WB_F6_LunaLovegoodInQuibblerSpecsOnHogwartsExpress_Still_080615_Port.jpg?w=914',
    userType: 'student',
  },
};

const getUserByUsername = jest.spyOn(usersRepo, 'getUserByUsername');
const getUserByEmail = jest.spyOn(usersRepo, 'getUserByEmail');
const insertNewUser = jest.spyOn(usersRepo, 'insertNewUser');

describe('POST /api/registration', () => {
  it('valid registration', (done) => {
    getUserByUsername.mockReturnValue({ results: [], fields: 'somedata' });
    getUserByEmail.mockReturnValueOnce({ results: [], fields: 'somedata' }).mockReturnValueOnce({ results: [database.user4], fields: 'somedata' });
    insertNewUser.mockReturnValue({ results: [], fields: 'somedata' });

    request(app)
      .post('/api/registration')
      .set('Accept', 'application/json')
      .send({
        username: 'Sevy',
        firstName: 'Severus',
        lastName: 'Snape',
        email: 'sevvy@sevvymail.com',
        password: 'felixFelicis8',
      })
      .expect('Content-Type', /json/)
      .expect(201)
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });
});

describe('POST /api/registration', () => {
  it('invalid registration due to empty field', (done) => {
    getUserByUsername.mockReturnValue({ results: [], fields: 'somedata' });
    getUserByEmail.mockReturnValue({ results: [], fields: 'somedata' });

    request(app)
      .post('/api/registration')
      .set('Accept', 'application/json')
      .send({
        username: 'Sevy',
        firstName: '',
        lastName: 'Snape',
        email: 'sevvy@sevvymail.com',
        password: 'felixFelicis8',
      })
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });
});

describe('POST /api/registration', () => {
  it('invalid registration: user error (username already in use)', (done) => {
    getUserByUsername.mockReturnValue({
      results: database.user2,
      fields: 'somedata',
    });
    getUserByEmail.mockReturnValue({ results: [], fields: 'somedata' });

    request(app)
      .post('/api/registration')
      .set('Accept', 'application/json')
      .send({
        username: 'BookWorm',
        firstName: 'Severus',
        lastName: 'Snape',
        email: 'sevvy@sevvymail.com',
        password: 'felixFelicis8',
      })
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });
});
