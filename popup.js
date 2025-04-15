document.addEventListener("DOMContentLoaded", function () {
    const titles = document.querySelectorAll(".clickable-title");
    const clickSound = new Audio("clic.mp3"); // Facultatif

    // Gestion des popups
    titles.forEach(title => {
        title.addEventListener("click", () => {
            const popup = title.nextElementSibling; // Le texte qui suit le titre

            if (clickSound) clickSound.play();

            // Afficher ou masquer le popup au clic
            if (popup.style.display === "block") {
                popup.classList.add("fade-out");
                setTimeout(() => {
                    popup.style.display = "none";
                    popup.classList.remove("fade-in", "fade-out");
                }, 500);
            } else {
                document.querySelectorAll(".popup-text").forEach(p => {
                    p.style.display = "none";
                    p.classList.remove("fade-in", "fade-out");
                });

                popup.style.display = "block";
                popup.classList.add("visible");
            }
        });
    });

    // Fermer les popups si on clique ailleurs
    document.addEventListener("click", function (e) {
        if (!e.target.closest(".popup-section") && !e.target.classList.contains("clickable-title")) {
            document.querySelectorAll(".popup-text").forEach(p => {
                p.classList.add("fade-out");
                setTimeout(() => {
                    p.style.display = "none";
                    p.classList.remove("fade-in", "fade-out");
                }, 500);
            });
        }
    });

    // ✨ Animation d'intro (juste une fois par session)
    const introText = "Bienvenue sur un site qui va vous présenter l'histoire de l'Olympique de Marseille...";
    const introElement = document.getElementById("intro-text");

    if (!sessionStorage.getItem("introShown")) {
        let i = 0;

        function typeText() {
            if (i < introText.length) {
                introElement.innerHTML += introText.charAt(i);
                i++;
                setTimeout(typeText, 50);
            } else {
                setTimeout(() => {
                    introElement.style.transition = "opacity 1s ease";
                    introElement.style.opacity = "0";
                    setTimeout(() => {
                        introElement.remove();
                    }, 1000);
                }, 3000);
            }
        }

        typeText();
        sessionStorage.setItem("introShown", "true");
    } else {
        if (introElement) introElement.remove();
    }

    // Animer les sections au chargement
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        setTimeout(() => {
            section.classList.add('visible');
        }, 500 * index);
    });
});
