const router = require('express').Router();
const isAdmin = require('../middlewares/isAdmin');
const isUserLoggedIn = require('../middlewares/isUserLoggedIn');
const userControoler = require('../controllers');

router.post('/login', userControoler.login);
router.post('/signup', userControoler.signup);
router.get('/get-users', isAdmin, userControoler.getUsers);

router.get('/confirm-user', isUserLoggedIn, userControoler.confirmUser);

router.put('/update-user', isAdmin, userControoler.updateUser);
router.delete('/delete-user', isAdmin, userControoler.deleteUser);

module.exports = router;