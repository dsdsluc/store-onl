module.exports = (status)=>{
    let fillterStatus = [
        {
            name: "Tất cả",
            status: "",
            class: ""
        },
        {
            name: "Hoạt động",
            status: "active",
            class: ""
        },
        {
            name: "Ngưng hoạt động",
            status: "inactive",
            class: ""
        },
    ]
    
    if(status){
        const index = fillterStatus.findIndex(item=>{
        
            return item.status == status
        });
        fillterStatus[index].class = "active";
    }
    else{
        const index = fillterStatus.findIndex(item=>{
            return item.status == ""
        });
        fillterStatus[index].class = "active";
    }
    return fillterStatus
}