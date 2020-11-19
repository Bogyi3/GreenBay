import { registrationService } from '../registrationService';
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
const spyOnGetUserByEmail = jest.spyOn(usersRepo, 'getUserByEmail');

test('username is missing - error message', async () => {
  let thrownError;
  try {
    await registrationService.validateUsername(undefined);
  } catch (err) {
    thrownError = err;
  }
  expect(thrownError).toEqual({ message: 'Username is required.', status: 400 });
});

test('invalid username format - error message', async () => {
  let thrownError;
  try {
    await registrationService.validateUsername('Smiley:)');
  } catch (err) {
    thrownError = err;
  }
  expect(thrownError).toEqual({ message: 'Alphanumeric only!', status: 400 });
});

test('username already in use', async () => {
  let thrownError;
  spyOnGetUserByUsername.mockReturnValue({ results: database.user2, fields: 'somedata' });
  try {
    await registrationService.validateUsername('MoonGirl');
  } catch (err) {
    thrownError = err;
  }
  expect(thrownError).toEqual({ message: 'Username is already in use. Try something else.', status: 400 });
});

test('email already in use', async () => {
  let thrownError;
  spyOnGetUserByEmail.mockReturnValue({ results: database.user1, fields: 'somedata' });
  try {
    await registrationService.validateEmail('knowitall@mail.com');
  } catch (err) {
    thrownError = err;
  }
  expect(thrownError).toEqual({ message: 'E-mail is already in use.', status: 400 });
});

test('wrong email format', async () => {
  let thrownError;
  spyOnGetUserByEmail.mockReturnValue({ results: [], fields: 'somedata' });
  try {
    await registrationService.validateEmail('notanemail');
  } catch (err) {
    thrownError = err;
  }
  expect(thrownError).toEqual({ message: 'E-mail should follow this format: example@mail.com.', status: 400 });
});

test('password too short', async () => {
  let thrownError;
  try {
    await registrationService.validatePassword('short');
  } catch (err) {
    thrownError = err;
  }
  expect(thrownError).toEqual({ message: 'Password is too short. Minimum 6 characters.', status: 400 });
});
