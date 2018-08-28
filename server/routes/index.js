const router = require('express').Router();
const isAdmin = require('../middlewares/isAdmin');
const userControoler = require('../controllers');

router.post('/login', userControoler.login);
router.post('/signup', userControoler.signup);
router.get('/getUsers', isAdmin, userControoler.getUsers);

module.exports = router;