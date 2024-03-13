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
console.log(upload)
if(upload){
    const innerImage = upload.querySelector(".inner-image");
    const uploadInput = upload.querySelector("[upload-input]");
    const uploadImage = upload.querySelector("[upload-image]");
    uploadInput.addEventListener("change",(e)=>{
        
        if(e.target.files.length > 0){
            const image = URL.createObjectURL(e.target.files[0])
            uploadImage.src = image;
            innerImage.style.display = "block"
        }
    })
}
// End UpLoad Image