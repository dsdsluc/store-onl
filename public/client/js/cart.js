const inputQuantity = document.querySelectorAll("input[name=quantity]");
if(inputQuantity.length > 0 ){
    inputQuantity.forEach(item=>{
        item.addEventListener("change",(e)=>{
            const quantity = e.target.value;
            const productId = item.getAttribute("product-id");
            if(quantity > 0 ){
                window.location.href = `/cart/update/${productId}/${quantity}`;
            }
        })
    })
}