const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    message: 'Title is required'
  },
  content: {
    type: String,
    required: true,
    message: 'Content is required'
  },
  createdBy: String,
  createdAt: String,
  updatedAt: String
},
{
  versionKey: false,
  timestamps: true
});

const Note = mongoose.model('Note', noteSchema );

module.exports = Note;