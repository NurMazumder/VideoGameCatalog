const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');

router.post('/', auth, async (req, res) => {
  try {
    const userId = req.user.id;

    const { gameId } = req.body;

    const user = await User.findById(userId);

    if (user.wishlist.includes(gameId)) {
      return res.status(400).json({ msg: 'Game already in wishlist' });
    }

    user.wishlist.push(gameId);

    await user.save();

    res.json({ msg: 'Game added to wishlist successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/retrieve', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    const wishlist = user.wishlist;

    res.json(wishlist);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;