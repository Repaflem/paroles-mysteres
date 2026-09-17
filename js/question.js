// ========================================
// PAROLES MYSTÈRES
// MOTEUR DES QUESTIONS
// ========================================

document.addEventListener("DOMContentLoaded", function () {

    // ========================================
    // RÉCUPÉRATION DES PARAMÈTRES
    // ========================================

    const settings = JSON.parse(
        localStorage.getItem("parolesMysteresSettings")
    );


    // Si aucune configuration n'existe,
    // retour à la page de configuration
    if (!settings) {
        window.location.href = "jeu.html";
        return;
    }


    // ========================================
    // FILTRAGE DES QUESTIONS
    // ========================================

    let availableQuestions = questions.filter(function (question) {

        // ----------------------------
        // FILTRE DU STYLE MUSICAL
        // ----------------------------

        if (
            settings.genre !== "all" &&
            question.genre !== settings.genre
        ) {
            return false;
        }


        // ----------------------------
        // FILTRE DE L'ÉPOQUE
        // ----------------------------

        if (settings.era !== "all") {

            const startYear = Number(settings.era);

            let endYear;

            if (startYear === 1960) {
                endYear = 1979;
            } else {
                endYear = startYear + 9;
            }

            if (
                question.year < startYear ||
                question.year > endYear
            ) {
                return false;
            }
        }


        // ----------------------------
        // FILTRE DE DIFFICULTÉ
        // ----------------------------

        if (
            settings.difficulty !== "all" &&
            question.difficulty !== settings.difficulty
        ) {
            return false;
        }


        return true;

    });


    // ========================================
    // AUCUNE QUESTION DISPONIBLE
    // ========================================

    if (availableQuestions.length === 0) {

        alert(
            "Aucune question ne correspond aux critères sélectionnés."
        );

        window.location.href = "jeu.html";

        return;
    }


    // ========================================
    // CHOIX D'UNE QUESTION ALÉATOIRE
    // ========================================

    const randomIndex = Math.floor(
        Math.random() * availableQuestions.length
    );

    const currentQuestion =
        availableQuestions[randomIndex];


    // ========================================
    // AFFICHAGE DES PAROLES
    // ========================================

    const lyricsElement =
        document.querySelector(".lyrics");

    if (lyricsElement) {

        lyricsElement.textContent =
            currentQuestion.lyrics;

    }


    // ========================================
    // AFFICHAGE DU NUMÉRO DE QUESTION
    // ========================================

    const questionNumber =
        document.querySelector(".question-number");

    if (questionNumber) {

        questionNumber.textContent =
            "Question 1 / " + settings.number;

    }


    // ========================================
    // BOUTON DE VALIDATION
    // ========================================

    const bouton =
        document.getElementById("validate-answer");


    if (!bouton) {
        console.error(
            "Le bouton de validation est introuvable."
        );

        return;
    }


    bouton.addEventListener("click", function () {

        // Récupération de la réponse de l'utilisateur

        const artist =
            document.getElementById("artist").value.trim();

        const title =
            document.getElementById("title").value.trim();


        // ========================================
        // AFFICHAGE TEMPORAIRE DU RÉSULTAT
        // ========================================

        alert(
            "Réponse reçue !\n\n" +

            "Ta réponse :\n" +

            "Artiste : " +
            (artist || "Aucune réponse") +
            "\n" +

            "Titre : " +
            (title || "Aucune réponse") +

            "\n\n" +

            "Bonne réponse :\n" +

            currentQuestion.artist +
            " — " +
            currentQuestion.title
        );

    });

});
