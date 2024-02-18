const md5 = require("md5");
const Account = require("../../models/account.model")

module.exports.index = async (req, res)=>{

    res.render("admin/pages/my-account/index",{
        pageTitle : "Thông tin tài khoản",
    });
}
module.exports.edit = async (req, res)=>{

    res.render("admin/pages/my-account/edit",{
        pageTitle : "Chỉnh sửa tài khoản",
    });
}
module.exports.editPatch = async (req, res)=>{
    if(req.body.password){
        req.body.password = md5(req.body.password);
    }
    await Account.updateOne({_id: res.locals.user.id},req.body);
    req.flash("success","Cập nhật thành công")
    res.redirect("back");
}