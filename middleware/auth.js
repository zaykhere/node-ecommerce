//For protecting routes

const passport=require("passport");
exports.isLoggedIn=(req,res,next)=>{
  if(req.isAuthenticated())
    return next();
  return res.redirect('/');  
}

exports.notLoggedIn=(req,res,next)=>{
  if(!req.isAuthenticated())
    return next();
  return res.redirect('/');  
}
