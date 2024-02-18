const Product = require("../../models/product.model");
const productHelper = require("../../helpers/priceNew");

module.exports.index = async(req, res) => {
    const keyword = req.query.keyword;
    let newProducts = []
    if(keyword){
        const keywordRegex = new RegExp(keyword,"i");
        const products = await Product.find({
            title: keywordRegex
        })
        newProducts = productHelper.priceNews(products)
    }
    console.log(keyword)
    res.render("client/pages/search/index",{
        pageTitle : "Kết quả tìm kiếm",
        products: newProducts,
        keyword: keyword
    });
}