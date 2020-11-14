import { db } from '../data/connection';

export const usersRepo = {
  async insertNewUser(username, firstName, lastName, email, hashedPassword) {
    const sql = 'INSERT INTO users (username, first_name, last_name, email, password_hash) VALUES (?, ?, ?, ?, ?);';
    return await db.query(sql, [username, firstName, lastName, email, hashedPassword]);
  },
  async updateUserType(userType, username) {
    const sql = 'UPDATE users SET user_type=? WHERE username=?';
    return await db.query(sql, [userType, username]);
  },
  async getUserByFirstName(firstName) {
    const sql = 'SELECT id, username, first_name as firstName, last_name as lastName, email, user_type as userType, profile_img as profileImg, money FROM users WHERE full_name=?;';
    return await db.query(sql, [firstName]);
  },
  async getUserByEmail(email) {
    const sql = 'SELECT id, username, first_name as firstName, last_name as lastName, email, user_type as userType, profile_img as profileImg, money FROM users WHERE email=?;';
    return await db.query(sql, [email]);
  },
  async getUserByUsername(username) {
    const sql = 'SELECT id, username, first_name as firstName, last_name as lastName, email, user_type as userType, profile_img as profileImg, money FROM users WHERE username=?;';
    return await db.query(sql, [username]);
  },
  async getPassword(username) {
    const sql = 'SELECT password_hash AS passwordHash FROM users WHERE username=?;';
    return await db.query(sql, [username]);
  },
  async getAllUsers() {
    const sql = 'SELECT id, username, first_name as firstName, last_name as lastName, email, user_type as userType, profile_img as profileImg, money FROM users;';
    return await db.query(sql, []);
  },
};
