const router = require('express').Router();
const { Comment } = require('../../models');
const { apiAuth } = require('../../utils/withAuth');

router.post('/', apiAuth, async (req, res) => {
    try {
        const commentData = await Comment.create({
            ...req.body,
            userId: req.session.user_id,
        });
        res.json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;