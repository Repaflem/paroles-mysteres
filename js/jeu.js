// ========================================
// PAROLES MYSTÈRES
// MOTEUR DE CONFIGURATION DE LA PARTIE
// ========================================


// Récupération du formulaire de configuration
const startButton = document.querySelector(".game-start-button");


// Vérification que le bouton existe
if (startButton) {

    startButton.addEventListener("click", function (event) {

        // Empêche le lien de fonctionner immédiatement
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


        // Sauvegarde de la configuration dans le navigateur
        localStorage.setItem(
            "parolesMysteresSettings",
            JSON.stringify(gameSettings)
        );


        // Message temporaire de vérification
        alert(
            "Configuration enregistrée !\n\n" +
            "Style : " + genre + "\n" +
            "Époque : " + era + "\n" +
            "Difficulté : " + difficulty + "\n" +
            "Nombre de chansons : " + number
        );

    });

}
