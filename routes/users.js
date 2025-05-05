const router = require('express').Router();
const {
  getUsers,
  getUserById,
  getMe,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:userId', getUserById);
router.get('/me', getMe);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateAvatar);

module.exports = router;
