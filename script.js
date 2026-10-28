
// 1. LES DONNEES (données du projet)


// tableau qui contient tous les joueurs, récupéré depuis le localStorage s'il existe, sinon tableau vide
let players = JSON.parse(localStorage.getItem("players")) || [];

// on garde ici l'id du joueur qu'on va modifier ou supprimer
let idAModifier = null;
let idASupprimer = null;

// pour chaque poste (GB, DEF...), les positions possibles sur le terrain
const positionsParPoste = {
    GB: ["GK"],
    DEF: ["LB", "CB1", "CB2", "RB"],
    MIL: ["LMF", "CMF1", "CMF2", "RMF"],
    ATT: ["CF1", "CF2"]
};

// couleur de chaque poste (classes Tailwind)
const couleurs = {
    GB: "bg-amber-400",
    DEF: "bg-indigo-800",
    MIL: "bg-emerald-600",
    ATT: "bg-red-600"
};

// regex du nom : seulement des lettres (arabes / latines) et des espaces, de 3 à 30 caractères
const regexNom = /^[A-Za-zÀ-ÿ\u0600-\u06FF ]{3,30}$/;



// 2. LES ELEMENTS HTML

const button_ajout = document.querySelector("#button_ajout");
const listeJoueurs = document.querySelector("#liste_joueurs");

// les 3 modals
const modalAjout = document.querySelector(".modal-overlay");
const modalSupprime = document.querySelector(".modal_supprime");
const modalModifier = document.querySelector(".modal_modifier");

// formulaire d'ajout
const formAjout = document.querySelector("#form-joueur");
const inputNom = document.querySelector("#player_fullname");
const selectPoste = document.querySelector("#select_position");
const inputNumero = document.querySelector("#player_number");

// formulaire de modification
const formModifier = document.querySelector("#form_modifier");
const inputNomModif = document.querySelector("#nom_modif");
const selectPosteModif = document.querySelector("#poste_modif");
const inputNumeroModif = document.querySelector("#numero_modif");

// bouton de confirmation de suppression
const btnConfirmerSupprime = document.querySelector("#btn_confirmer_supprime");



// 3. FONCTIONS SIMPLES (save, toast...)


// on enregistre le tableau dans le localStorage
function save() {
    localStorage.setItem("players", JSON.stringify(players));
}

// message affiché pendant 3 secondes (vert = succès, rouge = erreur)
let timerToast;
function showToast(message, type) {
    const toast = document.querySelector("#toast");
    toast.textContent = message;
    toast.classList.remove("hidden", "bg-emerald-600", "bg-red-600");
    if (type === "error") {
        toast.classList.add("bg-red-600");
    } else {
        toast.classList.add("bg-emerald-600");
    }
    // s'il y avait déjà un toast, on arrête son timer
    clearTimeout(timerToast);
    timerToast = setTimeout(function () {
        toast.classList.add("hidden");
    }, 3000);
}

// on trouve le joueur grâce à son id
function trouverJoueur(id) {
    for (let i = 0; i < players.length; i++) {
        if (players[i].id === id) {
            return players[i];
        }
    }
    return null;
}

// on vérifie s'il y a un joueur à cette position
function joueurALaPosition(position) {
    for (let i = 0; i < players.length; i++) {
        if (players[i].position === position) {
            return players[i];
        }
    }
    return null;
}



// 4. OUVRIR / FERMER LES MODALS


function ouvrirModal(modal) {
    modal.classList.add("active");
}

function fermerModal(modal) {
    modal.classList.remove("active");
    // si on ferme le modal d'ajout, on vide le formulaire et les erreurs
    if (modal === modalAjout) {
        formAjout.reset();
        viderErreurs("");
    }
    if (modal === modalModifier) {
        viderErreurs("_modif");
    }
}

const tousLesModals = [modalAjout, modalSupprime, modalModifier];

for (let i = 0; i < tousLesModals.length; i++) {
    const modal = tousLesModals[i];

    // un clic sur le fond (en dehors de la fenêtre) ferme le modal
    modal.addEventListener("click", function () {
        fermerModal(modal);
    });

    // un clic dans la fenêtre ne ferme pas le modal (stopPropagation)
    modal.children[0].addEventListener("click", function (e) {
        e.stopPropagation();
    });

    // les boutons de fermeture : X et Annuler
    const boutonsFermer = modal.querySelectorAll(".modal__close, .modal__supp_close, .btn--cancel, .btn_supprime_annuler");
    for (let j = 0; j < boutonsFermer.length; j++) {
        boutonsFermer[j].addEventListener("click", function () {
            fermerModal(modal);
        });
    }
}

// la touche Echap ferme tous les modals
document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
        for (let i = 0; i < tousLesModals.length; i++) {
            fermerModal(tousLesModals[i]);
        }
    }
});

// bouton "+ajoute un joueur"
button_ajout.addEventListener("click", function () {
    ouvrirModal(modalAjout);
});


// 5. VALIDATION (regex)

// chaque fonction retourne un message d'erreur, ou "" si tout est bon

function verifierNom(nom) {
    if (regexNom.test(nom.trim())) {
        return "";
    }
    return "Le nom est obligatoire (3 a 30 lettres)";
}

function verifierPoste(poste) {
    if (poste === "") {
        return "Le poste est obligatoire";
    }
    return "";
}

// idIgnore = id du joueur qu'on modifie (pour ne pas avoir d'erreur avec son propre numéro)
function verifierNumero(numero, idIgnore) {
    const n = Number(numero);
    if (numero === "" || !Number.isInteger(n) || n < 1 || n > 99) {
        return "Le numero est obligatoire (1 a 99)";
    }
    for (let i = 0; i < players.length; i++) {
        if (players[i].number === n && players[i].id !== idIgnore) {
            return "Ce numero est deja pris";
        }
    }
    return "";
}

// on met le message dans le span sous l'input
function afficherErreur(idSpan, message) {
    document.querySelector("#" + idSpan).textContent = message;
}

// suffixe = "" (ajout) ou "_modif" (modification)
function viderErreurs(suffixe) {
    afficherErreur("erreur_nom" + suffixe, "");
    afficherErreur("erreur_poste" + suffixe, "");
    afficherErreur("erreur_numero" + suffixe, "");
}

// validation en temps réel dans le formulaire d'ajout (à chaque lettre)
inputNom.addEventListener("input", function () {
    afficherErreur("erreur_nom", verifierNom(inputNom.value));
});
selectPoste.addEventListener("change", function () {
    afficherErreur("erreur_poste", verifierPoste(selectPoste.value));
});
inputNumero.addEventListener("input", function () {
    afficherErreur("erreur_numero", verifierNumero(inputNumero.value, null));
});

// validation en temps réel dans le formulaire de modification
inputNomModif.addEventListener("input", function () {
    afficherErreur("erreur_nom_modif", verifierNom(inputNomModif.value));
});
selectPosteModif.addEventListener("change", function () {
    afficherErreur("erreur_poste_modif", verifierPoste(selectPosteModif.value));
});
inputNumeroModif.addEventListener("input", function () {
    afficherErreur("erreur_numero_modif", verifierNumero(inputNumeroModif.value, idAModifier));
});



// 6. AJOUTER UN JOUEUR

formAjout.addEventListener("submit", function (e) {
    e.preventDefault(); // pour que la page ne se recharge pas

    const erreurNom = verifierNom(inputNom.value);
    const erreurPoste = verifierPoste(selectPoste.value);
    const erreurNumero = verifierNumero(inputNumero.value, null);

    afficherErreur("erreur_nom", erreurNom);
    afficherErreur("erreur_poste", erreurPoste);
    afficherErreur("erreur_numero", erreurNumero);

    // s'il y a une erreur, on s'arrête
    if (erreurNom !== "" || erreurPoste !== "" || erreurNumero !== "") {
        showToast("Corrige les erreurs du formulaire", "error");
        return;
    }

    // position = null veut dire que le joueur est sur le banc (pas encore sur le terrain)
    const nouveauJoueur = {
        id: Date.now(),
        name: inputNom.value.trim(),
        role: selectPoste.value,
        number: Number(inputNumero.value),
        position: null
    };

    players.push(nouveauJoueur);
    save();
    afficherTout();
    fermerModal(modalAjout);
    showToast("Joueur ajoute au banc", "success");
});



// 7. AFFICHAGE (aside + terrain + compteurs)


// on dessine les cartes des joueurs dans l'aside
function afficherJoueurs() {
    listeJoueurs.innerHTML = "";

    for (let i = 0; i < players.length; i++) {
        const p = players[i];

        // options du select : "Sur le banc" + les positions de son poste
        let options = '<option value="">Sur le banc</option>';
        const positions = positionsParPoste[p.role];
        for (let j = 0; j < positions.length; j++) {
            let selected = "";
            if (p.position === positions[j]) {
                selected = "selected";
            }
            options += '<option value="' + positions[j] + '" ' + selected + ">" + positions[j] + "</option>";
        }

        // si le joueur est sur le terrain, la carte devient pâle (opacity)
        let opacite = "";
        if (p.position !== null) {
            opacite = "opacity-50";
        }

        const carte = document.createElement("div");
        carte.className = "carte_joueur " + couleurs[p.role] + " " + opacite + " text-white rounded-lg p-2 flex flex-col gap-1 text-sm";
        carte.innerHTML =
            '<div class="flex justify-between font-bold">' +
            "<span>" + p.role + "</span>" +
            "<span>#" + p.number + "</span>" +
            "</div>" +
            "<p>" + p.name + "</p>" +
            '<select data-id="' + p.id + '" class="select_terrain bg-gray-800 text-white text-xs p-1 rounded">' + options + "</select>" +
            '<div class="flex gap-1">' +
            '<button type="button" data-action="modifier" data-id="' + p.id + '" class="bg-amber-300 text-black text-xs px-2 py-1 rounded cursor-pointer">Modifier</button>' +
            '<button type="button" data-action="supprimer" data-id="' + p.id + '" class="bg-red-800 text-white text-xs px-2 py-1 rounded cursor-pointer">Supprimer</button>' +
            "</div>";

        listeJoueurs.appendChild(carte);
    }
}

// on dessine le terrain : on efface tous les noms et numéros, puis on remplit ceux qui existent
function afficherTerrain() {
    const cases = document.querySelectorAll("[data-position]");

    // 1) on vide le terrain
    for (let i = 0; i < cases.length; i++) {
        const num = cases[i].querySelector('[class$="-num"]');
        const nom = cases[i].querySelector('[class$="-name"]');
        if (num) num.textContent = "";
        if (nom) nom.textContent = "";
    }

    // 2) on place les joueurs qui ont une position
    for (let i = 0; i < players.length; i++) {
        const p = players[i];
        if (p.position !== null) {
            const caseTerrain = document.querySelector('[data-position="' + p.position + '"]');
            if (caseTerrain) {
                const num = caseTerrain.querySelector('[class$="-num"]');
                const nom = caseTerrain.querySelector('[class$="-name"]');
                if (num) num.textContent = p.number;
                if (nom) nom.textContent = p.name;
            }
        }
    }
}

// compteurs
function afficherCompteurs() {
    let places = 0;
    for (let i = 0; i < players.length; i++) {
        if (players[i].position !== null) {
            places++;
        }
    }
    document.querySelector("#count-total").textContent = players.length;
    document.querySelector("#count-places").textContent = places;
}

// fonction qui regroupe tout (on l'appelle quand quelque chose change)
function afficherTout() {
    afficherJoueurs();
    afficherTerrain();
    afficherCompteurs();
}



// 8. PLACER UN JOUEUR / RETOUR AU BANC

// on utilise la "délégation d'événements" : un seul événement sur toute la liste

listeJoueurs.addEventListener("change", function (e) {
    if (!e.target.classList.contains("select_terrain")) {
        return;
    }

    const id = Number(e.target.dataset.id);
    const joueur = trouverJoueur(id);
    const nouvellePosition = e.target.value;

    // "Sur le banc" => la position redevient vide
    if (nouvellePosition === "") {
        joueur.position = null;
        save();
        afficherTout();
        showToast(joueur.name + " retourne sur le banc", "success");
        return;
    }

    // vérification 1 : la position correspond au poste du joueur
    if (!positionsParPoste[joueur.role].includes(nouvellePosition)) {
        showToast("Cette position ne convient pas a ce joueur", "error");
        afficherTout();
        return;
    }

    // vérification 2 : la position est libre (pas occupée par un autre joueur)
    const occupant = joueurALaPosition(nouvellePosition);
    if (occupant !== null && occupant.id !== id) {
        showToast("Position deja occupee par " + occupant.name, "error");
        afficherTout();
        return;
    }

    joueur.position = nouvellePosition;
    save();
    afficherTout();
    showToast(joueur.name + " place sur le terrain", "success");
});



// 9. MODIFIER / SUPPRIMER (boutons de chaque carte)


listeJoueurs.addEventListener("click", function (e) {
    const action = e.target.dataset.action;
    if (!action) {
        return;
    }
    const id = Number(e.target.dataset.id);
    const joueur = trouverJoueur(id);

    if (action === "modifier") {
        idAModifier = id;
        // on remplit le formulaire avec les anciennes informations
        inputNomModif.value = joueur.name;
        selectPosteModif.value = joueur.role;
        inputNumeroModif.value = joueur.number;
        viderErreurs("_modif");
        ouvrirModal(modalModifier);
    }

    if (action === "supprimer") {
        idASupprimer = id;
        document.querySelector("#texte_supprime").textContent = "Voulez-vous vraiment supprimer " + joueur.name + " ?";
        ouvrirModal(modalSupprime);
    }
});

// envoi du formulaire de modification
formModifier.addEventListener("submit", function (e) {
    e.preventDefault();

    const erreurNom = verifierNom(inputNomModif.value);
    const erreurPoste = verifierPoste(selectPosteModif.value);
    const erreurNumero = verifierNumero(inputNumeroModif.value, idAModifier);

    afficherErreur("erreur_nom_modif", erreurNom);
    afficherErreur("erreur_poste_modif", erreurPoste);
    afficherErreur("erreur_numero_modif", erreurNumero);

    if (erreurNom !== "" || erreurPoste !== "" || erreurNumero !== "") {
        showToast("Corrige les erreurs du formulaire", "error");
        return;
    }

    const joueur = trouverJoueur(idAModifier);

    // si le joueur change de poste alors qu'il est sur le terrain, il retourne sur le banc
    if (joueur.role !== selectPosteModif.value && joueur.position !== null) {
        joueur.position = null;
        showToast("Poste change : le joueur retourne sur le banc", "success");
    } else {
        showToast("Joueur modifie", "success");
    }

    joueur.name = inputNomModif.value.trim();
    joueur.role = selectPosteModif.value;
    joueur.number = Number(inputNumeroModif.value);

    save();
    afficherTout();
    fermerModal(modalModifier);
});

// confirmation de la suppression
btnConfirmerSupprime.addEventListener("click", function () {
    // on retire le joueur du tableau (sa position devient libre automatiquement)
    players = players.filter(function (p) {
        return p.id !== idASupprimer;
    });
    save();
    afficherTout();
    fermerModal(modalSupprime);
    showToast("Joueur supprime", "success");
});


// 
// 10. AU CHARGEMENT DE LA PAGE
// 
afficherTout();