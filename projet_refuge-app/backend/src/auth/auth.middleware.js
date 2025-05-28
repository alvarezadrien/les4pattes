import { User } from '../resources/user/user.model.js';
import { UnauthorizedError, ForbiddenError } from './../api/errors/index.js';
import AuthService from './auth.service.js';

export const authenticate = async (req, res, next) => {
  try {
    // Récupération du token dans le header Authorization : "Bearer <token>"
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedError('Token is required');
    }

    // Vérification du token
    const decoded = AuthService.verifyToken(token);

    // Recherche utilisateur
    const user = await User.findById(decoded._id);

    if (!user) {
      throw new UnauthorizedError('Unauthorized');
    }

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};

export const hasRole = (roles) => (req, res, next) => {
  if (!req.user) {
    throw new UnauthorizedError('Unauthorized');
  }

  if (!roles.includes(req.user.role)) {
    throw new ForbiddenError('Forbidden');
  }

  next();
};
