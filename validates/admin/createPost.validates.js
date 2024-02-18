module.exports.createPost = (req, res, next)=>{
    if(!req.body.title){
        req.flash('error', 'vui lòng nhập tên sản phẩm');
        res.redirect("back");
        return ;
    }
    if(req.body.title.length < 5){
        req.flash('error', 'Tên sản phẩm phải vượt quá 5 kí tự');
        res.redirect("back");
        return ;
    }
    next();
}