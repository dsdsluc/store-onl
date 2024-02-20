import * as Popper from "https://cdn.jsdelivr.net/npm/@popperjs/core@^2/dist/esm/index.js";
const upload = new FileUploadWithPreview.FileUploadWithPreview('upload-image',{
  multiple : true,
  maxFileCount: 6
});
// CLIENT_SEND_MESSAGE
const formSendChat = document.querySelector(".chat .inner-form");

if (formSendChat) {
  formSendChat.addEventListener("submit", (e) => {
    e.preventDefault();
    const content = e.target.elements.content.value;
    const images = upload.cachedFileArray;
    if (content || images.length > 0) {
      socket.emit("CLIENT_SEND_MESSAGE", {
        content: content,
        images: images
      });
      e.target.elements.content.value = "";
      socket.emit("CLIENT_SEND_TYPING", "hidden");
    }
  });
}
// END CLIENT_SEND_MESSAGE

// SERVER_RETURN_MESSGAE
socket.on("SERVER_RETURN_MESSAGE", (data) => {
  const myId = document.querySelector("[my-id]").getAttribute("my-id");
  const body = document.querySelector(".chat .inner-body");
  const boxTyping = document.querySelector(".inner-list-typing");


  const div = document.createElement("div");

  let htmlFullName = "";
  let htmlContent = "";
  let htmlImage = "";

  if (myId == data.userId) {
    div.classList.add("inner-outgoing");
  } else {
    htmlFullName = `<div class="inner-name">${data.fullName}</div>`;
    div.classList.add("inner-incoming");
  }
  if(data.content){
    htmlContent = `<div class="inner-content">${data.content}</div>`
  }
  if(data.images.length > 0){
    htmlImage = `
    <div class="inner-images"> 
    `
    for (const image of data.images) {
      htmlImage += `<img src="${image}">`
    }
    htmlImage += `</div>`
  }

  div.innerHTML = `
  ${htmlFullName}
  ${htmlContent}
  ${htmlImage}
  `;

  body.insertBefore(div,boxTyping);
  body.scrollTop = body.scrollHeight;
  upload.resetPreviewPanel();
});
// END SERVER_RETURN_MESSGAE

// Scroll chat to bottom
const bodyChat = document.querySelector(".chat .inner-body");
if (bodyChat) {
  bodyChat.scrollTop = bodyChat.scrollHeight;
}
// End Scroll chat to bottom

// emoji-picker
// ShowTyping
 var timeOut;
 const showTyping = ()=>{
    socket.emit("CLIENT_SEND_TYPING", "show");

    clearTimeout(timeOut);

    timeOut = setTimeout(() => {
      socket.emit("CLIENT_SEND_TYPING", "hidden");
    }, 3000);
 }

// Show Popup
const buttonIcon = document.querySelector(".button-icon");
if (buttonIcon) {
  const tooltip = document.querySelector(".tooltip");
  Popper.createPopper(buttonIcon, tooltip);

  buttonIcon.onclick = () => {
    tooltip.classList.toggle("shown");
    
  };
}

// Insert icon to input
const emojiPicker = document.querySelector("emoji-picker");
if (emojiPicker) {
  const inputChat = document.querySelector(
    ".chat .inner-form input[name='content']"
  );
  emojiPicker.addEventListener("emoji-click", (event) => {
    const icon = event.detail.unicode;
    inputChat.value = inputChat.value + icon;
    const end = inputChat.value.length;
    inputChat.setSelectionRange(end, end);
    inputChat.focus();
    

    showTyping()
  });

  // Typing

  inputChat.addEventListener("keyup", () => {
    showTyping()
  });
}
// end emoji-picker

// SERVER_SEND_TYPING
const elementBox = document.querySelector(".inner-list-typing");
if (elementBox) {
  socket.on("SERVER_RETURN_TYPING", (data) => {
    if (data.type == "show") {
      const exsitTyping = document.querySelector(`[user-id="${data.userId}"]`);
      if (!exsitTyping) {
        const divTyping = document.createElement("div");
        divTyping.classList.add("box-typing");
        divTyping.setAttribute("user-id", data.userId);

        divTyping.innerHTML = `
      <div class="inner-name"> ${data.fullName}</div>
      <div class="inner-dots">
        <span></span>
        <span></span>
        <span></span>
      </div>
    `;
        elementBox.appendChild(divTyping);
        bodyChat.scrollTop = bodyChat.scrollHeight;
      }
    }else{
      const boxRemoveTyping = document.querySelector(`[user-id="${data.userId}"]`);
      if(boxRemoveTyping){
        elementBox.removeChild(boxRemoveTyping);
      }
    }
  });
}

// END SERVER_SEND_TYPING
