// Chức năng gửi yêu cầu kết bạn
const listButtonAddFriend = document.querySelectorAll("[btn-add-friend]");
if(listButtonAddFriend.length > 0){
    listButtonAddFriend.forEach(button=>{
        button.addEventListener("click",()=>{
            button.closest(".box-user").classList.add("add");

            const userId = button.getAttribute("btn-add-friend");
            socket.emit("CLIENT_ADD_FRIEND",userId)
        })
    })
}
// Hết Chức năng gửi yêu cầu kết bạn

// Chức năng hủy yêu cầu kết bạn
const listButtonCancelFriend = document.querySelectorAll("[btn-cancel-friend]");
if(listButtonCancelFriend.length > 0){
    listButtonCancelFriend.forEach(button=>{
        button.addEventListener("click",()=>{
            button.closest(".box-user").classList.remove("add");

            const userId = button.getAttribute("btn-cancel-friend");
            socket.emit("CLIENT_CANCEL_FRIEND",userId)
        })
    })
}
// Hết Chức năng hủy yêu cầu kết bạn

// Chức năng từ chối yêu cầu kết bạn
const listButtonRefuseFriend = document.querySelectorAll("[btn-refuse-friend]");
if(listButtonRefuseFriend.length > 0){
    listButtonRefuseFriend.forEach(button=>{
        button.addEventListener("click",()=>{
            button.closest(".box-user").classList.add("refuse");

            const userId = button.getAttribute("btn-refuse-friend");
            socket.emit("CLIENT_REFUSE_FRIEND",userId)
        })
    })
}
// Hết Chức năng từ chối yêu cầu kết bạn
// Chức năng chấp nhận yêu cầu kết bạn
const listButtonAcceptFriend = document.querySelectorAll("[btn-accept-friend]");
if(listButtonAcceptFriend.length > 0){
    listButtonAcceptFriend.forEach(button=>{
        button.addEventListener("click",()=>{
            button.closest(".box-user").classList.add("accepted");

            const userId = button.getAttribute("btn-accept-friend");
            socket.emit("CLIENT_ACCEPT_FRIEND",userId)
        })
    })
}
// Hết Chức năng chấp nhận yêu cầu kết bạn

//SERVER_RETURN_LENGTH_ACCEPT_FRIEND
socket.on("SERVER_RETURN_LENGTH_ACCEPT_FRIEND", (data)=>{
    const badgeUsersAccept = document.querySelector("[badge-users-accept]");
    const userId = badgeUsersAccept.getAttribute("badge-users-accept");

    if(userId == data.userId){    
        badgeUsersAccept.innerHTML = data.lengthAcceptFriends
    }

})
//End SERVER_RETURN_LENGTH_ACCEPT_FRIEND


// SERVER_RETURN_INFOR_ACCEPT_FRIEND
socket.on("SERVER_RETURN_INFOR_ACCEPT_FRIEND", (data)=>{
    const dataUserAccept = document.querySelector("[data-user-accept]");
    
    if(dataUserAccept){
        const userId = dataUserAccept.getAttribute("data-user-accept") // id cua ong B;
        if(userId == data.userId){
            const newBoxUser = document.createElement("div");
            newBoxUser.classList.add("col-6");
            newBoxUser.setAttribute("user-id",data.inforUserA._id);
    
            newBoxUser.innerHTML =`
            <div class="box-user">
                <div class="inner-avatar">
                    <img src="/client/images/user-avatar.jpg" alt="${data.inforUserA.fullName}">
                </div>
                <div class="inner-infor">
                    <div class="inner-name">
                    ${data.inforUserA.fullName} 
                    </div>
                    <div class="inner-buttons"> 
                        <button class="btn btn-sm btn-primary me-md-2" btn-accept-friend="${data.inforUserA._id}">Chấp nhận</button>
                        <button class="btn btn-sm btn-secondary me-md-2" btn-refuse-friend="${data.inforUserA._id}">Xóa</button>
                        <button class="btn btn-sm btn-secondary me-md-2" btn-deleted-friend="" disabel="">Đã xóa</button>
                        <button class="btn btn-sm btn-primary me-md-2" btn-accepted-friend="" disabel="">Đã chấp nhận </button>
                    </div>
                 </div>
            </div>
            `
            dataUserAccept.appendChild(newBoxUser)
            //In ra giao dien
            const btnRefuseFriend = newBoxUser.querySelector("[btn-refuse-friend]");
            btnRefuseFriend.addEventListener("click",()=>{
                btnRefuseFriend.closest(".box-user").classList.add("refuse");
    
                const userId = btnRefuseFriend.getAttribute("btn-refuse-friend");
                socket.emit("CLIENT_REFUSE_FRIEND",userId)
    
            })
            //Chấp nhận lời mời kết bạn
            const btnAcceptFriend = newBoxUser.querySelector("[btn-accept-friend]");
            btnAcceptFriend.addEventListener("click",()=>{
                btnAcceptFriend.closest(".box-user").classList.add("accepted");
    
                const userId = btnAcceptFriend.getAttribute("btn-accept-friend");
                socket.emit("CLIENT_ACCEPT_FRIEND",userId)
    
            })
            // Hết Chấp nhận lời mời kết bạn
        }
    }
    //Het trang loi moi ket ban
    const dataUsersNotFriend = document.querySelector("[data-users-not-friend]");
    if(dataUsersNotFriend){
        const userId = dataUsersNotFriend.getAttribute("data-users-not-friend");
        if(userId ==  data.userId){
            const boxRemoveUser = dataUsersNotFriend.querySelector(`[user_id="${data.inforUserA._id}"]`);
            if(boxRemoveUser){
                dataUsersNotFriend.removeChild(boxRemoveUser);
            }
        }
    }
    
})
// END SERVER_RETURN_INFOR_ACCEPT_FRIEND

// SERVER_RETURN_USER_ID_CANCEL_FRIEND
socket.on("SERVER_RETURN_USER_ID_CANCEL_FRIEND", (data)=>{
    const dataUserAccept = document.querySelector("[data-user-accept]");
    if(dataUserAccept){
        const userId= dataUserAccept.getAttribute("data-user-accept");

        if(userId == data.userId){
            const boxUserRemove = dataUserAccept.querySelector(`[user-id="${data.userIdA}"]`);
            if(boxUserRemove){
                dataUserAccept.removeChild(boxUserRemove)
            }
        }
    }
    
})
// END SERVER_RETURN_USER_ID_CANCEL_FRIEND
// SERVER_RETURN_USER_ONLINE
socket.on("SERVER_RETURN_USER_ONLINE", (userId)=>{
    const dataUsersFriend = document.querySelector("[data-users-friend]");
    if(dataUsersFriend){
        const boxUser = dataUsersFriend.querySelector(`[user-id="${userId}"]`);
        if(boxUser){
            boxUser.querySelector("[status]").setAttribute("status","online")
        }
    }
    
})
//End SERVER_RETURN_USER_ONLINE
// SERVER_RETURN_USER_OFFLINE
socket.on("SERVER_RETURN_USER_OFFLINE", (userId)=>{
    const dataUsersFriend = document.querySelector("[data-users-friend]");
    if(dataUsersFriend){
        const boxUser = dataUsersFriend.querySelector(`[user-id="${userId}"]`);
        if(boxUser){
            boxUser.querySelector("[status]").setAttribute("status","offline")
        }
    }
    
})
//End SERVER_RETURN_USER_OFFLINE