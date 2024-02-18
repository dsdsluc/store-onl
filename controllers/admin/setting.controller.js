const settingGeneral = require("../../models/setting-general.model");

module.exports.general = async (req, res)=>{
    const record = await settingGeneral.findOne({});

    res.render("admin/pages/settings/general",{
        pageTitle : "Cài đặt chung",
        record: record
    });
}

module.exports.generalPatch = async (req, res)=>{
    const record = await settingGeneral.findOne({});
    if(record){
        await settingGeneral.updateOne({
            _id: record.id
        },req.body)
    }
    else {
        const newrecord = new settingGeneral(req.body);
        await newrecord.save();
    }

    
    res.redirect("back")
}
