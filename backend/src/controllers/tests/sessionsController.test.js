import request from 'supertest';
import app from '../../app';
import { usersRepo } from '../../repositories/usersRepo';

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

describe('POST /api/sessions', () => {
  it('responds with json that holds token', (done) => {
    const spyOnGetUserByUserName = jest.spyOn(usersRepo, 'getUserByUsername');
    spyOnGetUserByUserName.mockReturnValue({
      results:
      [database.user1],
    });
    const spyOnGetPassword = jest.spyOn(usersRepo, 'getPassword');
    spyOnGetPassword.mockReturnValue({
      results:
      [database.user1],
    });

    request(app)
      .post('/api/sessions')
      .send({ username: database.user1.username, password: 'password1' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err) => {
        if (err) { return done(err); }
        return done();
      });
  });
});

describe('POST /api/sessions', () => {
  it('invalid login due to empty field', (done) => {
    const spyOnGetUserByUserName = jest.spyOn(usersRepo, 'getUserByUsername');
    spyOnGetUserByUserName.mockReturnValue({});

    request(app)
      .post('/api/sessions')
      .send({ username: '', password: 'password1' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err) => {
        if (err) { return done(err); }
        return done();
      });
  });
});

describe('POST /api/sessions', () => {
  it('invalid login due to incorrect password', (done) => {
    const spyOnGetUserByUserName = jest.spyOn(usersRepo, 'getUserByUsername');
    spyOnGetUserByUserName.mockReturnValue({
      results:
      [database.user1],
    });
    const spyOnGetPassword = jest.spyOn(usersRepo, 'getPassword');
    spyOnGetPassword.mockReturnValue({
      results:
      [database.user1],
    });

    request(app)
      .post('/api/sessions')
      .send({ username: database.user1.username, password: 'incorrectPassword' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err) => {
        if (err) { return done(err); }
        return done();
      });
  });
});
