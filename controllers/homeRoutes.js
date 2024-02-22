const router = require('express').Router();
const { Comment, Post, User } = require('../models');
const { withoutAuth, withAuth } = require('../utils/withAuth');

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll();
        if (!postData) {
            res.status(404).json('404 Not Found');
        }
        res.render('post', postData);
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