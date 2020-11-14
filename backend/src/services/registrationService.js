import { usersRepo } from '../repositories';
import hashPassword from './hashPassword';

export const registrationService = {

  async insertNewUser(username, firstName, lastName, email, password) {
    const hashedPassword = hashPassword(password, 10);
    await usersRepo.insertNewUser(username, firstName, lastName, email, hashedPassword);
    return {
      message: 'Successful registration. User was added to database.',
    };
  },

  async validateUsername(username) {
    const usernameFormat = /^[a-zA-Z0-9]*$/i;
    if (!username) {
      throw {
        message: 'Username is required.',
        status: 400,
      };
    }
    if (!usernameFormat.test(String(username))) {
      throw {
        message:
          'Alphanumeric only!',
        status: 400,
      };
    }
    const selectedUsername = await usersRepo.getUserByUsername(username);
    if (selectedUsername.results.length !== 0) {
      throw {
        message: 'Username is already in use. Try something else.',
        status: 400,
      };
    }
  },

  async validateFirstName(firstName) {
    const firstNameFormat = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/;
    if (!firstName) {
      throw {
        message: 'First name is required.',
        status: 400,
      };
    }
    if (!firstNameFormat.test(String(firstName))) {
      throw {
        message: 'First name is invalid.',
        status: 400,
      };
    }
  },

  async validateLastName(lastName) {
    const lastNameFormat = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/;
    if (!lastName) {
      throw {
        message: 'Last name is required.',
        status: 400,
      };
    }
    if (!lastNameFormat.test(String(lastName))) {
      throw {
        message: 'Last name is invalid.',
        status: 400,
      };
    }
  },

  async validateEmail(email) {
    const emailFormat = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (!email) {
      throw {
        message: 'E-mail is required.',
        status: 400,
      };
    }
    if (!emailFormat.test(String(email).toLowerCase())) {
      throw {
        message: 'E-mail should follow this format: example@mail.com.',
        status: 400,
      };
    }
    const selectedEmail = await usersRepo.getUserByEmail(email);
    if (selectedEmail.results.length !== 0) {
      throw {
        message: 'E-mail is already in use.',
        status: 400,
      };
    }
  },

  validatePassword(password) {
    if (!password) {
      throw {
        message: 'Password field is missing.',
        status: 400,
      };
    }
    if (password.length < 6) {
      throw {
        message: 'Password is too short. Minimum 6 characters.',
        status: 400,
      };
    }
    const weakPasswordFormat = /^[a-z]+$/;
    if (weakPasswordFormat.test(String(password))) {
      throw {
        message:
          'Password too weak. Add at least one capital letter, number or symbol.',
        status: 400,
      };
    }
  },

  async validateUser(username, firstName, lastName, email, password) {
    await this.validateUsername(username);
    await this.validateFirstName(firstName);
    await this.validateLastName(lastName);
    await this.validateEmail(email);
    await this.validatePassword(password);
  },
};
