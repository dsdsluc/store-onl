const ProductCategory = require("../../models/products-category.model");
const createTree = require("../../helpers/createTree")

module.exports.category = async (req, res, next)=>{
    const productCategory = await ProductCategory.find({
        deleted: false
    })
    const layoutProductCategory = createTree(productCategory);
    res.locals.layoutProductCategory= layoutProductCategory
    next();
}