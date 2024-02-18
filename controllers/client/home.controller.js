const Product = require("../../models/product.model");
const productHelper = require("../../helpers/priceNew");
module.exports.index = async(req, res) => {
    const products = await Product.find({
        deleted: false,
        status: "active",
        feature: "1"
    }).limit(6)
    const newProducts =productHelper.priceNews(products)

    const recentProduct = await Product.find({
        deleted: false,
        status: "active",
    }).limit(6).sort({position: "desc"})
    const newRecentProducts =productHelper.priceNews(recentProduct)

    res.render("client/pages/home/index",{
        pageTitle : "Trang chủ",
        products: newProducts,
        recentProducts: newRecentProducts

    });
}