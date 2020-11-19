import { usersRepo } from '../../repositories';
import { sessionsService } from '../sessionsService';

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
const spyOnGetPassword = jest.spyOn(usersRepo, 'getPassword');

test('should return 200 with matching username & password', async () => {
  spyOnGetUserByUsername.mockReturnValue({
    results:
      [database.user1],
  });
  spyOnGetPassword.mockReturnValue({
    results:
    [database.user1],
  });
  await sessionsService.getToken(database.user1.username, 'password1');
  expect(200);
});

test('should give an error if user doesn\'t exist', async () => {
  spyOnGetUserByUsername.mockReturnValue({ results: [] });
  try {
    await sessionsService.getToken('notUser', 'password34');
  } catch (e) {
    expect(e).toEqual({
      message: 'No such user!',
      status: 400,
    });
  }
});

test('should give an error if username and password don\'t match', async () => {
  spyOnGetUserByUsername.mockReturnValue({
    results:
    [database.user1],
  });
  spyOnGetPassword.mockReturnValue({ results: [{ passwordHash: 'notMatching' }] });
  try {
    await sessionsService.getToken(database.user1.username, 'incorrectPassword');
  } catch (e) {
    expect(e).toEqual({
      message: 'Username and password do not match!',
      status: 400,
    });
  }
});
