const button_ajout = document.querySelector("#button_ajout");
const modalOverlay = document.querySelector(".modal-overlay");

button_ajout.addEventListener("click", () => {
    modalOverlay.classList.toggle("active");
});

const btn_annuler =document.querySelector("#btn-annuler");

btn_annuler.addEventListener("click",() => {
     modalOverlay.classList.toggle("active");
}

)
const modal__close = document.querySelector(".modal__close");

modal__close.addEventListener("click", () => {
    modalOverlay.classList.toggle("active");

});
 
