import jwt from 'jsonwebtoken';
import { config } from './../api/config/env.config.js';

class AuthService {
  constructor(config) {
    const { secret, tokenExpiration } = config;
    this.secret = secret;
    this.tokenExpiration = tokenExpiration;
  }

  signToken(user) {
    return jwt.sign({ _id: user._id }, this.secret, { expiresIn: this.tokenExpiration });
  }

  verifyToken(token) {
    return jwt.verify(token, this.secret);
  }
};

export default new AuthService(config);

