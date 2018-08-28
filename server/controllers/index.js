const User = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

function createToken(userdata) {
  return jwt.sign(userdata, process.env.SECRET, { expiresIn: '1d' });
}

function login(req, res) {
  const body = req.body;
  User.findOne({ email: body.email })
    .then(user => {
      if (bcrypt.compareSync(body.password, user.password)) {
        const data = user.toObject();
        delete data.password;
        const token = createToken({
          id: data._id,
          type: data.type,
        });
        res.send({ success: true, data, token });
      } else {
        res.send({ success: false, message: 'Invalid username or password.' });
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
      id: data._id,
      type: data.type,
    });
    res.send({ success: true, data, token });
  });
}

function confirmUser(req, res) {
  User.findById(req.tokenContent.id)
    .then(user => {
      const data = user.toObject();
      delete data.password;
      res.send({ success: true, data });
    })
    .catch(err => {
      return res.send({ error: err.message });
    });
}

function getUsers(req, res) {
  const { limit, skip } = buildPagination(req.query);
  const filters = buildFilters(req.query);

  User.find().where(filters).select('username email type').skip(skip).limit(limit)
    .then(users => {
      const count = 1 || User.countDocuments(filters);
      const page = skip / limit + 1 || 1;
      res.send(buildResponse(users, count, limit, page));
    })
    .catch(err => {
      return res.send({ error: err.message });
    });
}

function buildPagination(qs) {
  const query = {};
  let { per_page, page } = qs;
  if (!per_page) per_page = 1;

  if (per_page && !isNaN(per_page)) query.limit = parseInt(per_page, 10);
  if (page && !isNaN(page) && Number(page) > 0)
    query.skip = parseInt(Number(page) - 1, 10) * query.limit;
  return query;
}

function buildFilters(qs) {
  const query = {};
  const { type } = qs;
  if (type && ['Admin', 'User'].includes(type)) query.type = type;
  return query;
}

function buildResponse(users, total, limit, page) {
  return {
    success: true,
    total,
    per_page: limit,
    page,
    data: users,
  };
}


module.exports = {
  login,
  signup,
  getUsers,
  confirmUser,
}