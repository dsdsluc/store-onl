const Product = require("../../models/product.model");
const productHelper = require("../../helpers/priceNew");
const Cart = require("../../models/cart.model");
const Order = require("../../models/order.model");

module.exports.index = async(req, res) => {
    const cartId = req.cookies.cartId
    const cart = await Cart.findOne({
        _id: cartId
    });
    if(cart){
        for (const item of cart.products) {
            const product = await Product.findOne({
                _id: item.product_id
            });
            const newProduct = productHelper.priceNew(product)
            item.productInfor = newProduct;
            item.totalPrice = item.quantity * newProduct.priceNew;
        }
    
        cart.totalCart = cart.products.reduce((sum,item)=>{
            return sum+ item.totalPrice
        },0)
    }
    res.render("client/pages/checkout/index",{
        pageTitle : "Giỏ hàng",   
        cartDetail: cart
    });
}

module.exports.order = async(req, res) => {
    const cartId = req.cookies.cartId;
    let products = [];
    const cart = await Cart.findOne({
        _id: cartId
    })

    for (const item of cart.products) {
        const obejectProduct = {
            product_id: item.product_id,
            price: 0,
            discountPercentage: 0,
            quantity: item.quantity
        }
        const product = await Product.findOne({
            _id: item.product_id
        })
        obejectProduct.price = product.price
        obejectProduct.discountPercentage = product.discountPercentage

        products.push(obejectProduct)
    }
    const objectOrder = {
        cart_id: cartId,
        userInfor : req.body,
        products: products
    }
    const order = new Order(objectOrder);
    order.save();
    await Cart.updateOne({
        _id: cartId
    },{
        products: []
    })
    res.redirect(`/checkout/success/${order.id}`);

}

module.exports.success = async(req, res) =>{
    const order = await Order.findOne({
        _id: req.params.orderId
    })
    if(order.products.length > 0){
        for (const item of order.products) {
            const productInfor = await Product.findOne({
                _id: item.product_id
            }).select("title thumbnail")
            item.productInfor = productInfor
            item.priceNew = Math.round((item.price * (100-item.discountPercentage))/100,0);
            item.totalPrice = item.priceNew * item.quantity
        }
    }
    order.totalPrice = order.products.reduce((sum,item)=>{
        return sum + item.totalPrice
    },0)
    res.render("client/pages/checkout/success",{
        pageTitle : "Đặt hàng thành công",   
        order: order
    });
}