 /*
  * models\User\index.js
  * Author: Jesse Salinas
  * Date: 11/18/2023
*/

const jwt = require('jsonwebtoken');

const BaseModel = require('../_Base');

class UserModelBase extends BaseModel {
  /*constructor() {
    // super base ...
  }*/

  async authenticateUserCredentials(username, password) {
    const sql = 'SELECT * FROM users WHERE id = ?';
    const params = [username] || [];
    console.log(params);

    try {
      const results = await this.query(sql, params);
      console.log('res:', results);
      return results;
      return user;
    } catch (error) {
      throw error;
    }

    return {
      id: '3432',
      username: 'jsalinas',
      fullname: 'Jesse Salinas',
    }
  }

  async signIn(username, password) {

    const claims = await this.authenticateUserCredentials(username, password);
    console.log('claims', claims);

    if (!claims) {

      return;
    }

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

