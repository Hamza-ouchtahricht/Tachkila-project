const button_ajout = document.querySelector("#button_ajout");
const modalOverlay = document.querySelector(".modal-overlay");
const modal_supprime = document.querySelector(".modal_supprime");

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

const supprime_player = document.querySelector("#supprime_player");

supprime_player.addEventListener("click", () => {
    modal_supprime.classList.toggle("active");

    
});

const btn_supprime_annuler = document.querySelector(".btn_supprime_annuler");
btn_supprime_annuler.addEventListener("click" , () => {
    modal_supprime.classList.toggle("active");   
});

const modal__supp_close =  document.querySelector(".modal__supp_close");

modal__supp_close.addEventListener("click" , () =>
{
    modal_supprime.classList.toggle("active");
});



 
