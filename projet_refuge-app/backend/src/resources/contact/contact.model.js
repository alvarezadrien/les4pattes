import mongoose, { Schema } from 'mongoose';

export const LIST = {
  BLACKLIST: 'Blacklist',
  FAMILY: 'Family',
  FRIENDS: 'Friends',
  WORK: 'Work'
};

/**
 * Contact Model
 */
const schema = new Schema({
  name: {
    type : String,
    required: 'Name is required',
    maxLength: [50, 'Name must be less than 50 characters']
  },
  phone: {
    type: String,
    required: 'Phone is required',
    maxLength: [20, 'Phone must be less than 20 characters']
  },
  email: {
    type: String,
    required: 'Email is required',
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email address'],
    maxLength: [50, 'Email must be less than 50 characters']
  },
  avatar: {
    type: String,
  },
  list: {
    type: String,
    enum: Object.values(LIST),
    required: false
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: null
  },
  deletedAt: {
    type: Date,
    default: null
  }
});

schema.index({ deletedAt: 1 });

schema.pre('find', function() {
  this.where({ deletedAt: null });
});

schema.pre('findOne', function() {
  this.where({ deletedAt: null });
});

schema.pre('findOneAndUpdate', function() {
  this.where({ deletedAt: null });
  this.set({ updatedAt: new Date() });
});

export const Contact = mongoose.model('Contact', schema);
