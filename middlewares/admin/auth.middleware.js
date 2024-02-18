const system = require("../../configs/system");
const Role = require("../../models/role.model");
const Account = require("../../models/account.model");
module.exports.requireAuth = async (req,res,next)=>{
    
    const token = req.cookies.token;
    if(!token){
        res.redirect(`/${system.prefixAdmin}/auth/login`);
        return ;
    }
    const user = await Account.findOne({
        token: token
    })
    if(!user){
        res.redirect(`/${system.prefixAdmin}/auth/login`);
        return ;
    }
    const role = await Role.findOne({_id: user.role_id});
    res.locals.role = role
    res.locals.user = user

    next();
}