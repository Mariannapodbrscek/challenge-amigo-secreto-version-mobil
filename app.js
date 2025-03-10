// Declaración de variables para los sonidos y la lista de amigos
let sonidoAdicionar, sonidoSortear, sonidoReiniciar;
let amigo = []; // Cambié amigos a amigo

// Esta función se ejecuta cuando la página ha cargado completamente
window.onload = function() {
    // Carga de los archivos de sonido, los cuales se utilizarán en las interacciones
    sonidoAdicionar = new Audio('assets/adicionar.mp3'); // Sonido para cuando se agrega un amigo
    sonidoSortear = new Audio('assets/sortear.mp3'); // Sonido para cuando se realiza el sorteo
    sonidoReiniciar = new Audio('assets/reiniciar.mp3'); // Sonido para cuando se reinicia la aplicación
};

// Función para agregar un nuevo amigo a la lista
function agregarAmigo() {
    const input = document.getElementById('amigo'); // Obtiene el valor del campo de texto
    const nombre = input.value.trim(); // Elimina los espacios en blanco al inicio y al final del nombre ingresado

    // Verifica si el nombre no está vacío
    if (!nombre) {
        alert("Por favor, inserte un nombre."); // Si el campo está vacío, muestra un mensaje de alerta
        return; // Detiene la ejecución si el campo está vacío
    }

    amigo.push(nombre); // Si hay un nombre, lo agrega al arreglo 'amigo'
    actualizarLista(); // Actualiza la lista de amigos en la interfaz
    input.value = ''; // Limpia el campo de entrada para un nuevo nombre

    // Reproduce el sonido de adición si está cargado
    if (sonidoAdicionar) {
        sonidoAdicionar.play();
    }

    // Muestra cuántos amigos faltan para sortear
    mostrarFaltantes();
}

// Función para actualizar la lista de amigos en la interfaz
function actualizarLista() {
    const lista = document.getElementById('lista-amigos'); // Obtiene el elemento de la lista de amigos
    lista.innerHTML = ''; // Limpia la lista antes de actualizarla

    // Recorre el arreglo 'amigo' y agrega cada amigo a la lista en la interfaz
    amigo.forEach((amigo, index) => {  // Cambié amigos por amigo
        const li = document.createElement('li'); // Crea un nuevo elemento de lista (<li>)
        li.textContent = `${index + 1}. ${amigo}`; // Agrega el nombre del amigo junto con su número

        // Crea un botón para eliminar el amigo
        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'x'; // Texto del botón
        botonEliminar.classList.add('btn-eliminar'); // Agrega una clase al botón para estilos CSS
        botonEliminar.onclick = () => eliminarAmigo(index); // Asigna una función para eliminar el amigo cuando se hace clic

        li.appendChild(botonEliminar); // Agrega el botón de eliminar al <li>
        lista.appendChild(li); // Agrega el <li> con el nombre y el botón a la lista en la interfaz
    });
}

// Función para eliminar un amigo de la lista
function eliminarAmigo(indice) {
    amigo.splice(indice, 1); // Elimina el amigo del arreglo 'amigo' usando su índice
    actualizarLista(); // Vuelve a actualizar la lista después de la eliminación

    // Muestra cuántos amigos faltan para sortear
    mostrarFaltantes();
}

// Función para mostrar cuántos amigos faltan para sortear
function mostrarFaltantes() {
    const faltan = 3 - amigo.length; // Calcula cuántos amigos faltan (ahora usando amigo en lugar de amigos)
    if (faltan === 1) {
        alert(`Te falta 1 amigo para sortear.`); // Si falta 1 amigo
    } else if (faltan > 1) {
        alert(`Te faltan ${faltan} amigos para sortear.`); // Si faltan más de 1 amigo
    }
}

// Función para realizar el sorteo de un amigo al azar
function sortearAmigo() {
    if (amigo.length < 3) { // Verifica si hay al menos 3 amigos en la lista
        alert("Se necesita ingresar al menos a 3 amigos para hacer el sorteo");
        return; // Si no hay suficientes amigos, se detiene la ejecución
    }

    const indiceAleatorio = Math.floor(Math.random() * amigo.length); // Genera un índice aleatorio
    const amigoSorteado = amigo.splice(indiceAleatorio, 1)[0]; // Extrae al amigo sorteado del arreglo y lo almacena

    // Muestra el resultado del sorteo en la interfaz
    const resultado = document.getElementById('resultado');
    resultado.innerHTML = `<p>El ganador es: <strong>${amigoSorteado}</strong></p>`;  

    // Reproduce el sonido del sorteo si está cargado
    if (sonidoSortear) {
        sonidoSortear.play();
    }

    // Vuelve a actualizar la lista de amigos para reflejar el cambio después del sorteo
    actualizarLista();
}

// Función para reiniciar la aplicación
function reiniciarAplicacion() {
    amigo = []; // Vacia el arreglo de amigos
    actualizarLista(); // Actualiza la lista de amigos en la interfaz (ahora estará vacía)

    // Limpia los resultados del sorteo en la interfaz
    const resultado = document.getElementById('resultado');
    if (resultado) {
        resultado.innerHTML = ''; // Elimina cualquier resultado previo del sorteo
    }

    // Reproduce el sonido de reinicio si está cargado
    if (sonidoReiniciar) {
        sonidoReiniciar.play();
    }
}

// Asigna las funciones a los botones correspondientes en la interfaz
document.getElementById('reinicio').onclick = reiniciarAplicacion; // Botón de reinicio
document.querySelector('.button-add').onclick = agregarAmigo; // Botón de agregar amigo
document.querySelector('.button-draw').onclick = sortearAmigo; // Botón de sortear

// Función para mostrar alerta si el usuario ganó
function verificarGanador() {
    alert("¡Felicidades! Si tu nombre salió elegido como ganador del sorteo, comunícate al número: 555-123-4567 para más detalles.");
} 
