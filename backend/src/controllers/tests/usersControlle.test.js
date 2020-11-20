import request from 'supertest';
import jwt from 'jsonwebtoken';
import { usersRepo } from '../../repositories';
import app from '../../app';
import config from '../../config';

config.secret = 'myLittleSecret';

const myToken = jwt.sign({ id: 1234, username: 'Mazsi', userType: 'admin' }, config.secret);

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

const spyOnGetUserByUsername = jest.spyOn(usersRepo, 'getUserByUsername');

describe('GET /api/user/MoonGirl', () => {
  it('should return the user with the username MoonGirl', (done) => {
    spyOnGetUserByUsername.mockReturnValue({
      results: database.user2,
    });
    request(app)
      .get('/api/user/MoonGirl')
      .set('Authorization', `Bearer ${myToken}`)
      .expect(200)
      .end((err, res) => {
        expect(res.body.results).toEqual(database.user2);

        if (err) return done(err);

        return done();
      });
  });
});
