document.addEventListener("DOMContentLoaded", function () {

    // =========================================================
    // RÉCUPÉRATION DES ÉLÉMENTS HTML
    // =========================================================

    const lyricsElement = document.getElementById("lyrics");
    const currentQuestionElement = document.getElementById("current-question");
    const totalQuestionsElement = document.getElementById("total-questions");

    const artistInput = document.getElementById("artist");
    const titleInput = document.getElementById("title");

    const validateButton = document.getElementById("validate-answer");

    const scoreElement = document.getElementById("score");


    // =========================================================
    // VÉRIFICATION
    // =========================================================

    if (!lyricsElement || !validateButton) {
        console.error("Éléments du quiz introuvables.");
        return;
    }

    if (typeof questions === "undefined") {
        console.error("La liste des questions est introuvable.");
        lyricsElement.textContent = "Erreur : impossible de charger les questions.";
        return;
    }


    // =========================================================
    // RÉCUPÉRATION DES PARAMÈTRES DU JEU
    // =========================================================

    let settings = localStorage.getItem("parolesMysteresSettings");

    if (settings) {
        settings = JSON.parse(settings);
    } else {
        // Paramètres par défaut
        settings = {
            genre: "all",
            era: "all",
            difficulty: "all",
            number: 10
        };
    }


    // =========================================================
    // VARIABLES DU QUIZ
    // =========================================================

    let currentQuestionIndex = 0;
    let score = 0;

    let gameQuestions = [];


    // =========================================================
    // FONCTION DE NORMALISATION
    // Permet de comparer les réponses plus facilement
    // =========================================================

    function normalizeText(text) {

        return text
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^\w\s]/g, "")
            .replace(/\s+/g, " ")
            .trim();

    }


    // =========================================================
    // FILTRAGE DES QUESTIONS
    // =========================================================

    function filterQuestions() {

        let filteredQuestions = questions.filter(function (question) {

            // -------------------------
            // GENRE
            // -------------------------

            if (
                settings.genre !== "all" &&
                question.genre !== settings.genre
            ) {
                return false;
            }


            // -------------------------
            // PÉRIODE
            // -------------------------

            if (settings.era !== "all") {

                if (settings.era === "1960-1979") {
                    if (question.year < 1960 || question.year > 1979) {
                        return false;
                    }
                }

                if (settings.era === "1980-1989") {
                    if (question.year < 1980 || question.year > 1989) {
                        return false;
                    }
                }

                if (settings.era === "1990-1999") {
                    if (question.year < 1990 || question.year > 1999) {
                        return false;
                    }
                }

                if (settings.era === "2000-2009") {
                    if (question.year < 2000 || question.year > 2009) {
                        return false;
                    }
                }

                if (settings.era === "2010-2019") {
                    if (question.year < 2010 || question.year > 2019) {
                        return false;
                    }
                }

                if (settings.era === "2020-2026") {
                    if (question.year < 2020 || question.year > 2026) {
                        return false;
                    }
                }

            }


            // -------------------------
            // DIFFICULTÉ
            // -------------------------

            if (
                settings.difficulty !== "all" &&
                question.difficulty !== settings.difficulty
            ) {
                return false;
            }


            return true;

        });

        return filteredQuestions;
    }


    // =========================================================
    // MÉLANGE ALÉATOIRE
    // =========================================================

    function shuffle(array) {

        let shuffled = [...array];

        for (let i = shuffled.length - 1; i > 0; i--) {

            const randomIndex = Math.floor(
                Math.random() * (i + 1)
            );

            [shuffled[i], shuffled[randomIndex]] =
                [shuffled[randomIndex], shuffled[i]];

        }

        return shuffled;
    }


    // =========================================================
    // PRÉPARATION DU QUIZ
    // =========================================================

    function prepareGame() {

        let filteredQuestions = filterQuestions();

        // Mélange des questions
        filteredQuestions = shuffle(filteredQuestions);

        // Nombre demandé par le joueur
        const numberWanted = Number(settings.number);

        // On ne peut pas demander plus de questions
        // qu'il n'en existe
        gameQuestions = filteredQuestions.slice(
            0,
            numberWanted
        );


        // Aucun résultat
        if (gameQuestions.length === 0) {

            lyricsElement.textContent =
                "Aucune question ne correspond à tes critères.";

            validateButton.disabled = true;

            return false;
        }


        // Mise à jour du nombre total
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


        // Numéro de question
        currentQuestionElement.textContent =
            currentQuestionIndex + 1;


        // Paroles
        lyricsElement.textContent =
            question.lyrics;


        // Vider les réponses précédentes
        artistInput.value = "";
        titleInput.value = "";


        // Réactiver le bouton
        validateButton.disabled = false;


        // Placer automatiquement le curseur
        artistInput.focus();

    }


    // =========================================================
    // AFFICHER LE SCORE
    // =========================================================

    function updateScore() {

        scoreElement.textContent = score;

    }


    // =========================================================
    // VÉRIFICATION DE LA RÉPONSE
    // =========================================================

    function checkAnswer() {

        const question =
            gameQuestions[currentQuestionIndex];


        const playerArtist =
            normalizeText(artistInput.value);

        const playerTitle =
            normalizeText(titleInput.value);


        const correctArtist =
            normalizeText(question.artist);

        const correctTitle =
            normalizeText(question.title);


        let points = 0;


        // =====================================================
        // ARTISTE
        // =====================================================

        if (
            playerArtist !== "" &&
            playerArtist === correctArtist
        ) {
            points += 1;
        }


        // =====================================================
        // TITRE
        // =====================================================

        if (
            playerTitle !== "" &&
            playerTitle === correctTitle
        ) {
            points += 1;
        }


        // Ajout du score
        score += points;

        updateScore();


        // Désactiver le bouton
        validateButton.disabled = true;


        // Message de résultat
        let message = "";


        if (points === 2) {

            message =
                "🎉 Bravo ! Artiste et titre corrects !";

        } else if (points === 1) {

            message =
                "👍 Bien joué ! Une seule réponse est correcte.";

        } else {

            message =
                "❌ Dommage !";

        }


        // Affichage du résultat
        setTimeout(function () {

            alert(
                message +
                "\n\n" +
                "Artiste : " + question.artist +
                "\n" +
                "Titre : " + question.title +
                "\n\n" +
                "Points gagnés : " + points
            );


            // Question suivante
            nextQuestion();

        }, 100);

    }


    // =========================================================
    // QUESTION SUIVANTE
    // =========================================================

    function nextQuestion() {

        currentQuestionIndex++;


        // Fin du quiz
        if (
            currentQuestionIndex >= gameQuestions.length
        ) {

            endGame();

            return;
        }


        displayQuestion();

    }


    // =========================================================
    // FIN DU QUIZ
    // =========================================================

    function endGame() {

        lyricsElement.innerHTML =
            "🏁 <strong>Partie terminée !</strong>";


        artistInput.style.display = "none";
        titleInput.style.display = "none";

        validateButton.style.display = "none";


        currentQuestionElement.textContent =
            gameQuestions.length;


        scoreElement.textContent =
            score;


        // Message final
        setTimeout(function () {

            alert(
                "🏆 Partie terminée !\n\n" +
                "Ton score : " +
                score +
                " / " +
                (gameQuestions.length * 2)
            );

        }, 100);

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
    // VALIDATION AVEC LA TOUCHE ENTRÉE
    // =========================================================

    artistInput.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Enter") {

                checkAnswer();

            }

        }
    );


    titleInput.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Enter") {

                checkAnswer();

            }

        }
    );


    // =========================================================
    // LANCEMENT DU JEU
    // =========================================================

    if (prepareGame()) {

        displayQuestion();

        updateScore();

    }

});
