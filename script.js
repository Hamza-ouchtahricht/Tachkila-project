// les element html li ghadi nkhdm bihom 

const button_ajout = document.querySelector("#button_ajout");

const listeJoueurs = document.querySelector("#liste_joueurs");

// les 3 modals li khdam bihom 

const modalAjout = document.querySelector(".modal-overlay");

const modalSupprime = document.querySelector(".modal_supprime");

const modalModifier = document.querySelector(".modal_modifier");

//formulaire dyal ajout player
const formAjout= document.querySelector("#form-joueur");
const inputNom = document.querySelector("#players_fullname");
const selectPoste= document.querySelector("#player_number");
const inputNumero = document.querySelector("#player_number");
//formulaire dyal modification 
const formModifier = document.querySelector("#form_modifier");
const inputNomModif = document.querySelector("#nom_modif");
const selectPosteMofif = document.querySelector("#poste_modif");
const inputNumeroModif = document.querySelector("#numero_modif");
//bouton dyal confirmation dyal wach bghiti t soprimi wlala 

const btnConfirmerSupprime = document.querySelector("#btn_confirmer_supprime")
const tousLesModals = [modalAjout, modalSupprime , modalModifier];
// bouton "+ajoute un joueur"
button_ajout.addEventListener("click", function(){
    ouvrirModal(modalAjout);
})
 for(let i =0; i<tousLesModals.length; i++){
    const modal = tousLesModals[i];
     //clicl 3la lkhalfiya katsd l modal
    modal.addEventListener("click", function(){
        fermerModal(modal);
     });
     //click dakhel l fentre makaytsedch l model
     modal.children[0].addEventListener("click", function(e) {
        e.stopPropagation();
     });
     // hado les bouttons X a annuler

     const boutonsFermer = modal.querySelectorAll(".modal__close, .modal__supp_close,.btn--cancel , .btn_supprime");
     for(let j=0 ; j<boutonsFermer.length;j++){
        boutonsFermer[j].addEventListener("click", function(){
            fermerModal(modal);
        });
     }
}

// les fonction dyal ouvrir w ferme les modals 
function ouvrirModal(modal) {
    modal.classList.add("active");
}
function fermerModal(modal){
    modal.classList.remove("active");
    //ila sdina l modal khas tb9a khawya 
    if (modal === modalAjout){
        formAjout.reset();
        viderErreurs("");   
    }
    if (modal === modalModifier) {
        viderErreurs("_modif");
    }
};

// ila touche Echap kat sed ga3 les modals
document.addEventListener("keydown", function(e){
    if(e.key === "Escape") {
        for (let i = 0; i<tousLesModals.length; i++){
            fermerModal(tousLesModals[i]);
        }
    }
});






