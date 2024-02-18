const routerProducts = require("./products.route");
const routerHome = require("./home.route");
const routerSearch = require("./search.route");
const routerCart= require("./cart.route");
const routerCheckout= require("./checkout.route");
const routerUser= require("./user.route");
const categoryMiddleware = require("../../middlewares/client/category.middleware")
const cartMiddlerware = require("../../middlewares/client/cart.middleware");
const userMiddleware = require("../../middlewares/client/user.middleware");
const settingMiddleware = require("../../middlewares/client/setting.middleware");

module.exports = (app)=>{
    app.use(categoryMiddleware.category);

    app.use(cartMiddlerware.cartId);

    app.use(userMiddleware.inforUser);

    app.use(settingMiddleware.settingGeneral);

    app.use('/', routerHome)
      
    app.use('/products',routerProducts);

    app.use('/search',routerSearch);

    app.use('/cart',routerCart);

    app.use('/checkout',routerCheckout);

    app.use('/user',routerUser);



}