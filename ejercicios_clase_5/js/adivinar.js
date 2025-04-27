// Ejercicios 1, 2 y 3//
// Capturar elementos
const inputTexto = document.getElementById("inputTexto");
const botonEnviar = document.getElementById("botonEnviar");
const resultado = document.getElementById("resultado");

// Definir palabra fija (ejercicio 2)
const palabraCorrecta = "manzana";

// Array de frutas (ejercicio 3)
const frutas = ["banana", "naranja", "pera", "uva", "frutilla"];

botonEnviar.addEventListener("click", () => {
    resultado.innerText = ""; // Limpiar resultado anterior

    const textoUsuario = inputTexto.value.toLowerCase();

    // Mostrar lo ingresado (ejercicio 1)
    resultado.innerText = "Ingresaste: " + textoUsuario + ".\n\n"; //  \n agrega un salto de línea al final para que el resultado aparezca abajo.

    // Comparar palabra fija (ejercicio 2)
    if (textoUsuario === palabraCorrecta) {
        resultado.innerText += "¡Ganaste! Adivinaste la palabra secreta.\n"; // Se usa += para ir concatenando texto sin borrar el que ya se agregó.
    } else {
        // Si no adivinó la palabra fija, mostrar mensaje de derrota (ejercicio 2):
        resultado.innerText += "No adivinaste la palabra secreta.\n"; // Mostrar mensaje de derrota antes de seguir con el ejercicio 3

        // Adivinar una fruta aleatoria (ejercicio 3)
        const frutaAleatoria = frutas[Math.floor(Math.random() * frutas.length)];

        if (textoUsuario === frutaAleatoria) {
            resultado.innerText += "¡Adivinaste la fruta aleatoria! Era: " + frutaAleatoria + ".";
        } else {
            resultado.innerText += "No adivinaste la fruta aleatoria. Era: " + frutaAleatoria + ".";
        }
    }
});
