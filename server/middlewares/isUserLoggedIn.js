const jwt = require('jsonwebtoken');

module.exports = function isUserLoggedIn(req, res, next) {
  let token = req.headers['authorization'] || req.body.token ||
    req.query.token || req.headers['x-access-token'];

  if (token) {
    if (token.startsWith('Bearer')) token = token.split('Bearer ')[1];

    jwt.verify(token, process.env.SECRET, (err, tokenContent) => {
      if (err) {
        return res.status(401)
          .json({ error: err.message });
      }
      req.tokenContent = tokenContent;
      next();
    });
  } else {
    return res.status(401)
      .json({ error: 'You are not logged in.' });
  }
}