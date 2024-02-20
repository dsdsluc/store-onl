const uploadToClouldinary = require("../../helpers/uploadToClouldinary");

module.exports.upload = async (req, res, next)=>{
    if(req.file){
        const link = await uploadToClouldinary(req.file.buffer);
        req.body[req.file.fieldname] = link;
    }
    next();
}