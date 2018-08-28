const router = require('express').Router();
const isAdmin = require('../middlewares/isAdmin');
const isUserLoggedIn = require('../middlewares/isUserLoggedIn');
const userControoler = require('../controllers');

router.post('/login', userControoler.login);
router.post('/signup', userControoler.signup);
router.get('/getUsers', isAdmin, userControoler.getUsers);

router.get('/confirm-user', isUserLoggedIn, userControoler.confirmUser);

module.exports = router;