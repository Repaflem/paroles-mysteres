// ========================================
// PAROLES MYSTÈRES
// MOTEUR DES QUESTIONS
// ========================================

document.addEventListener("DOMContentLoaded", function () {

    // Récupération des paramètres de la partie
    const settings = JSON.parse(
        localStorage.getItem("parolesMysteresSettings")
    );


    // Vérification
    if (!settings) {

        window.location.href = "jeu.html";

        return;
    }


    // Filtrage des questions
    let availableQuestions = questions.filter(function (question) {

        // Filtre du style
        if (
            settings.genre !== "all" &&
            question.genre !== settings.genre
        ) {
            return false;
        }


        // Filtre de l'époque
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


        // Filtre de difficulté
        if (
            settings.difficulty !== "all" &&
            question.difficulty !== settings.difficulty
        ) {
            return false;
        }


        return true;

    });


    // Si aucune question ne correspond
    if (availableQuestions.length === 0) {

        alert(
            "Aucune question ne correspond à tes critères."
        );

        window.location.href = "jeu.html";

        return;
    }


    // Choix d'une question aléatoire
    const randomIndex = Math.floor(
        Math.random() * availableQuestions.length
    );

    const currentQuestion =
        availableQuestions[randomIndex];


    // Affichage des paroles
    const lyricsElement =
        document.querySelector(".lyrics");

    lyricsElement.textContent =
        currentQuestion.lyrics;


    // Mise à jour du numéro de question
    const questionNumber =
        document.querySelector(".question-number");

    questionNumber.textContent =
        "Question 1 / " + settings.number;


    // Gestion du bouton de validation
    const bouton =
        document.getElementById("validate-answer");


    bouton.addEventListener("click", function () {

        const artist =
            document.getElementById("artist").value.trim();

        const title =
            document.getElementById("title").value.trim();


        alert(
            "Réponse reçue !\n\n" +
            "Artiste : " + artist + "\n" +
            "Titre : " + title + "\n\n" +
            "Bonne réponse :\n" +
            currentQuestion.artist +
            " — " +
            currentQuestion.title
        );

    });

});
