import bcrypt from 'bcryptjs';

import { User } from '../resources/user/user.model.js';
import { ForbiddenError, NotFoundError, UnauthorizedError } from './../api/errors/index.js';
import AuthService from './auth.service.js';

const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hashedPassword,
      role: 'user'
    });

    const token = AuthService.signToken(user);

    // Générer un refresh token
    // Sauvegarder le refresh token dans la base de données
    // Envoyer le refresh token au client dans un cookie

    /**
      res.cookie('token', token, {
        domain: process.env.COOKIES_DOMAIN,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 15 * 60 * 1000 // 15 minutes (to adapt vs the token expiration)
      });
    */

    res.status(201).json({ 
      user: { ...user.toObject(), password: undefined },
      token
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      throw new UnauthorizedError('Unauthorized');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      throw new ForbiddenError('Invalid credentials');
    }

    const token = AuthService.signToken(user);

    /**
      res.cookie('token', token, {
        domain: process.env.COOKIES_DOMAIN,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 15 * 60 * 1000 // 15 minutes (to adapt vs the token expiration)
      });
    */

    res.status(200).json({ 
      user: { ...user.toObject(), password: undefined },
      token 
    });
  } catch (error) {
    next(error);
  }
};

const me = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      throw new NotFoundError('User not found');
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export { register, login, me };