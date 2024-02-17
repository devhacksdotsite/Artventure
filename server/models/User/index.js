 /*
  * models\User\index.js
  * Author: Jesse Salinas
  * Date: 11/18/2023
*/

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Models
const BaseModel = require('../_Base');

class UserModelBase extends BaseModel {
  constructor() {
    super(); // call the constructor parent class
  }

  async authenticateUserCredentials(email, password) {

    // Format params
    const params = [ email ] || [];

    // SQL 
    const sql = 'SELECT * FROM `artventure`.`user` WHERE email = ?';

    try {

      // Query the DB
      const { results } = await this.query(sql, params);

      if (!results.length) {
        return
      }

      // Deconstruct the user data
      const [ user ] = results;

      const authenticated = await bcrypt.compare(password, user.password)

      if (!authenticated) {
        return;
      } 

      return user;

    } catch (error) {
      throw error;
    }
  }

  async signIn(email, password) {

    // Authenticate the user
    const user = await this.authenticateUserCredentials(email, password);

    if (!user) {

      return;
    }

    const claims = {
      fullname: user.full_name,
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

