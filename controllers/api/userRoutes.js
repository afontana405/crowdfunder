const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {
    try {
        const userData = await User.create(req.body);
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.username = userData.username;
            req.session.logged_in = true;
        });
        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({
            where: { username: req.body.username }
        });

        if (!userData) {
            res.status(404).json({ message: 'Invalid username or password' });
        }
        const validatePassword = userData.checkPassword(req.body.password);
        if (!validatePassword) {
            res.status(404).json({ message: 'Invalid username or password' });
        }
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.username = userData.username;
            req.session.logged_in = true;
      
            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(500).json(err);
    }
});