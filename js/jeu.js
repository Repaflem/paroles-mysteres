document.addEventListener("DOMContentLoaded", function () {

    const bouton = document.querySelector(".game-start-button");

    if (!bouton) {
        console.error("Bouton de démarrage introuvable.");
        return;
    }

    bouton.addEventListener("click", function (event) {

        event.preventDefault();

        // Récupération des choix du joueur
        const genre = document.getElementById("genre").value;
        const era = document.getElementById("era").value;
        const difficulty = document.getElementById("difficulty").value;
        const number = document.getElementById("number").value;

        // Création de la configuration
        const gameSettings = {
            genre: genre,
            era: era,
            difficulty: difficulty,
            number: Number(number)
        };

        // Enregistrement dans le navigateur
        localStorage.setItem(
            "parolesMysteresSettings",
            JSON.stringify(gameSettings)
        );

        // Pour le moment, on vérifie que tout fonctionne
        alert(
            "Configuration enregistrée !\n\n" +
            "Style : " + genre + "\n" +
            "Époque : " + era + "\n" +
            "Difficulté : " + difficulty + "\n" +
            "Nombre de chansons : " + number
        );

    });

});
