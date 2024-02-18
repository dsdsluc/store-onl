const Role = require("../../models/role.model");
const system = require("../../configs/system")

module.exports.index = async (req, res)=>{
    const find = {
        deleted: false
    }
    const roles = await Role.find(find)
    res.render("admin/pages/roles/index",{
        pageTitle : "Danh sách nhóm quyền",
        roles: roles
    });
}
module.exports.create = async (req, res)=>{
    

    res.render("admin/pages/roles/create",{
        pageTitle : "Tạo mới nhóm quyền"
    });
}

module.exports.createPost = async (req, res)=>{
    try {
        const role = new Role(req.body)
        await role.save();
        req.flash("success","Tạo mới nhóm quyền thành công");
        res.redirect(`/${system.prefixAdmin}/roles`)
    } catch (error) {
        req.flash("error","Tạo mới nhóm quyền thất bại");
        res.redirect(`/${system.prefixAdmin}/roles`)
    }
}

module.exports.create = async (req, res)=>{
    

    res.render("admin/pages/roles/create",{
        pageTitle : "Tạo mới nhóm quyền"
    });
}

module.exports.edit = async (req, res)=>{
    const id = req.params.id
    const role = await Role.findOne({
        _id: id,
        deleted: false
    })

    res.render("admin/pages/roles/edit",{
        pageTitle : "Chỉnh sửa nhóm quyền",
        role: role
    });
}

module.exports.editPatch = async (req, res)=>{
    const id = req.params.id;
    await Role.updateOne({_id:id},req.body);
    req.flash("success","Sửa sản phẩm thành công")
    res.redirect("back");
}

module.exports.permissions = async (req, res)=>{

    const roles = await Role.find({
        deleted: false
    })

    res.render("admin/pages/roles/permissions",{
        pageTitle : "Phân quyền",
        roles: roles
    });
}

module.exports.permissionsPatch = async (req, res)=>{
    const permissions = JSON.parse(req.body.permissions);
    for (const item of permissions) {
        await Role.updateOne({
            _id:item.id
        },{
            permissions: item.permissions
        })
    }
    req.flash("success","Phân quyền thành công")
    res.redirect("back");
}