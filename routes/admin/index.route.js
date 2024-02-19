const dashboardRoute = require("./dashboard.route");
const system = require("../../configs/system")
const productRoute = require("./product.route");
const productCategoryRoute = require("./product-category.route")
const roleRoute = require("./role.route");
const accountRoute = require("./account.route");
const settingRoute = require("./setting.route");
const authRoute = require("./auth.route");
const myAccountRoute = require("./my-account.route");
const authMiddleware = require("../../middlewares/admin/auth.middleware");
const controller = require("../../controllers/admin/auth.controller");

module.exports = (app)=>{
    const PATH_ADMIN = "/" + system.prefixAdmin
    app.get(PATH_ADMIN, controller.login)

    app.use( PATH_ADMIN +"/dashboard",authMiddleware.requireAuth, dashboardRoute)

    app.use(PATH_ADMIN +"/products",authMiddleware.requireAuth,productRoute)

    app.use(PATH_ADMIN +"/products-category",authMiddleware.requireAuth,productCategoryRoute)

    app.use(PATH_ADMIN +"/roles",authMiddleware.requireAuth,roleRoute);

    app.use(PATH_ADMIN +"/accounts",authMiddleware.requireAuth,accountRoute);

    app.use(PATH_ADMIN +"/auth",authRoute);

    app.use(PATH_ADMIN +"/my-account",authMiddleware.requireAuth,myAccountRoute);

    app.use(PATH_ADMIN +"/settings",authMiddleware.requireAuth,settingRoute);
}