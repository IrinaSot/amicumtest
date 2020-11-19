 let modalOpen = document.querySelector(".button");
 let modalUpdate = document.querySelector(".popup-update");
 let modalClose = document.querySelector(".popup-update .popup__button-close");
 let modalWish = document.querySelector(".popup-wish");
 let wishAdd = document.querySelector(".popup__button--add-wish");
 let wishClose = document.querySelector(".popup-wish .popup__button-close");
 let form = document.querySelector(".popup-wish__form");
 let comment = document.querySelector("[name=comment]");
 let modalNotification = document.querySelector(".popup-notification");
 let notificationClose = document.querySelector(".popup-notification .popup__button-close");
 let archiveClose = document.querySelector(".archive__button-close");

 modalClose.addEventListener("click", function () {
   window.close();
 });

 wishAdd.addEventListener("click", function () {
   modalUpdate.classList.remove("popup--show");
   modalWish.classList.add("popup--show");
 });

 wishClose.addEventListener("click", function () {
   modalWish.classList.remove("popup--show");
   modalUpdate.classList.add("popup--show");
 });

 form.addEventListener("submit", function (evt) {
   evt.preventDefault();
   if (!comment.value) {
     alert("Добавьте комментарий!");
   } else {
     comment.value = "";
     modalNotification.classList.add("popup--show");
     modalWish.classList.remove("popup--show");
   }
 });

 notificationClose.addEventListener("click", function () {
   modalNotification.classList.remove("popup--show");
   modalUpdate.classList.add("popup--show");
 });

 