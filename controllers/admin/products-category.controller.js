const ProductCategory = require("../../models/products-category.model");
const createTree = require("../../helpers/createTree");

const system = require("../../configs/system");

module.exports.index = async (req, res)=>{
    const find = {
        deleted: false
    }
    const records = await ProductCategory.find(find);

    const productsCategory = createTree(records);
    res.render("admin/pages/products-category/index",{
        pageTitle : "Danh mục sản phẩm",
        productsCategory: productsCategory,
    });
}

module.exports.create = async (req, res)=>{
    const find = {
        deleted: false
    }
    const records = await ProductCategory.find(find); 
    
    const productsCategory = createTree(records);
    res.render("admin/pages/products-category/create",{
        pageTitle : "Tạo mới danh mục",
        productsCategory:productsCategory
    });
}
module.exports.createPost = async (req, res)=>{
    const find = {
        deleted: false
    }
    if(req.body.position){
        req.body.position = parseInt(req.body.position)
    }
    else{
        req.body.position = await ProductCategory.countDocuments(find) + 1
    }
    const productCategory = new ProductCategory(req.body);
    await productCategory.save()
    req.flash("success","Thêm mới danh mục thành công");
    res.redirect(`/${system.prefixAdmin}/products-category`)
}

module.exports.edit = async (req, res)=>{
    const id = req.params.id
    const find = {
        deleted: false
    }
    
    const productCategory = await ProductCategory.findOne({_id:id})
    const productsCategory = await ProductCategory.find(find)
    res.render("admin/pages/products-category/edit",{
        pageTitle : "Chinh sua  danh mục",
        productCategory:productCategory,
        productsCategory:productsCategory
    });
}

module.exports.editPatch = async (req, res)=>{
    const id = req.params.id;

    req.body.position = parseInt(req.body.position);
    await ProductCategory.updateOne({_id:id},req.body);

    req.flash("success","Cập nhật sản phẩm thành công!");
    res.redirect("back");
}