const btn = document.getElementById("button");
const sectionAll = document.querySelectorAll("section[id]");
const inputName = document.querySelector("#nombre");
const inputEmail = document.querySelector("#email");
const flagsElement = document.getElementById("flags");
const textsToChange = document.querySelectorAll("[data-section]");
const cartCount = document.getElementById("cartCount");

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

/*====== Carrito de Compras ======*/

const carrito = [];
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartContainer = document.getElementById("cartContainer");
const cartToggle = document.getElementById("cartToggle"); // tu imagen con clase logo__shop
const closeCart = document.getElementById("closeCart");

function renderCart() {
    cartItems.innerHTML = "";

    if (carrito.length === 0) {
        cartItems.innerHTML = "<p>Tu carrito está vacío.</p>";
        cartTotal.textContent = "0.00";
        cartCount.textContent = "0";
        cartCount.style.display = "none";
        return;
    }

    let total = 0;

    carrito.forEach((item, index) => {
        const div = document.createElement("div");
        div.classList.add("cart-item");
        div.innerHTML = `
            <p>${item.nombre} - $${item.precio.toFixed(2)}</p>
            <button class="remove-btn" data-index="${index}">Eliminar</button>
        `;
        cartItems.appendChild(div);
        total += item.precio;
    });

    cartTotal.textContent = total.toFixed(2);

    document.querySelectorAll(".remove-btn").forEach((btn) => {
        btn.addEventListener("click", (e) => {
            const index = e.target.dataset.index;
            carrito.splice(index, 1);
            renderCart();
        });
    });

    cartCount.textContent = carrito.length;
    cartCount.style.display = carrito.length > 0 ? "flex" : "none";
}

function addToCart(producto) {
    carrito.push(producto);
    renderCart();
    cartCount.textContent = carrito.length;
    cartCount.style.display = carrito.length > 0 ? "flex" : "none";
    cartCount.classList.add("cart-count-bounce");
    setTimeout(() => {
        cartCount.classList.remove("cart-count-bounce");
    }, 400);
}


document.querySelectorAll(".card_plan--button").forEach((button, index) => {
    button.addEventListener("click", () => {
        const card = button.closest(".cards--plan");
        const nombre = card
            .querySelector(".card_plan--tittle-1")
            .textContent.trim();
        const precioTexto = card
            .querySelector(".card_plan--tittle-2")
            .textContent.trim();
        const precio = parseFloat(precioTexto.replace("$", ""));

        const producto = {
            id: index + 1,
            nombre,
            precio,
        };

        addToCart(producto);
    });
});

cartToggle.addEventListener("click", () => {
    cartContainer.classList.toggle("open");
});

closeCart.addEventListener("click", () => {
    cartContainer.classList.remove("open");
});

/*====== ASISTENTE DE IA ======*/

const chatBox = document.getElementById("chatBox");
const chatMessages = document.getElementById("chatMessages");
const chatOptions = document.getElementById("chatOptions");
const chatIcon = document.getElementById("chatIcon");
const chatToggle = document.getElementById("chatToggle");

let chatOpen = false;

function toggleChat() {
    chatOpen = !chatOpen;
    chatBox.style.display = chatOpen ? "flex" : "none";
    chatBox.style.flexDirection = "column";
    chatIcon.src = chatOpen
        ? "https://cdn-icons-png.flaticon.com/512/1828/1828778.png"
        : "https://cdn-icons-png.flaticon.com/512/2462/2462719.png";

    if (chatOpen) {
        clearMessages();
        appendMessage(
            "¡Hola! Bienvenido al asistente virtual, ¿en qué podemos ayudarte?",
            false
        );
        mostrarOpciones();
    }
}

function clearMessages() {
    chatMessages.innerHTML = "";
}

function sendMessage() {
    const input = document.getElementById("chatInput");
    const text = input.value.trim();
    if (text === "") return;

    appendMessage(text, true);
    input.value = "";

    setTimeout(() => {
        clearMessages();
        appendMessage("¡Bienvenido! ¿En qué podemos ayudarte?", false);
        mostrarOpciones();
    }, 500);
}

function appendMessage(text, isUser) {
    const div = document.createElement("div");
    div.textContent = text;
    div.style.margin = "10px 0";
    div.style.padding = "8px 12px";
    div.style.borderRadius = "12px";
    div.style.maxWidth = "80%";
    div.style.backgroundColor = isUser ? "#dcf8c6" : "white";
    div.style.color = "black";
    div.style.alignSelf = isUser ? "flex-end" : "flex-start";
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function mostrarOpciones() {
    chatOptions.innerHTML = "";
    chatOptions.style.display = "block";

    const opciones = [
        { texto: "1. Planes y Precios", accion: mostrarProductos },
        { texto: "2. Contacto", accion: solicitarContacto },
        {
            texto: "3. Envíanos un Gmail",
            accion: () =>
                (window.location.href = "mailto:pixelgrowth.ofc@gmail.com"),
        },
    ];

    opciones.forEach((op) => {
        const btn = document.createElement("button");
        btn.textContent = op.texto;
        btn.onclick = op.accion;
        chatOptions.appendChild(btn);
    });
}

function mostrarProductos() {
    clearMessages();
    chatOptions.style.display = "none";

    const productos = [
        { id: 1, nombre: "Landing con HTML Y CSS", precio: 15.99 },
        { id: 2, nombre: "Página con Wix o Blogger", precio: 12.99 },
        { id: 3, nombre: "Publicidad en Tiktok + IG", precio: 11.99 },
        { id: 4, nombre: "Paquete Pro: HTML + CSS + IG + Tik Tok", precio: 24.99 },
    ];

    appendMessage("Aquí tienes nuestros productos:", false);

    productos.forEach((producto) => {
    const wrapper = document.createElement("div");
    wrapper.className = "producto-wrapper";

    const div = document.createElement("div");
    div.style.backgroundColor = "#fff";
    div.style.padding = "10px";
    div.style.borderRadius = "8px";
    div.style.fontFamily = "Winky";
    div.style.fontSize = "1.8rem";
    div.textContent = `${producto.nombre} - $${producto.precio.toFixed(2)}`;

    const botonCarrito = document.createElement("button");
    const img = document.createElement("img");
        img.src = "assets/images/shop-car.png";
        img.alt = "Añadir al carrito";
        img.style.width = "20px";
        img.style.height = "20px";
        botonCarrito.appendChild(img);
    botonCarrito.className = "boton-carrito-flotante";

    botonCarrito.onclick = () => {
        addToCart({
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
        });
    };

    wrapper.appendChild(div);
    wrapper.appendChild(botonCarrito);
    chatMessages.appendChild(wrapper);
});


        div.appendChild(info);
        div.appendChild(botonCarrito);
        chatMessages.appendChild(div);
    };

    chatMessages.scrollTop = chatMessages.scrollHeight;



function solicitarContacto() {
    clearMessages();
    chatOptions.style.display = "none";
    appendMessage("Por favor, ingresa tus datos de contacto:", false);

    const inputGroup = document.createElement("div");
    inputGroup.className = "input-group";

    const nameInput = document.createElement("input");
    nameInput.placeholder = "Tu nombre";
    nameInput.id = "nameInput";

    const emailInput = document.createElement("input");
    emailInput.placeholder = "Tu Gmail";
    emailInput.id = "emailInput";

    const subjectInput = document.createElement("input");
    subjectInput.placeholder = "Asunto";
    subjectInput.id = "subjectInput";
    
    const sendBtn = document.createElement("button");
    sendBtn.textContent = "Enviar";
    sendBtn.onclick = () => {
        const name = document.getElementById("nameInput").value;
        const email = document.getElementById("emailInput").value;
        const subject = document.getElementById("subjectInput").value;

        const mailto = `mailto:pixelgrowth.ofc@gmail.com?subject=Contacto de ${name}&body=Nombre: ${name}%0AEmail: ${email}%0AAsunto: ${subject}`;
        window.location.href = mailto;
    };

    inputGroup.appendChild(nameInput);
    inputGroup.appendChild(emailInput);
    inputGroup.appendChild(subjectInput);
    inputGroup.appendChild(sendBtn);

    chatMessages.appendChild(inputGroup);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}
