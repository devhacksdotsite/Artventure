/*
  * middleware\Auth.js
  * Name: authenticationToken
  * Author: Jesse Salinas
  * Date: 11/16/2023
*/

const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ 
      message: 'Unauthorized' 
    });
  }

  jwt.verify(token, 'app-secret-key-here', (err, user) => {
    if (err) {
      return res.status(403).json({
        message: 'Invalid token' 
      });
    }

    req.user = user;
    next();
  });
}

module.exports = authenticateToken;

