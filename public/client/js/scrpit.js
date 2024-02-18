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
