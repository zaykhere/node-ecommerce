const express = require("express");
const router = express.Router();
const asyncMiddlewareHandler = require("../middleware/asyncMiddlewareHandler");
var createError = require('http-errors')
var csrf = require("csurf");
var csrfProtection = csrf();
var passport= require("passport");
let {isLoggedIn, notLoggedIn}= require("../middleware/auth");

// just check user signup csrf
router.get("/signup", notLoggedIn , csrfProtection, (req, res) => {
  var messages= req.flash('error');

  res.render("signup", { token: req.csrfToken(), messages:messages, hasErrors: messages.length>0 });
});

router.post("/signup",  csrfProtection, passport.authenticate('local.signup',{
  successRedirect: '/',
  failureRedirect: '/user/signup',
  failureFlash: true

}))

router.get('/profile', isLoggedIn, (req,res)=>{
  res.send("You are logged in");
})

router.get("/signin", notLoggedIn, csrfProtection, (req, res) => {
  var messages= req.flash('error');

  res.render("signin", { token: req.csrfToken(), messages:messages, hasErrors: messages.length>0 });
});

router.post("/signin", csrfProtection, passport.authenticate('local.signin',{
  successRedirect: '/user/profile',
  failureRedirect: '/user/signup',
  failureFlash: true

}))

router.get("/logout", (req,res)=>{
  req.logout();
  res.redirect('/');
})





module.exports=router;
