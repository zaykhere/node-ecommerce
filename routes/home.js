const express = require("express");
const router = express.Router();
const asyncMiddlewareHandler = require("../middleware/asyncMiddlewareHandler");
const Product = require("../models/products");
const Cart= require("../models/cart");
const stripe= require("stripe")("sk_test_51HLMIgAe7e74HIRPDjo1yKOqkmb73gSqjikJ8mYvZpZznbevKKJnp1Vz0cwPv7SPV8WuaphUhC4zVP8saPtATJR3003kCPtoVs");
var csrf = require("csurf");
var csrfProtection = csrf();

// Render the homepage
router.get(
  "/",
  asyncMiddlewareHandler(async (req, res) => {
    const products = await Product.find();
    
    res.render("index", { products: products });
  })
);

// About page
router.get("/about", (req, res) => {
  res.render("about");
});

//Contact Page
router.get("/contact", (req, res) => {
  res.render("contact");
});

// Product page route 
router.get("/singproduct/:id", asyncMiddlewareHandler(async(req,res)=>{
  let id= req.params.id;
  
  let pproduct= await Product.findById(id);
  console.log(pproduct);
  res.render("product",{product:pproduct});
}))



router.get("/add-to-cart/:productid",asyncMiddlewareHandler(async(req,res)=>{
  let productid= req.params.productid;
  let cart= new Cart(req.session.cart?req.session.cart:{});
 
  Product.findById(productid, function(err, product) {
    if (err) {
        return res.redirect('/');
    }
     cart.addItems(product, product.id);
     req.session.cart = cart;
     console.log(req.session.cart);
     res.redirect('/');
  })
 
}));

router.get("/shopping-cart", (req,res)=>{
  
  if(!req.session.cart) return res.redirect("/");
  let xcart= new Cart(req.session.cart);
  res.render("shopping-cart", {products: xcart.generateArray(), totalPrice: xcart.totalPrice, qty: xcart.qty, totalQty: xcart.totalQty})
  
});

router.get("/checkout", (req,res)=>{
  if(!req.session.cart) return res.redirect("/");
  let cart= new Cart(req.session.cart);
  res.render("checkout", {total: cart.totalPrice});
})

router.post("/checkout",  async (req,res)=>{
  let cart= new Cart(req.session.cart);
  let price= cart.totalPrice*100;
  console.log(price);
  console.log(typeof price);
 
  // const paymentIntent=await stripe.paymentIntents.create({
  //   amount: price,
  //   currency: "usd"

  // });
  console.log(req.body.email);
  try {
    stripe.customers
      .create({
        name: req.body.name,
        email: req.body.email,
        source: req.body.stripeToken
      })
      .then(customer =>
        stripe.charges.create({
          amount: price,
          currency: "usd",
          customer: customer.id
        })
      )
      .then(() => console.log("success"))
      .catch(err => console.log(err));
  } catch (err) {
    console.log(err);
  }
  res.end();
})




module.exports = router;
