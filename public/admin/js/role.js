//Role
const tablePermission = document.querySelector("[table-permission]");
if(tablePermission){
    const buttonSubmit = document.querySelector("[button-submit]");
    buttonSubmit.addEventListener("click",()=>{
        let result = [];
        const rows = tablePermission.querySelectorAll("[data-name]");
        rows.forEach((row)=>{
            const name = row.getAttribute("data-name");
            const inputs = row.querySelectorAll("input");
            if(name == "id"){
                inputs.forEach(input=>{
                    result.push({
                        id:input.value,
                        permissions:[]
                    })
                })
            }
            else{
                inputs.forEach((item,index)=>{
                    const checked = item.checked 
                    if(checked){
                        result[index].permissions.push(name)
                    }
                })
            }

        });
        const formPermissions = document.querySelector("[form-permissions]");
        const input = formPermissions.querySelector("input");
        input.value = JSON.stringify(result);
        formPermissions.submit();
    })
}

// Data Permission
const dataRole = document.querySelector("[data-role]");
if(dataRole){
    const roles = JSON.parse(dataRole.getAttribute("data-role"));
    const tablePermission = document.querySelector("[table-permission]");
        
    roles.forEach((role,index)=>{
        const permissions = role.permissions;
        permissions.forEach(permission=>{
            const tr = tablePermission.querySelector(`tr[data-name=${permission}]`);
            const input = tr.querySelectorAll("input")[index];
            input.checked = true;
        })
    })
}
// End Data Permission
//End Role