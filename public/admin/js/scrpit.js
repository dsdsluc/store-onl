// Button
const buttonStatus = document.querySelectorAll("[button-status]");

if(buttonStatus.length > 0 ){
    let url = new URL(window.location.href);

    buttonStatus.forEach(button=>{
        button.addEventListener("click",()=>{
            const status = button.getAttribute("button-status");
            
            if(status){
                url.searchParams.set("status",status);
            }
            else {
                url.searchParams.delete("status");
            }   
            window.location.href = url.href
        })
    })
}

// End Button

// Search
const formSearch = document.querySelector("#form-search");
if(formSearch > 0 ){
    const url = new URL(window.location.href);

    formSearch.addEventListener("submit",(e)=>{
        e.preventDefault();
        const value = e.target.elements.keyword.value;
        if(value){
            url.searchParams.set("keyword", value);
        }
        else{
            url.searchParams.delete("keyword");
        }
        window.location.href = url.href

    })
   
}
// End Search

// Pagination
const buttonPaginations = document.querySelectorAll("[button-pagination]");
if(buttonPaginations.length > 0 ){
    const url = new URL(window.location.href)
    buttonPaginations.forEach(button=>{
        button.addEventListener("click",()=>{
            const page = button.getAttribute("button-pagination");
            
            if(page != 1){
                url.searchParams.set("page",page);
            }
            else{
                url.searchParams.delete("page");
            }
            window.location.href = url.href;
            
        })
    })
}
// End Pagination

// Change Status
const buttonsChangeStatus = document.querySelectorAll("[button-change-status]");
if(buttonsChangeStatus.length > 0 ){
    const formChangeStatus = document.querySelector("#form-change-status");
    buttonsChangeStatus.forEach(button=>{
        button.addEventListener("click",()=>{
            const id = button.getAttribute("data-id");
            const status = button.getAttribute("data-status");
            const path = formChangeStatus.getAttribute("data-path") + `/${status}/${id}?_method=PATCH`
            formChangeStatus.action = path;
            formChangeStatus.submit();  
        })
    })
}

// End Change Status

// Check box Status
const checkBoxStatus = document.querySelector("[change-multi-status]")
if(checkBoxStatus){
    const checkBoxAll = checkBoxStatus.querySelector("input[check-box-all]");
    const checkBoxInputs = checkBoxStatus.querySelectorAll("input[check-box-change-status]");
    checkBoxAll.addEventListener("click",()=>{
        if(checkBoxAll.checked){
            checkBoxInputs.forEach(item=>{
                item.checked = true
            })
        }
        else{
            checkBoxInputs.forEach(item=>{
                item.checked = false
            })
        }
        
    })

    
    checkBoxInputs.forEach(item=>{
        item.addEventListener("click",()=>{
            const inputChecked = checkBoxStatus.querySelectorAll("input[check-box-change-status]:checked");
            const countInputChecked = inputChecked.length;
            if(countInputChecked == checkBoxInputs.length){
                checkBoxAll.checked = true
            }
            else{
                checkBoxAll.checked = false
            }
        })
    })
}
// End Check box Status

// Form Change Multi
const formChangeMultiSatus = document.querySelector("[form-change-multi-status]");
if(formChangeMultiSatus){
    formChangeMultiSatus.addEventListener("submit",(e)=>{
        e.preventDefault();
        
       
        const inputsCheck = checkBoxStatus.querySelectorAll("input[check-box-change-status]:checked");
        const inputIds = formChangeMultiSatus.querySelector("input[name=ids]");
        const typeChange = e.target.elements.type.value;
        console.log(typeChange)
        if(typeChange == "delete-all"){
            const confirmDelete = confirm("Bạn có chắc muốn xóa những bản ghi đó không ?");
            if(!confirmDelete){
                return ;
            }
        }
        
        

        if(inputsCheck.length > 0 ){

            let ids = [];
            inputsCheck.forEach(item=>{
                const id = item.value;
                if(typeChange == "change-position"){
                    const position = item.closest("tr").querySelector("input[change-position]").value
                    ids.push(`${id}-${position}`);
                }
                else{
                    ids.push(id);
                }
               
            })
            const idsString = ids.join(",");
            inputIds.value = idsString;
            formChangeMultiSatus.submit();
        }
        else{
            alert("Vui lòng chọn ít nhất một sản phẩm");
        }
        
    })
}
// End Form Change Multi


//Delete Item 
const formDelete = document.querySelector("#form-delete-item");
if(formDelete){
    const buttonDeleteItem = document.querySelectorAll("[button-delete]");
    buttonDeleteItem.forEach(item=>{
        item.addEventListener("click",()=>{
            const id = item.getAttribute("id-item-deleted");
            const confirmDeleteItem = confirm("Bạn có muốn xóa bản ghi này ?");
            if(confirmDeleteItem){
                const action = formDelete.getAttribute("data-path") + id + `?_method=DELETE`;
                formDelete.action = action
                formDelete.submit();
            }
           
        })
    })
}
//End Delete Item 

// Alert
const alertSuccess = document.querySelector("[show-alert]");
if(alertSuccess){
    const time = parseInt(alertSuccess.getAttribute("data-time"))|| 3000;
    setTimeout(()=>{
        alertSuccess.classList.add("alert-none");
    },time)
    const closeButton = alertSuccess.querySelector("[close-alert]");
    closeButton.addEventListener("click",()=>{
        alertSuccess.classList.add("alert-none");
    })
}


// End Alert

// UpLoad Image
const upload = document.querySelector("[upload]");
if(upload){
    const uploadInput = upload.querySelector("[upload-input]");
    const uploadImage = upload.querySelector("[upload-image]");
    uploadInput.addEventListener("change",(e)=>{
        
        if(e.target.files.length > 0){
            const image = URL.createObjectURL(e.target.files[0])
            uploadImage.src = image
        }
    })
}
// End UpLoad Image

// SORT
const sort = document.querySelector('[sort]');
if(sort){
    const sortSelect = sort.querySelector("[sort-select]");

    let url = new URL(window.location.href);
    sortSelect.addEventListener("change",(e)=>{
        const value = e.target.value;
        const [sortKey,sortValue] = value.split("-");

        if(sortKey && sortValue){
            url.searchParams.set("sortKey",sortKey);
            url.searchParams.set("sortValue",sortValue);
    
            window.location.href = url.href
        }
    })

    const sortKey = url.searchParams.get("sortKey");
    const sortValue = url.searchParams.get("sortValue");
    if(sortKey && sortValue){
        const sortString = `${sortKey}-${sortValue}`;

        const optionSelected = sort.querySelector(`option[value=${sortString}]`);
        optionSelected.selected = true
    }
    

    const sortClear = sort.querySelector("[sort-clear]");
    sortClear.addEventListener("click",()=>{
        url.searchParams.delete("sortKey")
        url.searchParams.delete("sortValue");
        window.location.href = url.href
    })
}

// End SORT