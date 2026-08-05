const Post = require('../models/Post');

function makeSlug(input) {
  if (!input) return `post-${Date.now()}`;
  return (
    input
      .toString()
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') +
    `-${Date.now()}`
  );
}

function estimateReadTime(contentArray) {
  const text = (contentArray || []).join(' ');
  const words = text.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

exports.createPost = async (req, res) => {
  try {
    const body = req.body || {};
    const slug = body.slug || makeSlug(body.title || 'post');
    const content = Array.isArray(body.content) ? body.content : [];

    const post = new Post({
      slug,
      title: body.title,
      description: body.description,
      author: body.author,
      category: body.category,
      image: body.image,
      content,
      readTime: estimateReadTime(content),
      date: body.date || Date.now(),
    });

    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPostBySlug = async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug });
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const body = req.body || {};
    const update = { ...body };
    if (update.content) update.readTime = estimateReadTime(update.content);

    const post = await Post.findByIdAndUpdate(req.params.id, update, {
      new: true,
      runValidators: true,
    });
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updatePostBySlug = async (req, res) => {
  try {
    const body = req.body || {};
    const update = { ...body };
    if (update.content) update.readTime = estimateReadTime(update.content);

    const post = await Post.findOneAndUpdate({ slug: req.params.slug }, update, {
      new: true,
      runValidators: true,
    });
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json({ message: 'Post deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deletePostBySlug = async (req, res) => {
  try {
    const post = await Post.findOneAndDelete({ slug: req.params.slug });
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json({ message: 'Post deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
