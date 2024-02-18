const User = require("../../models/user.model");

module.exports.inforUser = async (req, res, next )=>{
    if(req.cookies.tokenUser){
        const user = await User.findOne({
            tokenUser: req.cookies.tokenUser,
            deleted: false
        }).select("-password -tokenUser")
        if(user){
            res.locals.user = user
        }
    }
    next();
}