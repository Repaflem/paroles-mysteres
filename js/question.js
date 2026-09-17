// ========================================
// PAROLES MYSTÈRES
// MOTEUR DU QUIZ
// ========================================

document.addEventListener("DOMContentLoaded", function () {

    // ========================================
    // QUESTIONS DE TEST
    // ========================================

    const questions = [

        {
            id: 1,
            artist: "Artiste Test",
            title: "La chanson mystère",
            year: 2020,
            genre: "pop",
            difficulty: "easy",
            lyrics: "« UNE PHRASE POP DE TEST ! »"
        },

        {
            id: 2,
            artist: "Groupe Test",
            title: "Une autre chanson",
            year: 1995,
            genre: "rock",
            difficulty: "medium",
            lyrics: "« UNE PHRASE ROCK DE TEST ! »"
        },

        {
            id: 3,
            artist: "Artiste Exemple",
            title: "Le dernier exemple",
            year: 1985,
            genre: "francais",
            difficulty: "hard",
            lyrics: "« UNE PHRASE FRANÇAISE DE TEST ! »"
        }

    ];


    // ========================================
    // RÉCUPÉRATION DES PARAMÈTRES
    // ========================================

    const savedSettings =
        localStorage.getItem("parolesMysteresSettings");


    if (!savedSettings) {

        window.location.href = "jeu.html";

        return;
    }


    const settings =
        JSON.parse(savedSettings);


    // ========================================
    // FILTRAGE DES QUESTIONS
    // ========================================

    let availableQuestions = questions.filter(function (question) {


        // STYLE MUSICAL

        if (
            settings.genre !== "all" &&
            question.genre !== settings.genre
        ) {

            return false;

        }


        // ÉPOQUE

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


        // DIFFICULTÉ

        if (
            settings.difficulty !== "all" &&
            question.difficulty !== settings.difficulty
        ) {

            return false;

        }


        return true;

    });


    // ========================================
    // AUCUNE QUESTION
    // ========================================

    if (availableQuestions.length === 0) {

        alert(
            "Aucune question ne correspond aux paramètres sélectionnés."
        );

        window.location.href = "jeu.html";

        return;

    }


    // ========================================
    // CHOIX ALÉATOIRE
    // ========================================

    const randomIndex =
        Math.floor(
            Math.random() * availableQuestions.length
        );


    const currentQuestion =
        availableQuestions[randomIndex];


    // ========================================
    // AFFICHAGE DE LA QUESTION
    // ========================================

    const lyricsElement =
        document.querySelector(".lyrics");


    if (lyricsElement) {

        lyricsElement.textContent =
            currentQuestion.lyrics;

    }


    // ========================================
    // NUMÉRO DE QUESTION
    // ========================================

    const questionNumber =
        document.querySelector(".question-number");


    if (questionNumber) {

        questionNumber.textContent =
            "Question 1 / " + settings.number;

    }


    // ========================================
    // VALIDATION
    // ========================================

    const validateButton =
        document.getElementById("validate-answer");


    if (validateButton) {

        validateButton.addEventListener(
            "click",
            function () {

                const artistInput =
                    document.getElementById("artist");


                const titleInput =
                    document.getElementById("title");


                const artist =
                    artistInput.value.trim();


                const title =
                    titleInput.value.trim();


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

            }
        );

    }

});
