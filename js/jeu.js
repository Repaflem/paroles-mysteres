document.addEventListener("DOMContentLoaded", function () {

    const bouton = document.querySelector(".game-start-button");

    console.log("jeu.js est chargé");
    console.log("Bouton trouvé :", bouton);

    if (!bouton) {
        alert("ERREUR : le bouton n'a pas été trouvé.");
        return;
    }

    bouton.addEventListener("click", function (event) {

        event.preventDefault();

        alert("LE BOUTON FONCTIONNE !");

    });

});
