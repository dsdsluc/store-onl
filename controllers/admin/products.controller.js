const Product = require("../../models/product.model");
const ProductCategory = require("../../models/products-category.model");
const Account = require("../../models/account.model");
const fillterStatusHelper = require("../../helpers/fillterStatus");
const paginationHelper = require("../../helpers/pagination");
const system = require("../../configs/system")
const createTree = require("../../helpers/createTree");

module.exports.index = async (req, res)=>{
    const status = req.query.status;
    const keyword = req.query.keyword;
    const pageCurrent = parseInt(req.query.page);
    const fillterStatus = fillterStatusHelper(status);
    const sortKey = req.query.sortKey
    const sortValue = req.query.sortValue
    const find = {
        deleted: false
    }
    // Search and Status
    if(status){
        find.status = status;
    }
    if(keyword){
        const regex = new RegExp(keyword, "i");
        find.title = regex
    }
    // End Search and Status

    // Pagination
    const countItems = await Product.countDocuments(find);
    const objectPagination =  paginationHelper(pageCurrent,countItems);
    // End Pagination

    let sort = {
        
    }

    if(sortKey && sortValue){
        sort[sortKey] = sortValue
    }
    else{
        sort.position = "desc"
    }

    const products = await Product.find(find).limit(objectPagination.limitItem).skip(objectPagination.skip).sort(sort);
    for (const item of products) {
        if(item.createdBy.account_id){
            const user = await Account.findOne({
                _id: item.createdBy.account_id
            })
            item.createdBy.user = user
        }
        
        if(item.updatedBy.slice(-1)[0] != undefined){
            const user = await Account.findOne({
                _id: item.updatedBy.slice(-1)[0].account_id
            })
            item.updatedBy.slice(-1)[0].user = user
        }
        
    }
    
    res.render("admin/pages/products/index",{
        pageTitle : "Danh sách sản phẩm",
        products: products,
        fillterStatus: fillterStatus,
        keyword: keyword,
        pagination: objectPagination
    });
}

module.exports.changeStatus = async (req,res)=>{
    const status = req.params.status
    const id = req.params.id

    await Product.updateOne({_id: id},{status: status});
    req.flash('success', 'Bạn đã cập nhật trạng thái thành công');
    res.redirect("back")
}
module.exports.changeMulti = async (req, res)=>{
    const status = req.body.type;
    const ids = req.body.ids.split(",");
    switch (status) {
        case "active":
            await Product.updateMany({_id : {$in : ids}},{status: status});
            break;
        case "inactive":
            await Product.updateMany({_id : {$in : ids}},{status: status});
            break;
        case "delete-all":
            await Product.updateMany({_id : {$in : ids}},{
                deleted: true,
                deletedBy: {
                    account_id: res.locals.user.id,
                    deletedAt: Date.now()
                }
            });
            break;
    
        case "change-position":
            for (const item of ids) {
                const [id,position] = item.split("-");
                await Product.updateOne({_id: id},{position:position});
            }
            break;
    
        default:
            break;
    }
    
    res.redirect("back")
}

module.exports.DeleteItem = async (req, res)=>{
    const id = req.params.id;
    await Product.updateOne({_id: id},{
        deleted: "true",
        deletedBy:{
            account_id: res.locals.user.id,
            deletedAt: Date.now()
        }
    });
    res.redirect("back")
}

module.exports.create = async (req, res)=>{
    const productsCategory = await ProductCategory.find({
        deleted: false
    })
    const newProductsCategory = createTree(productsCategory);
    res.render("admin/pages/products/create",{
        productsCategory: newProductsCategory,
        pageTitle : "Tạo mới sản phảm",
    })
}

module.exports.createPost = async (req, res)=>{
    const user = res.locals.user
    req.body.price =parseInt(req.body.price);
    req.body.discountPercentage =parseInt(req.body.discountPercentage)
    req.body.stock =parseInt(req.body.stock);
    req.body.createdBy = {
        account_id: user.id
    }
    if( req.body.position === ""){
        const count = await Product.countDocuments({});
        req.body.position = count +1
    }
    else{
        req.body.position =parseInt(req.body.position)
    }
    
    const product = new Product(req.body);
    await product.save();
    
    res.redirect(`/${system.prefixAdmin}/products`);
}

module.exports.edit = async (req, res)=>{
    const id = req.params.id
    const product = await Product.findOne({_id:id});
    const productsCategory = await ProductCategory.find({
        deleted: false
    })
    const newProductsCategory = createTree(productsCategory);
    res.render("admin/pages/products/edit",{
        pageTitle : "Chỉnh sửa sản phảm",
        productsCategory: newProductsCategory,
        product:product
    })
}
module.exports.editPatch = async (req, res)=>{
    const id = req.params.id;
    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);
    req.body.position = parseInt(req.body.position);
    const updatedBy = {
        account_id: res.locals.user.id,
        updatedAt: Date.now()
    }
    await Product.updateOne({_id:id},{
        ...req.body,
        $push: {
            updatedBy: updatedBy
        }
    });
    req.flash("success","Cập nhật sản phẩm thành công");
    res.redirect(`back`)
}

module.exports.detail = async (req, res)=>{
    const id = req.params.id
    const product = await Product.findOne({_id:id});
    res.render("admin/pages/products/detail",{
        pageTitle : "xem chi tiet sản phảm",
        product:product
    })
}