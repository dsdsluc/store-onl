const SettingGeneral = require("../../models/setting-general.model");

module.exports.settingGeneral = async (req,res,next)=>{
    
    const record = await SettingGeneral.findOne({});
    res.locals.settingGeneral = record;

    next();
}