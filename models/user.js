const mongoose=require("mongoose")
const bcrypt = require('bcrypt');


const product_schema=mongoose.Schema({
    product_name:{type:String,required:true},
    category:{type:String,required:true},
    price:{type:Number,required:true},
    quantity:{type:Number,required:true}

})

const userSchema = mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    password: String
  });
  
  // Pre-save middleware to hash the password
  userSchema.pre('save', function(next) {
    const user = this;
    
    // Only hash the password if it's new or has been modified
    if (!user.isModified('password')) {
      return next();
    }
  
    // Generate a salt and hash the password
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        return next(err);
      }
  
      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) {
          return next(err);
        }
  
        user.password = hash;
        next();
      });
    });
  });


  const product_model = mongoose.model('products', product_schema);


const user_model=mongoose.model('users',userSchema)

module.exports={user_model,product_model}


