document.addEventListener("DOMContentLoaded", function () {

    const bouton = document.getElementById("validate-answer");

    bouton.addEventListener("click", function () {

        const artist = document.getElementById("artist").value;
        const title = document.getElementById("title").value;

        alert(
            "Réponse reçue !\n\n" +
            "Artiste : " + artist + "\n" +
            "Titre : " + title
        );

    });

});
