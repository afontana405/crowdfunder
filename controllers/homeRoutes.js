const router = require('express').Router();
const { Comment, Post, User } = require('../models');
const { withoutAuth, withAuth } = require('../utils/withAuth');

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll();
        if (!postData) {
            res.status(404).json({ message: 'no posts found'});
        }
        res.render('post', postData);
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/post/:id', withAuth, async (req, res) => {
    try {
        postData = await Post.findByPk(req.params.id)
        if (!postData) {
            res.status(404).json({ message: "post not found"});
        }
        res.render(postData);
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/login', (req,res) => {
    try {
        res.render('login');
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/signup', (req,res) => {
    try {
        res.render('signup');
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;