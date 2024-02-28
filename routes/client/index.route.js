const routerProducts = require("./products.route");
const routerHome = require("./home.route");
const routerSearch = require("./search.route");
const routerCart= require("./cart.route");
const routerCheckout= require("./checkout.route");
const routerUser= require("./user.route");
const routerChat= require("./chat.route");
const routerUsers= require("./users.route");
const routerRoomChat= require("./rooms-chat.route");
const categoryMiddleware = require("../../middlewares/client/category.middleware")
const cartMiddlerware = require("../../middlewares/client/cart.middleware");
const userMiddleware = require("../../middlewares/client/user.middleware");
const settingMiddleware = require("../../middlewares/client/setting.middleware");
const authMiddleware = require("../../middlewares/client/auth.middleware");

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

    app.use('/chat',authMiddleware.requireAuth,routerChat);

    app.use('/users',authMiddleware.requireAuth,routerUsers);

    app.use('/rooms-chat',authMiddleware.requireAuth,routerRoomChat);



}