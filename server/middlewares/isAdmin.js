const jwt = require('jsonwebtoken');

module.exports = function isAdmin(req, res, next) {
  let token = req.headers['authorization'] || req.body.token ||
    req.query.token || req.headers['x-access-token'];

  if (token) {
    if (token.startsWith('Bearer')) token = token.split('Bearer ')[1];

    jwt.verify(token, process.env.SECRET, (err, tokenContent) => {
      if (err || tokenContent.type !== 'Admin') {
        return res.status(401)
          .json({
            error: err ? err.message : 'Only Admins can view users.'
          });
      }
      next();
    });
  } else {
    return res.status(401)
      .json({ error: 'Only Admins can view users.' });
  }
}