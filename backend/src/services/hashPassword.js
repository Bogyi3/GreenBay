import bcrypt from 'bcrypt';

function hashPassword(password, rounds) {
  const hashedPassword = bcrypt.hashSync(password, rounds);
  return hashedPassword;
}

module.exports = hashPassword;
