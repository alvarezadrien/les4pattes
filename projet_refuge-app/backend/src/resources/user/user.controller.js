import bcrypt from 'bcryptjs';

import { User } from './user.model.js';
import { NotFoundError } from '../../api/errors/index.js';

const findAll = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, search = '' } = req.query;

    const query = {
      $or: [
        { email: { $regex: search, $options: 'i' } },
      ]
    };

    const users = await User.find(query)
      .select('-password')
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await User.countDocuments(query);
    const totalPages = Math.ceil(total / limit);

    res.status(200).json({ data: users, metadata: { total, totalPages } });
  } catch (error) {
    next(error);
  }
};

const findOne = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password');

    if (!user) {
      throw new NotFoundError('User not found');
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { email, password, role } = req.body;
    const user = await User.findById(req.params.id);

    if (!user) {
      throw new NotFoundError('User not found');
    }

    const updateData = { email, role };

    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    ).select('-password');

    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      throw new NotFoundError('User not found');
    }

    await user.softDelete();
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export { findAll, findOne, update, remove }; 