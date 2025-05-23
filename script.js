const btn = document.getElementById("button");
const sectionAll = document.querySelectorAll("section[id]");
const inputName = document.querySelector("#nombre");
const inputEmail = document.querySelector("#email");
const flagsElement = document.getElementById("flags");
const textsToChange = document.querySelectorAll("[data-section]");

/* ===== Loader =====*/
window.addEventListener("load", () => {
    const contenedorLoader = document.querySelector(".container--loader");
    contenedorLoader.style.opacity = 0;
    contenedorLoader.style.visibility = "hidden";
});

/*===== Header =====*/
window.addEventListener("scroll", () => {
    const header = document.querySelector("header");
    header.classList.toggle("abajo", window.scrollY > 0);
});

/*===== Boton Menu =====*/
btn.addEventListener("click", function () {
    if (this.classList.contains("active")) {
        this.classList.remove("active");
        this.classList.add("not-active");
        document.querySelector(".nav_menu").classList.remove("active");
        document.querySelector(".nav_menu").classList.add("not-active");
    } else {
        this.classList.add("active");
        this.classList.remove("not-active");
        document.querySelector(".nav_menu").classList.remove("not-active");
        document.querySelector(".nav_menu").classList.add("active");
    }
});

/*===== class active por secciones =====*/
window.addEventListener("scroll", () => {
    const scrollY = window.pageYOffset;
    sectionAll.forEach((current) => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 100;
        const sectionId = current.getAttribute("id");

        if (scrollY > sectionTop && scrollY < sectionTop + sectionHeight) {
            document
                .querySelector("nav a[href*=" + sectionId + "]")
                .classList.add("active");
        } else {
            document
                .querySelector("nav a[href*=" + sectionId + "]")
                .classList.remove("active");
        }
    });
});

/*===== Boton y función ir arriba =====*/
window.onscroll = function () {
    if (document.documentElement.scrollTop > 100) {
        document.querySelector(".go-top-container").classList.add("show");
    } else {
        document.querySelector(".go-top-container").classList.remove("show");
    }
};

document.querySelector(".go-top-container").addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
});

/*=====  Cartas Volteadas =====*/

function toggleFlip(cardElement) {
    cardElement.classList.toggle("flipped");
}

function toggleFlip(cardElement) {
    if (window.innerWidth <= 980) {
        cardElement.classList.toggle("flipped");
    }
}

/*=====  Cartas Desktop =====*/

document.querySelectorAll(".card").forEach((card) => {
    const btnMostrar = card.querySelector(".bt-mostrar");
    const btnOcultar = card.querySelector(".bt-ocultar");
    const carta2 = card.querySelector(".card-back");

    if (btnMostrar && btnOcultar && carta2) {
        btnMostrar.addEventListener("click", () => {
            carta2.classList.remove("crd-hdn", "animate-fade-left");
            carta2.classList.add("animate-fade-right");
        });

        btnOcultar.addEventListener("click", () => {
            carta2.classList.remove("animate-fade-right");
            carta2.classList.add("animate-fade-left");

            setTimeout(() => {
                carta2.classList.add("crd-hdn");
                carta2.classList.remove("animate-fade-left");
            }, 1000);
        });
    }
});
