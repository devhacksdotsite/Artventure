 /*
  * models\User\index.js
  * Author: Jesse Salinas
  * Date: 11/18/2023
*/

const jwt = require('jsonwebtoken');

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

      // Await and return the results
      return results;

    } catch (error) {
      throw error;
    }
  }

  async signIn(username, password) {

    // Authenticate the user
    const [ results ] = await this.authenticateUserCredentials(username, password);

    if (!results) {

      return;
    }

    console.log(results);
    const claims = {
      username: results.username,
      user_id: results.user_id
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

