import { Contact } from './contact.model.js';
import { NotFoundError } from '../../api/errors/index.js';

export const createContact = async (req, res, next) => {
  try {
    const file = req.file;
    const { name, email, phone, list } = req.body;
    const contact = await Contact.create({ name, email, phone, avatar: file?.filename || null, list, owner: req.user._id });
    res.status(201).json(contact);
  } catch (error) {
    next(error);
  }
};

export const getContacts = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, search = '' } = req.query;

    const query = {
      $or: [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } }
      ],
      $and: [
        { owner: req.user._id }
      ]
    };

    const contacts = await Contact.find(query)
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Contact.countDocuments(query);
    const currentPage = parseInt(page);
    const totalPages = Math.ceil(total / limit);
    const nextPage = currentPage < totalPages ? currentPage + 1 : null;

    res.status(200).json({ data: contacts, metadata: { total, totalPages, currentPage, nextPage } });
  } catch (error) {
    next(error);
  }
};

export const getContactById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findOne({
      _id: id,
      owner: req.user._id,
    });

    if (!contact) {
      throw new NotFoundError('Contact not found');
    }
    
    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const filename = req.file?.filename || undefined;
    const { name, email, phone, list } = req.body;

    const contact = await Contact.findOneAndUpdate(
      { _id: id, owner: req.user._id },
      { name, email, phone, avatar: filename, list },
      { new: true }
    );

    if (!contact) {
      throw new NotFoundError('Contact not found');
    }

    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    await Contact.findOneAndUpdate(
      { _id: id, owner: req.user._id },
      { deletedAt: new Date() }
    );

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
