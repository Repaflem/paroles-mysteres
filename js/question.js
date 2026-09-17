document.addEventListener("DOMContentLoaded", function () {

    // =========================================================
    // ÉLÉMENTS HTML
    // =========================================================

    const lyricsElement =
        document.getElementById("lyrics");

    const currentQuestionElement =
        document.getElementById("current-question");

    const totalQuestionsElement =
        document.getElementById("total-questions");

    const artistInput =
        document.getElementById("artist");

    const titleInput =
        document.getElementById("title");

    const validateButton =
        document.getElementById("validate-answer");

    const nextQuestionButton =
        document.getElementById("next-question");

    const answerCard =
        document.getElementById("answer-card");

    const resultCard =
        document.getElementById("result-card");

    const resultIcon =
        document.getElementById("result-icon");

    const resultTitle =
        document.getElementById("result-title");

    const resultMessage =
        document.getElementById("result-message");

    const correctArtist =
        document.getElementById("correct-artist");

    const correctTitle =
        document.getElementById("correct-title");

    const pointsEarned =
        document.getElementById("points-earned");

    const scoreElement =
        document.getElementById("score");


    // =========================================================
    // VÉRIFICATIONS
    // =========================================================

    if (!lyricsElement || !validateButton) {

        console.error(
            "Impossible de trouver les éléments du quiz."
        );

        return;
    }


    if (typeof questions === "undefined") {

        console.error(
            "La variable 'questions' est introuvable."
        );

        lyricsElement.textContent =
            "Erreur : impossible de charger les questions.";

        return;
    }


    // =========================================================
    // PARAMÈTRES DU JEU
    // =========================================================

    let settings =
        localStorage.getItem(
            "parolesMysteresSettings"
        );


    if (settings) {

        try {

            settings = JSON.parse(settings);

        } catch (error) {

            console.error(
                "Impossible de lire les paramètres.",
                error
            );

            settings = null;
        }
    }


    // Paramètres par défaut
    if (!settings) {

        settings = {

            genre: "all",
            era: "all",
            difficulty: "all",
            number: 10

        };

    }


    // =========================================================
    // VARIABLES DU JEU
    // =========================================================

    let currentQuestionIndex = 0;

    let score = 0;

    let gameQuestions = [];


    // =========================================================
    // NORMALISATION DES TEXTES
    // =========================================================

    function normalizeText(text) {

        return String(text)

            .toLowerCase()

            .normalize("NFD")

            .replace(/[\u0300-\u036f]/g, "")

            .replace(/[^\w\s]/g, "")

            .replace(/\s+/g, " ")

            .trim();

    }


    // =========================================================
    // MÉLANGE
    // =========================================================

    function shuffle(array) {

        const result = [...array];

        for (
            let i = result.length - 1;
            i > 0;
            i--
        ) {

            const randomIndex =
                Math.floor(
                    Math.random() * (i + 1)
                );


            [
                result[i],
                result[randomIndex]
            ] = [
                result[randomIndex],
                result[i]
            ];

        }

        return result;
    }


    // =========================================================
    // FILTRAGE DES QUESTIONS
    // =========================================================

    function filterQuestions() {

        return questions.filter(function (question) {


            // -------------------------------------------------
            // GENRE
            // -------------------------------------------------

            if (
                settings.genre !== "all" &&
                question.genre !== settings.genre
            ) {

                return false;

            }


            // -------------------------------------------------
            // ANNÉE
            // -------------------------------------------------

            if (settings.era !== "all") {

                if (
                    settings.era === "1960-1979" &&
                    (
                        question.year < 1960 ||
                        question.year > 1979
                    )
                ) {

                    return false;

                }


                if (
                    settings.era === "1980-1989" &&
                    (
                        question.year < 1980 ||
                        question.year > 1989
                    )
                ) {

                    return false;

                }


                if (
                    settings.era === "1990-1999" &&
                    (
                        question.year < 1990 ||
                        question.year > 1999
                    )
                ) {

                    return false;

                }


                if (
                    settings.era === "2000-2009" &&
                    (
                        question.year < 2000 ||
                        question.year > 2009
                    )
                ) {

                    return false;

                }


                if (
                    settings.era === "2010-2019" &&
                    (
                        question.year < 2010 ||
                        question.year > 2019
                    )
                ) {

                    return false;

                }


                if (
                    settings.era === "2020-2026" &&
                    (
                        question.year < 2020 ||
                        question.year > 2026
                    )
                ) {

                    return false;

                }

            }


            // -------------------------------------------------
            // DIFFICULTÉ
            // -------------------------------------------------

            if (
                settings.difficulty !== "all" &&
                question.difficulty !== settings.difficulty
            ) {

                return false;

            }


            return true;

        });

    }


    // =========================================================
    // PRÉPARATION DU JEU
    // =========================================================

    function prepareGame() {

        let filteredQuestions =
            filterQuestions();


        filteredQuestions =
            shuffle(filteredQuestions);


        const numberWanted =
            Number(settings.number);


        gameQuestions =
            filteredQuestions.slice(
                0,
                numberWanted
            );


        // -----------------------------------------------------
        // AUCUNE QUESTION
        // -----------------------------------------------------

        if (gameQuestions.length === 0) {

            lyricsElement.textContent =
                "Aucune question ne correspond à tes critères.";

            validateButton.disabled = true;

            return false;

        }


        // Nombre total
        totalQuestionsElement.textContent =
            gameQuestions.length;


        return true;

    }


    // =========================================================
    // AFFICHER UNE QUESTION
    // =========================================================

    function displayQuestion() {

        const question =
            gameQuestions[currentQuestionIndex];


        // Numéro
        currentQuestionElement.textContent =
            currentQuestionIndex + 1;


        // Paroles
        lyricsElement.textContent =
            question.lyrics;


        // Nettoyage des champs
        artistInput.value = "";
        titleInput.value = "";


        // Afficher les réponses
        answerCard.style.display = "block";


        // Cacher le résultat
        resultCard.style.display = "none";


        // Réactiver le bouton
        validateButton.disabled = false;


        // Curseur dans le champ artiste
        artistInput.focus();

    }


    // =========================================================
    // SCORE
    // =========================================================

    function updateScore() {

        scoreElement.textContent =
            score;

    }


    // =========================================================
    // VÉRIFICATION
    // =========================================================

    function checkAnswer() {

        if (
            currentQuestionIndex >=
            gameQuestions.length
        ) {

            return;

        }


        const question =
            gameQuestions[currentQuestionIndex];


        const playerArtist =
            normalizeText(
                artistInput.value
            );


        const playerTitle =
            normalizeText(
                titleInput.value
            );


        const expectedArtist =
            normalizeText(
                question.artist
            );


        const expectedTitle =
            normalizeText(
                question.title
            );


        let points = 0;


        // -----------------------------------------------------
        // ARTISTE
        // -----------------------------------------------------

        if (
            playerArtist !== "" &&
            playerArtist === expectedArtist
        ) {

            points++;

        }


        // -----------------------------------------------------
        // TITRE
        // -----------------------------------------------------

        if (
            playerTitle !== "" &&
            playerTitle === expectedTitle
        ) {

            points++;

        }


        // Ajouter les points
        score += points;


        updateScore();


        // Afficher le résultat
        showResult(
            question,
            points
        );

    }


    // =========================================================
    // AFFICHER LE RÉSULTAT
    // =========================================================

    function showResult(
        question,
        points
    ) {

        // Désactiver la validation
        validateButton.disabled = true;


        // Cacher la zone de réponse
        answerCard.style.display = "none";


        // Afficher les bonnes réponses
        correctArtist.textContent =
            question.artist;


        correctTitle.textContent =
            question.title;


        pointsEarned.textContent =
            points;


        // -----------------------------------------------------
        // RÉSULTAT SELON LE SCORE
        // -----------------------------------------------------

        if (points === 2) {

            resultIcon.textContent = "🎉";

            resultTitle.textContent =
                "Excellent !";

            resultMessage.textContent =
                "Tu as trouvé l'artiste et le titre !";

        }

        else if (points === 1) {

            resultIcon.textContent = "👍";

            resultTitle.textContent =
                "Bien joué !";

            resultMessage.textContent =
                "Tu as trouvé une des deux réponses.";

        }

        else {

            resultIcon.textContent = "❌";

            resultTitle.textContent =
                "Dommage !";

            resultMessage.textContent =
                "Tu feras mieux à la prochaine.";

        }


        // Afficher la carte
        resultCard.style.display = "block";


        // Modifier le bouton selon la situation
        if (
            currentQuestionIndex >=
            gameQuestions.length - 1
        ) {

            nextQuestionButton.textContent =
                "Voir mon score 🏆";

        }

        else {

            nextQuestionButton.textContent =
                "Question suivante →";

        }

    }


    // =========================================================
    // QUESTION SUIVANTE
    // =========================================================

    function nextQuestion() {

        currentQuestionIndex++;


        // -----------------------------------------------------
        // FIN DU QUIZ
        // -----------------------------------------------------

        if (
            currentQuestionIndex >=
            gameQuestions.length
        ) {

            endGame();

            return;

        }


        // Question suivante
        displayQuestion();

    }


    // =========================================================
    // FIN DU JEU
    // =========================================================

    function endGame() {

        answerCard.style.display =
            "none";


        resultCard.style.display =
            "block";


        resultIcon.textContent =
            "🏆";


        resultTitle.textContent =
            "Partie terminée !";


        resultMessage.textContent =
            "Voici ton score final :";


        correctArtist.parentElement.style.display =
            "none";


        correctTitle.parentElement.style.display =
            "none";


        pointsEarned.textContent =
            score +
            " / " +
            (gameQuestions.length * 2);


        const pointsLabel =
            document.querySelector(
                ".points-earned"
            );


        if (pointsLabel) {

            pointsLabel.innerHTML =
                "🏆 Score final : <span id=\"points-earned\">" +
                score +
                " / " +
                (gameQuestions.length * 2) +
                "</span>";

        }


        nextQuestionButton.textContent =
            "Rejouer 🔄";


        nextQuestionButton.onclick =
            function () {

                window.location.href =
                    "jeu.html";

            };


        currentQuestionElement.textContent =
            gameQuestions.length;

    }


    // =========================================================
    // BOUTON VALIDER
    // =========================================================

    validateButton.addEventListener(
        "click",
        function () {

            checkAnswer();

        }
    );


    // =========================================================
    // BOUTON QUESTION SUIVANTE
    // =========================================================

    nextQuestionButton.addEventListener(
        "click",
        function () {

            nextQuestion();

        }
    );


    // =========================================================
    // TOUCHE ENTRÉE
    // =========================================================

    artistInput.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Enter" &&
                !validateButton.disabled
            ) {

                checkAnswer();

            }

        }
    );


    titleInput.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Enter" &&
                !validateButton.disabled
            ) {

                checkAnswer();

            }

        }
    );


    // =========================================================
    // LANCEMENT
    // =========================================================

    if (prepareGame()) {

        displayQuestion();

        updateScore();

    }

});
