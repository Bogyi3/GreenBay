import { usersService } from '../usersService';
import { usersRepo } from '../../repositories';

const database = {
  user1: {
    id: 1,
    username: 'BookWorm',
    firstName: 'Hermione',
    lastName: 'Granger',
    email: 'knowitall@mail.com',
    passwordHash: '$2b$10$m1uDRSCD/7FqsWRuZjhq1.gPGKLNEHKmmUaCTlLcY8NHnlDtvUyAS',
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

test('username is missing - error message', async () => {
  let thrownError;
  try {
    await usersService.getUserByUsername('');
  } catch (err) {
    thrownError = err;
  }
  expect(thrownError).toEqual({ message: 'Username is required.', status: 400 });
});

test('should give back 404 if username is not in database', async () => {
  let errorMessage;
  spyOnGetUserByUsername.mockReturnValue({ results: [] });
  try {
    await usersService.getUserByUsername('Anthony');
  } catch (error) {
    errorMessage = error;
  }
  expect(errorMessage).toEqual({
    status: 404,
    message: 'Not found',
  });
});

test('should give back userdata', async () => {
  spyOnGetUserByUsername.mockReturnValue({
    results: database.user1,
  });
  const result = await usersService.getUserByUsername('Bookworm');
  expect(result).toEqual({
    results: database.user1,
  });
});
