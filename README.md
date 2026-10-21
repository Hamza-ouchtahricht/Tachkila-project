# ⚽ Tachkila Project — Gestionnaire d'Équipe Tactique

> **Créez, gérez et composez votre équipe de football idéale sur un terrain tactique interactif.**

---

## 📖 Description du Projet
**Tachkila Project** est une application web interactive qui permet de gérer un effectif de joueurs de football de A à Z. Elle offre une interface intuitive pour ajouter des joueurs avec une validation en temps réel, les placer stratégiquement sur une grille de terrain **12×9** selon leur poste, gérer le banc de touche et sauvegarder automatiquement toute la composition dans le navigateur.

---

## 📋 Planification & Gestion Agile (Scrum / Jira)
L'ensemble du projet a été organisé et suivi selon la méthodologie **Scrum** (découpage en User Stories, gestion du Backlog et suivi sur le Board : *To Do / Doing / Done*).

📌 **Accéder au tableau de suivi du projet :**  
👉 **[Cliquez ici pour ouvrir le Board Jira — Tachkila Project](https://fourtiying.atlassian.net/jira/software/projects/SCRUM/boards/1?filter=&groupBy=none&atlOrigin=eyJpIjoiZTk4MWI4YTY1MTgyNDU2ODhmM2QzZWRmNTAyNDI2OTMiLCJwIjoiaiJ9)**

---

## ✨ Fonctionnalités Principales

* 🏟️ **Grille du terrain sur mesure**
  * Terrain conçu en **CSS Grid natif (12 × 9 cases)** prêt pour le placement tactique.
* ➕ **Ajout de joueur & Validation en temps réel**
  * Fenêtre modale interactive avec contrôle **Regex en temps réel** (retour visuel immédiat) pour éviter toute saisie invalide.
* 🎨 **Liste latérale colorée par poste**
  * Affichage organisé des joueurs dans l'`aside` avec un code couleur distinct selon leur rôle (**GK**, **DEF**, **MID**, **ATT**).
* 🔄 **Assignation tactique & Gestion du banc**
  * Placement via un menu déroulant respectant strictement les **règles de poste** et les **positions libres**.
  * Passage automatique en mode **"carte pâle"** dans la liste lorsqu'un joueur est titulaire sur le terrain.
  * Retour sur le banc en un clic et mise à jour instantanée des **compteurs**.
* ✏️ **Modification intelligente & Suppression sécurisée**
  * Édition des données via la modale préremplie.
  * **Règle métier :** Tout changement de poste renvoie automatiquement le joueur sur le banc.
  * Suppression protégée par une demande de confirmation.
* 🔔 **Notifications & Sauvegarde automatique**
  * Alertes visuelles de succès ou d'erreur temporaires (**3 secondes**).
  * Persistance complète des données via **`localStorage`**.
* 📱 **100% Responsive Design**
  * Interface fluide et adaptée aux écrans Mobile, Tablette et Desktop grâce à **Tailwind CSS**.

---

## 🛠️ Technologies & Outils Utilisés

| Catégorie | Technologies |
| :--- | :--- |
| **Structure** | HTML5 Sémantique (`header`, `aside`, `main`, modale) |
| **Style & Layout** | Tailwind CSS, CSS3 (CSS Grid natif 12×9) |
| **Logique & Données** | JavaScript (Vanilla JS, DOM, Regex, `localStorage`) |
| **Gestion & Déploiement** | Git, GitHub, Jira (Scrum), Vercel |

---



