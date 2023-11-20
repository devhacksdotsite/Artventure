 /*
  * controllers\UserController.js
  * Name: UserController
  * Author: Jesse Salinas
  * Date: 08/27/2023
*/

class UserController {
  constructor(userModel) {
    this.userModel = userModel;
  }

  async signIn(req, res) {
    const { username, password } = req.body;

    // Validate user credentials
    const user = await this.userModel.signIn(username, password);
  
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    return res.json({
      message: 'Login Successful',
      user
    });   
  }

}

module.exports = UserController;

