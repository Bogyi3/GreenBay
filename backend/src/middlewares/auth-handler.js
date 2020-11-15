import jwt from 'jsonwebtoken';
import config from '../config';

export default async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      throw { status: 401, message: 'Please, sign in to continue.' };
    }
    const token = req.headers.authorization.split(' ')[1];
    const verified = jwt.verify(token, config.secret, { algorithms: ['HS256'] });
    req.user = verified;
    next();
  } catch (err) {
    next(err);
  }
};
