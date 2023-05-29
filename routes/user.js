var express = require('express');
var router = express.Router();
var mongoose=require('mongoose')
const bcrypt = require('bcrypt');
const {product_model}=require('../models/user')
const {user_model}=require('../models/user');
// /* GET home page. */

// Middleware to check if the user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.session.userId) {
    // User is authenticated, proceed to the next middleware
    next();
  } else {
    // User is not authenticated, redirect to login page
    res.redirect('/login');
  }
};


router.get('/', async function(req, res, next) {
  
    if(req.session.userId)
    {
      const userId = req.session.userId;
    const user = await user_model.findById(userId).lean();
    const data = await product_model.find({}).lean();
    res.render('user/view-product', { data, admin: false, user });
    }
    else{
      const data = await product_model.find({}).lean();
      res.render('user/view-product', { data, admin: false });
    }
  } 
);
router.post('/register',async (req,res)=>{

  console.log(req.body)

  let user_data= await new user_model(req.body).save()


})


router.get("/login", (req, res) => {
  if (req.session.userId) {
    res.redirect('/');
  } else {
    res.render('user/login');

  }
});
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.render('user/login', { error: 'Please provide both email and password' });
  }

  try {
    const user = await user_model.findOne({ email });

    if (!user) {
      return res.render('user/login', { error: 'Invalid email or password' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.render('user/login', { error: 'Invalid email or password' });
    }

    req.session.userId = user._id;
    res.redirect('/');
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



router.get('/logout',(req,res)=>{
  req.session.destroy()
  res.redirect('/')
})


router.get("/register",(req,res)=>{
  console.log("got it")
  res.render('user/register')
})



module.exports = router;
