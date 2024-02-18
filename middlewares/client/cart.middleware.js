const Cart = require("../../models/cart.model");

module.exports.cartId = async (req, res, next )=>{
    
    if(!req.cookies.cartId){
        const cart = new Cart();
        await cart.save();

        const timeExpires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 365)
        res.cookie("cartId",cart.id,{
            expires: timeExpires
        })
    }
    else{
        const cart = await Cart.findOne({
            _id: req.cookies.cartId
        })
        cart.totalQuantity = cart.products.reduce((sum, item)=>{
            return sum + item.quantity
        },0)
        res.locals.miniCart = cart
    }
    next()
}