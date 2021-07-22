const db=require('../db');

module.exports.requireAuth =(req, res, next)=>{
    console.log(req.cookies)
    if(!req.signedCookies.userID){
        res.redirect('/auth/login')
        return;
    }

    let user=db.get('users').find({id:req.signedCookies.userID}).value();

    if(!user){
        res.redirect('/auth/login');
        return;
    }

    // tồn tại trong vòng đời của req-res trong res ấy thôi, 
    // nó ko bị ảnh hưởng bởi các req khác hoặc các req khác nhưng ko trong phiên này 
    res.locals.user = user;

    next();
}