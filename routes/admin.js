var express = require('express');
var router = express.Router();
const {product_model} = require('../models/user');



/* GET users listing. */
router.get('/', async function(req, res, next) {
  try {
    const data = await product_model.find().lean();
    console.log('Fetched data:', data);
    res.render('admin/view-products', {  data,admin:true });
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}); 
router.get("/add-product",(req,res)=>{
  res.render('admin/add-prod')
})


router.post('/add-product',async (req,res)=>{

  console.log(req.body)

  let product_data= await new product_model(req.body).save()


  req.files.image.mv('./public/images/'+product_data._id+'.jpg',(err)=>{

    if(err)
    console.log("file uploaded")

  })

})

module.exports = router;
