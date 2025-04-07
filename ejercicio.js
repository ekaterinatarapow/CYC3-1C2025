// Ejercicio clase 1
// Crear un programa que solicite el Nombre, Apellido, Edad y DNI de un usuario
// Almacenar cada dato dentro de una variable
// Van a mostrar los datos con un alert o con console.log

// Solicitar datos al usuario
let nombre = prompt("Ingrese su nombre:");
let apellido = prompt("Ingrese su apellido:");
let edad = parseInt(prompt("Ingrese su edad:")); // Convertimos a número
let dni = parseInt(prompt("Ingrese su DNI:")); // Convertimos a número

// Mostrar los datos con alert
alert("Nombre: " + nombre + "\nApellido: " + apellido + "\nEdad: " + edad + "\nDNI: " + dni);

// Mostrar los datos en la consola
console.log("Nombre: " + nombre);
console.log("Apellido: " + apellido);
console.log("Edad: " + edad);
console.log("DNI: " + dni);

// Ejercicios clase 2
// Ejercicio 1 (verificar edad)
if (edad >= 18) {
    alert("Puedes ingresar.");
    login();
} else {
    alert("Eres menor de 18, no puedes ingresar.");
}

// Ejercicios 2, 3 y 4 (inicio de sesión)
function login() {
    const usuarioCorrecto = "admin";
    const contrasenaCorrecta = "1234";
    let intentos = 3;

    while (intentos > 0) {
        let usuario = prompt("Ingrese su usuario:");
        let contrasena = prompt("Ingrese su contraseña:");

        if (usuario === usuarioCorrecto && contrasena === contrasenaCorrecta) {
            alert("Inicio de sesión exitoso :D");
            return;
        } else {
            intentos--; // Se resta un intento
            if (intentos > 0) {
                alert("El usuario o la contraseña son incorrectos.");
            } else {
                alert("Error: Has superado el número de intentos permitidos.");
            }
        }
    }
}
