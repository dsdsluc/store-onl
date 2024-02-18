const Product = require("../../models/product.model");
const productHelper = require("../../helpers/priceNew");
const Cart = require("../../models/cart.model");

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
    
    res.render("client/pages/cart/index",{
        pageTitle : "Giỏ hàng",   
        cartDetail: cart
    });
}

module.exports.addPost = async(req, res) => {
    const idProduct = req.params.idProduct;
    const cartId = req.cookies.cartId;
    const quantity = parseInt(req.body.quantity);
    
    const cart = await Cart.findOne({
        _id: cartId
    })
    const existProductInCart = cart.products.find(item=>item.product_id == idProduct);
    if(existProductInCart){
        const newQuantity = quantity + existProductInCart.quantity

        await Cart.updateOne({
            _id: cartId,
            'products.product_id': idProduct
        },{
            $set: {
                'products.$.quantity': newQuantity
            }
        })
    }
    else{
        const objectCart = {
            product_id: idProduct,
            quantity: quantity
        }
        await Cart.updateOne({
            _id: cartId
        },{
            $push: {products: objectCart}
        })
    }
    req.flash("success","Thêm vào giỏ hàng thành công")
    res.redirect("back")
}

module.exports.delete = async(req, res) => {
    const cartId = req.cookies.cartId;
    const productId = req.params.productId;

    await Cart.updateOne({
        _id: cartId
    },{
        $pull: {products: {product_id: productId}}
    },{ safe: true });
    req.flash("success","Xoa san pham thanh cong        ")
    res.redirect("back")
}

module.exports.updateOne = async(req, res) =>{
    const cartId = req.cookies.cartId;
    const producId = req.params.productId;
    const quantity = req.params.quantity;

    await Cart.updateOne({
        _id: cartId,
       'products.product_id': producId
    },{
        $set: {'products.$.quantity': quantity}
    })
    res.redirect("back");
}