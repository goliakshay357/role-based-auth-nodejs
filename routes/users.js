const router = require('express').Router()

//Bring in the User Registration Function
const { userRegister } = require('../util/Auth')

// ------------------------ REGISTRATIONS --------------------- //
//Users registration Route
router.post('/register-user', async(req,res) => {
  await userRegister(req.body,'user',res);
});

//Admin Registration Route
router.post('/register-admin', async(req,res) => {
  await userRegister(req.body,'admin',res);
});


//Super Admin registration route
router.post('/register-superadmin', async(req,res) => {
  await userRegister(req.body,'superadmin',res)
});


// ------------------------ LOGIN --------------------- //
//Users Login Route
router.post('/login-user', async(req,res) => {});

//Admin Login Route
router.post('/login-admin', async(req,res) => {});

//Super Admin Login route
router.post('/login-superadmin', async(req,res) => {});

// ------------------------ BASIC ROUTES --------------------- //

// Profile route
router.post('/profile', async(req,res) => {});

//Users Protected Route
router.post('/user-protected', async(req,res) => {});

//Admin Protected Route
router.post('/admin-protected', async(req,res) => {});

//Super Admin Protected route
router.post('/superadmin-protected', async(req,res) => {});





module.exports = router