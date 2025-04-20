const boton = document.getElementById("jugar");
const opciones = ["piedra", "papel", "tijera"];

// 🔢 DESAFÍO 2: Inicializamos los contadores
let contadorGanadas = 0;
let contadorPerdidas = 0;
let contadorEmpatadas = 0;

boton.addEventListener("click", () => {
    const input = document.getElementById("jugador");

    const indice = Math.floor(Math.random() * 3);
    const pc = opciones[indice];
    const jugador = input.value.toLowerCase(); // Convertimos el texto a minúsculas

    let resultado = "";

    // Lógica del juego
    if (jugador === "piedra") {
        if (pc === "papel") {
            resultado = "Perdiste! La computadora eligió papel";
        } else if (pc === "tijera") {
            resultado = "Ganaste! La computadora eligió tijera";
        } else {
            resultado = "Empate! La computadora eligió piedra";
        }
    } else if (jugador === "papel") {
        if (pc === "tijera") {
            resultado = "Perdiste! La computadora eligió tijera";
        } else if (pc === "piedra") {
            resultado = "Ganaste! La computadora eligió piedra";
        } else {
            resultado = "Empate! La computadora eligió papel";
        }
    } else if (jugador === "tijera") {
        if (pc === "piedra") {
            resultado = "Perdiste! La computadora eligió piedra";
        } else if (pc === "papel") {
            resultado = "Ganaste! La computadora eligió papel";
        } else {
            resultado = "Empate! La computadora eligió tijera";
        }
    } else {
        resultado = "Opción no válida. Elige piedra, papel o tijera.";
    }

    // Mostramos el resultado
    const p = document.getElementById("resultado");
    p.innerHTML = resultado;

    // DESAFÍO 1: Cambiar el color del texto según el resultado
    if (resultado.includes("Ganaste")) {
        p.style.color = "green"; // Ganó → verde

        // DESAFÍO 2: Aumentar contador de ganadas
        contadorGanadas++;
        document.getElementById("ganadas").innerText = contadorGanadas;
    } else if (resultado.includes("Perdiste")) {
        p.style.color = "red"; // Perdió → rojo

        // DESAFÍO 2: Aumentar contador de perdidas
        contadorPerdidas++;
        document.getElementById("perdidas").innerText = contadorPerdidas;
    } else if (resultado.includes("Empate")) {
        p.style.color = "goldenrod"; // Empate → amarillo/dorado

        // DESAFÍO 2: Aumentar contador de empates
        contadorEmpatadas++;
        document.getElementById("empatadas").innerText = contadorEmpatadas;
    } else {
        // Si la opción no fue válida
        p.style.color = "black";
    }
});
