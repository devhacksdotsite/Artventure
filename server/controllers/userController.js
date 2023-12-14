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
    const { email, password } = req.body;

    // Validate user credentials
    const user = await this.userModel.signIn(email, password);
    console.log('user', user);
  
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    return res.json({
      message: 'Login Successful',
      user
    });   
  }

}

module.exports = UserController;

