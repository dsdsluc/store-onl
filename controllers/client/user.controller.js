const md5 = require("md5");
const Cart = require("../../models/cart.model");
const User = require("../../models/user.model");
const ForgotPassword = require("../../models/forgot-password.model")
const helperGenerate = require("../../helpers/generate");
const helperSendMail = require("../../helpers/sendMail")

module.exports.register = async(req, res) =>{

    
    res.render("client/pages/user/register",{
        pageTitle : "Đăng kí tài khoản"
    });
}
module.exports.registerPost = async(req, res) =>{
    const email = req.body.email
    const user = await User.findOne({
        email: email,
        deleted: false
    })
    if(user){
        req.flash('error', 'Email đã tồn tại');
        res.redirect("back");
        return ;
    }

    req.body.password = md5(req.body.password);
    const newUser = new User(req.body);
    await newUser.save();
    await Cart.updateOne({
        _id: req.cookies.cartId
    },{
        user_id : newUser.id
    })
    res.cookie("tokenUser",newUser.tokenUser);
    res.redirect("/");
    
}

module.exports.login = async(req, res) =>{
    
    
    res.render("client/pages/user/login",{
        pageTitle : "Đăng nhập tài khoản"
    });
}

module.exports.loginPost = async(req, res) =>{
    const {email,password} = req.body;
    const user = await User.findOne({
        email: email
    })
    if(!user){
        req.flash('error', 'Email không tồn tại');
        res.redirect("back");
        return ;
    }
    if(md5(password) != user.password){
        req.flash('error', 'Sai mật khẩu');
        res.redirect("back");
        return ;
    }
    if(user.status == "inactve"){
        req.flash('error', 'Tài khoản đã bị khóa');
        res.redirect("back");
        return ;
    };
    await Cart.updateOne({
        _id: req.cookies.cartId
    },{
        user_id : user.id
    })

    res.cookie("tokenUser",user.tokenUser);
    await User.updateOne({
        _id: user.id
    },{
        statusOnline: "online"
    });
    _io.once("connection",  (socket) =>{
        socket.broadcast.emit("SERVER_RETURN_USER_ONLINE",user.id)
      })
    res.redirect("/")
}

module.exports.logout = async(req, res) =>{

    await User.updateOne({
        _id: res.locals.user.id
    },{
        statusOnline: "offline"
    })
    _io.once("connection",  (socket) =>{
        socket.broadcast.emit("SERVER_RETURN_USER_OFFLINE",res.locals.user.id)
      })
    res.clearCookie("tokenUser")
    res.redirect(`/user/login`)
}

module.exports.forgotPassword = async(req, res) =>{

    res.render("client/pages/user/forgot",{
        pageTitle : "Quên mật khẩu"
    });
}

module.exports.forgotPasswordPost = async(req, res) =>{
    const email = req.body.email ;
    const otp = helperGenerate.generateRandomNumber(8)
    const user = await User.findOne({
        email: email
    });
    if(!user){
        req.flash('error', 'Email không tồn tại');
        res.redirect("back");
        return ;
    }
    
    const objectForgotPassword = {
        email: email,
        otp : otp,
        expireAt: Date.now()
    }
    
    const forgotPassword = new ForgotPassword(objectForgotPassword);
    await forgotPassword.save();

    // Gui ma OTP vao email
    const subject = "Mã OTP để lấy lại mật khẩu"
    const html = `
        Mã OTP của bạn là : <b>${otp}<b/>.Lưu ý mã chỉ có hiệu lực trong 3 phút
    `

    helperSendMail.sendMail(email,subject,html)


    res.redirect(`/user/password/otp?email=${email}`);
}

module.exports.otp = async(req, res) => {
    const email = req.query.email;

    res.render("client/pages/user/otp",{
        pageTitle : "Mã OTP",
        email: email
    });
}

module.exports.otpPost = async(req, res) => {
    const {email,otp} = req.body;
    console.log(email, otp);

    const result = await ForgotPassword.findOne({
        email: email,
        otp: otp
    })
    if(!result){
        req.flash('error', 'OTP Không đúng');
        res.redirect("back");
        return ;
    }
    const user = await User.findOne({
        email: email
    })

    res.cookie("tokenUser", user.tokenUser)

    res.redirect(`/user/password/reset`)
}

module.exports.resetPassword = async(req, res) => {

    res.render("client/pages/user/reset",{
        pageTitle : "Cập nhật mật khẩu",
    });
}

module.exports.resetPasswordPatch = async(req, res) => {
    const tokenUser = req.cookies.tokenUser;
    await User.updateOne({
        tokenUser: tokenUser
    },{
        password: md5(req.body.password)
    })

    req.flash('success', 'Đổi mật khẩu thành công');
    res.redirect("/")
}

module.exports.inforUser = async(req, res) => {
    
    res.render("client/pages/user/infor",{
        pageTitle : "Thông tin người dùng",
    });
}

module.exports.editPatch = async(req, res) => {
    console.log(req.body)
    if(req.body){
        const user = res.locals.user;
        await User.updateOne({
            _id: user.id
        },req.body)
    }
    res.redirect("back")
}