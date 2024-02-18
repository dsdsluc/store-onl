module.exports.priceNews = (products)=>{
    products.forEach(item =>{
        item.pricenew = Math.round((item.price * (100-item.discountPercentage))/100,0);
    })
    return products
}

module.exports.priceNew = (product)=>{
        product.priceNew = Math.round((product.price * (100-product.discountPercentage))/100,0);
    return product
}