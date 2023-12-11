 /*
  * models\User\index.js
  * Author: Jesse Salinas
  * Date: 11/18/2023
*/

const jwt = require('jsonwebtoken');
//const bcrypt = require('bcrypt');

// Models
const BaseModel = require('../_Base');

class UserModelBase extends BaseModel {
  constructor() {
    super(); // call the constructor parent class
  }

  async authenticateUserCredentials(username, password) {

    // Format params
    const params = [ username ] || [];

    // TODO: SQL - compare passwords...
    const sql = 'SELECT * FROM `artventure`.`user` WHERE username = ?';

    try {

      // Query the DB
      const { results } = await this.query(sql, params);

      if (!results.length) {
        return
      }

      // Deconstruct the user data
      const [ user ] = results;

      // Compare the entered password with the stored hashed password
      /*bcrypt.compare(password, user.hashedPassword, (err, result) => {
        if (err || !result) {
          return res.status(401).json({ message: 'Invalid username or password' });
        }
      });*/

      // Await and return the results
      return user;

    } catch (error) {
      throw error;
    }
  }

  async signIn(username, password) {

    // Authenticate the user
    const user = await this.authenticateUserCredentials(username, password);

    if (!user) {

      return;
    }

    const claims = {
      username: user.username,
      user_id: user.user_id
    };

    //Generate JWT
    const token = jwt.sign(claims, 'secret-key', { expiresIn: '1h' });

    return { 
      ...claims,
      token 
    };

  }

  async signOut(userId) {

    return 1;
  }

  // Other methods...
}

module.exports = UserModelBase;

