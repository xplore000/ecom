var express = require('express');
var router = express.Router();
const {product_model}=require('../models/user')
const {user_model}=require('../models/user')
/* GET home page. */
router.get('/', async function(req, res, next) {
  try {
    const data = await product_model.find({}).lean();
    console.log('Fetched data:', data);
    res.render('user/view-product', {  data,admin:false });
  } catch (error) {
    console.error('Error fetching data:', error);
  }
  
});

router.post('/register',async (req,res)=>{

  console.log(req.body)

  let user_data= await new user_model(req.body).save()


})


router.get("/login",(req,res)=>{
  res.render('user/login')
})
router.get("/register",(req,res)=>{
  console.log("got it")
  res.render('user/register')
})

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Find the user by email
  user.find({ email }).lean()
    .then((user) => {
      if (!user) {
        // User not found
        return res.status(404).json({ message: 'User not found' });
      }

      // Compare the provided password with the stored hashed password
      bcrypt.compare(password, user.password)
        .then((isMatch) => {
          if (isMatch) {
            // Passwords match, user is authenticated
            // You can generate and send a token for authentication or proceed with further actions
            return res.status(200).json({ message: 'User authenticated' });
          } else {
            // Passwords do not match
            return res.status(401).json({ message: 'Invalid password' });
          }
        })
        .catch((error) => {
          console.error('Error comparing passwords:', error);
          res.status(500).json({ message: 'Internal server error' });
        });
    })
    .catch((error) => {
      console.error('Error finding user:', error);
      res.status(500).json({ message: 'Internal server error' });
    });
});

module.exports = router;
