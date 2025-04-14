// Ejercicios clase 3
// Ejercicio 1
// Realizar un programa donde obtenga datos de un usuario (Nombre de usuario, email y contraseña).
// Almacenar estos datos en un objeto.

// Solicitar los datos al usuario con "prompt" para que el usuario ingrese datos manualmente y se guarden en variables.
let nombre = prompt("Ingrese su nombre de usuario:");
let email = prompt("Ingrese su email:");
let password = prompt("Ingrese su contraseña:");

// Crear un objeto literal con los datos para representar el usuario como entidad.
const usuario = {
    nombre: nombre,
    email: email,
    password: password,
};

console.log("Usuario creado:", usuario);

// Ejercicio 2
// Agregado al ejercicio anterior, permitir que el programa me pida los datos de 5 usuarios.
// Almacenar cada usuario en un objeto y agregar cada usuario en un array de usuarios.

// Crear un array vacío que va a guardar todos los usuarios
const usuarios = [];

// Usar un bucle "for" para repetir el ingreso de datos 5 veces
for (let i = 0; i < 5; i++) {
    // Usar concatenación con + . Se usa (i + 1) para que en la pantalla aparezca "usuario número 1", "usuario número 2", etc., en vez de empezar en 0.
    let nombre = prompt("Ingrese el nombre de usuario número " + (i + 1) + ":");
    let email = prompt("Ingrese el email del usuario número " + (i + 1) + ":");
    let password = prompt("Ingrese la contraseña del usuario número " + (i + 1) + ":");

    // Crear un objeto por cada usuario
    const usuario = {
        nombre: nombre,
        email: email,
        password: password,
    };

    // Agregarlo al array de usuarios
    usuarios.push(usuario);
}

// Mostrar la lista completa de usuarios en la consola
console.log("Lista de usuarios:", usuarios);

// Ejercicio 3
// Crear un elemento p en el HTML y modificar el innerText con cualquier otro texto que quieran insertar.
// Seleccionar el elemento <p id="parrafoEjemplo">
const parrafo = document.querySelector("#parrafoEjemplo");

// Cambiamos el texto del párrafo utilizando innerText
parrafo.innerText = "Texto modificado desde JavaScript 😄";
