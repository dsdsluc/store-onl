module.exports.order = (req, res, next)=>{
    if(!req.body.fullName){
        req.flash('error', 'Vui lòng điền đẩy đủ thông tin');
        res.redirect("back");
        return ;
    }
    if(!req.body.phone){
        req.flash('error', 'Vui lòng điền đẩy đủ thông tin');
        res.redirect("back");
        return ;
    }
    if(!req.body.address){
        req.flash('error', 'Vui lòng điền đẩy đủ thông tin');
        res.redirect("back");
        return ;
    }
    
    next();
}
