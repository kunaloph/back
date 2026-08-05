const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true, trim: true },
    description: { type: String },
    author: { type: String, default: 'Admin' },
    category: { type: String, default: 'Blog' },
    image: { type: String, default: '/images/blog.png' },
    content: { type: [String], default: [] },
    readTime: { type: String },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Post', PostSchema);
