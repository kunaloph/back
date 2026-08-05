const express = require('express');
const router = express.Router();
const posts = require('../controllers/postsController');

router.post('/', posts.createPost);
router.get('/', posts.getPosts);
// slug-based routes
router.get('/slug/:slug', posts.getPostBySlug);
router.put('/slug/:slug', posts.updatePostBySlug);
router.delete('/slug/:slug', posts.deletePostBySlug);

// id-based routes
router.get('/:id', posts.getPostById);
router.put('/:id', posts.updatePost);
router.delete('/:id', posts.deletePost);

module.exports = router;
