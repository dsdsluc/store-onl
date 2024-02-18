const md5 = require('md5');
const Accounts = require("../../models/account.model");
const Roles = require("../../models/role.model");
const system = require("../../configs/system")
module.exports.index = async (req, res)=>{
    const accounts = await Accounts.find({});
    for (const item of accounts) {
        const role = await Roles.findOne({_id: item.role_id});
        item.role = role
    }
    res.render("admin/pages/accounts/index",{
        pageTitle : "Trang tài khoản",
        accounts:accounts
        
    });
}

module.exports.create = async (req, res)=>{
    const roles = await Roles.find({})
    res.render("admin/pages/accounts/create",{
        pageTitle : "Tạo mới tài khoản",
        roles: roles
    });
}
module.exports.createPost = async (req, res)=>{
    req.body.password = md5(req.body.password );
    const account = new Accounts(req.body);
    await account.save()

    req.flash("success","Tạo tài khoản thành công")
    res.redirect(`/${system.prefixAdmin}/accounts`)
}