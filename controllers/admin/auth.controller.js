const md5 = require("md5");
const Accounts = require("../../models/account.model");
const system = require("../../configs/system");

module.exports.login = async (req, res)=>{
    

    res.render("admin/pages/auth/login",{
        pageTitle : "Đăng nhập tài khoản",
        
    });
}
module.exports.loginPost = async (req, res)=>{
    const {email} = req.body
    const password = md5(req.body.password);
    const user = await Accounts.findOne({
        email:  email,
        password: password
    })
    if(!user){
        req.flash("error","Email hoặc mật khẩu của bạn không đúng");
        res.redirect("back");
        return;
    }
    if(user.status == "inactive"){
        req.flash("error","Tài khoản của bạn đã bị khóa");
        res.redirect("back");
        return;
    }
    res.cookie("token",user.token);

    res.redirect(`/${system.prefixAdmin}/dashboard`);
}

module.exports.logout = async (req, res)=>{
    res.clearCookie("token");

    res.redirect(`/${system.prefixAdmin}/auth/login`)
}