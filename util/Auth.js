const bcrypt = require('bcryptjs');
const User = require('../models/User')

/**
 * @DESC To register the user function {ADMIN,SUPERADMIN,USER}
 */
const userRegister = async (userDets, role, res) => {
  try {
    //Validate the User
    let usernameNotTaken = await validateUsername(userDets.username)
    if (!usernameNotTaken) {
      return res.status(400).json({
        message: `Username is already taken`,
        success: false
      })
    }
    //Validate the email
    let emailNotRegistered = await validateEmail(userDets.email)
    if (!emailNotRegistered) {
      return res.status(400).json({
        message: `Email is already taken`,
        success: false
      })
    }

    /**get the hashed password ❌
     * We'll hash our password with
     * 12 rounds of salt
     */
    const password = await bcrypt.hash(userDets.password, 12)
    //Create a new user
    const newUser = new User({
      ...userDets,
      password,
      role
    })
    await newUser.save()
    return res.status(201).json({
      message: `Hurray! Successfully Registered. Please login now🚀`,
      success: true
    })
  } catch (err) {
    //You can add logger function here
    return res.status(500).json({
      message: `Meh! Unable to create User.`,
      success: false
    })
  }
}

const validateUsername = async username => {
  /**
   * This is old way of writing
   * But ES6 version is given below
   * let user = User.findOne({username:username})
   */
  let user = await User.findOne({
    username
  });
  return user ? false : true;
}

const validateEmail = async email => {
  let email1 = await User.findOne({
    email
  });
  return email1 ? false : true;
}

//  -------------------------------- EXPORTS --------------------------------

module.exports = {
  userRegister
}