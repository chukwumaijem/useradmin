const User = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

function createToken(userdata) {
  return jwt.sign(userdata, process.env.SECRET, { expiresIn: 60 });
}

function login(req, res) {
  const body = req.body;
  User.findOne({ email: body.email })
    .then(user => {
      if (bcrypt.compareSync(body.password, user.password)) {
        const data = user.toObject();
        delete data.password;
        const token = createToken({
          id: data.id,
          type: data.type,
        });
        res.send({ success: true, data, token });
      } else {
        res.send({ success: false, message: 'Inavlid username or password.' });
      }
    })
    .catch(err => {
      return res.send({ error: err.message });
    });
}

function signup(req, res) {
  const body = req.body;
  const user = new User(body);
  user.save(function (err, newUser) {
    if (err) {
      return res.send({ error: err.message });
    }
    const data = newUser.toObject();
    delete data.password;

    const token = createToken({
      id: data.id,
      type: data.type,
    });
    res.send({ success: true, data, token });
  });
}

function getUsers() {
  const query = {};
  User.find(query).select('username email')
    .then(users => {
      res.send({ page: 1, total: users.length, data: users, success: true, });
    })
    .catch(err => {
      return res.send({ error: err.message });
    });
}

module.exports = {
  login,
  signup,
  getUsers,
}