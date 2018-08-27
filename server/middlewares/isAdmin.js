const jwt = require('jsonwebtoken');

module.exports = function isAdmin(req, res, next) {
  const token = req.body.token || req.query.token ||
    req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, process.env.SECRET, (err, tokenContent) => {
      if (err) {
        return res.status(401)
          .json({ error: err.message });
      } else {
        req.tokenContent = tokenContent;
        next();
      }
    });
  } else {
    return res.status(401)
      .json({ error: err.message });
  }
}