const ProductCategory = require("../../models/products-category.model");
const Product = require("../../models/product.model");
const productHelper = require("../../helpers/priceNew");
module.exports.index = async (req, res) => {
    const products = await Product.find({
        deleted: false,
        status: "active"
    }).sort({
        position: "desc"
    });
    const newProducts =productHelper.priceNews(products)
    res.render("client/pages/products/index",{
        pageTitle : "Danh sách sản phẩm",
        products : newProducts
    })
}

module.exports.category = async (req, res) => {
    const slug = req.params.slug;

    const productCategory = await ProductCategory.findOne({
        slug: slug
    }) 
    const getSubCategory = async (parentId)=>{
        const subs = await ProductCategory.find({
            parent_id: parentId,
            deleted: false,
            status: "active"
        })

        let allSub = [...subs];

        for (const sub of subs) {
            const childs = await getSubCategory(sub.id);
            allSub = allSub.concat(childs);
        }
        return allSub
    }
    const listSbuCategory =  await getSubCategory(productCategory.id);
    const listSbuCategoryId = listSbuCategory.map(item=>item.id);

    const products = await Product.find({
        product_category_id:{$in : [productCategory.id, ...listSbuCategoryId]}
    })
    const newProducts =productHelper.priceNews(products)
    res.render("client/pages/products/index",{
        pageTitle : productCategory.title,
        products : newProducts
    })
}

module.exports.detail = async (req, res) => {
    const slugProduct = req.params.slugProduct
    const product = await Product.findOne({
        slug: slugProduct,
    })
    if(product.product_category_id){
        const category = await ProductCategory.findOne({
            _id: product.product_category_id
        })
        product.category = category;
    }
    const newProduct = productHelper.priceNew(product);

    res.render("client/pages/products/detail",{
        pageTitle : "Chi Tiết sản phẩm",
        product : newProduct
    })
}