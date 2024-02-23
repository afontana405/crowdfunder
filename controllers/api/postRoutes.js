const router = require('express').Router();
const { Post } = require('../../models');
const { apiAuth } = require('../../utils/withAuth');

router.post('/', apiAuth, async (req, res) => {
    try {
        const postData = await Post.create({ 
            ...req.body,
            userId: req.session.user_id
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/:id', apiAuth, async (req, res) => {
    try {
        const postData = await Post.update(req.body,{
            where: {
                id: req.params.id
            }
        })
        if (!postData) {
            res.status(404).json({ message: 'No Post found to update' });
        }
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/:id', apiAuth, async (req, res) => {
    try {
        const postData = Post.destroy({
            where: {
                id: req.params.id,
            }
        })
        if (!postData) {
            res.status(404).json({ message: 'No post found by id'})
        }
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;

