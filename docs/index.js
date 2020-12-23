//API Documentation: https://breakingbadapi.com/documentation
//const urlRandom = 'https://breakingbadapi.com/api/characters/random';
const url = 'https://www.breakingbadapi.com/api/characters';
let characters = [];
let charactersEstado = [];

// Funcion asincrona que trea los datos de la api.
const apiFetch = async (url) => {
    try {
        const data = await fetch(url);
        characters = await data.json();
    } catch (err) {
        console.error(err);
    }
}
//Borra cada personaje del DOM.
const borrarCard = (id) => {
    document.getElementById(id).remove();

}
//Busqueda personaje por nombre.
const buscar = () => {
    let resultadoBusqueda = [];
    const valor = document.getElementById('input-buscar').value.toUpperCase();
    characters.map((character) => {
        nombre = character.name.toUpperCase();
        if (nombre.includes(valor)) resultadoBusqueda.push(character);
        mostrar(resultadoBusqueda);
    });
}
//Funcion devuelve un array con un personaje random.
const random1 = () => {
    let resultadoBusqueda = [];
    let idRandom = Math.floor(Math.random()*62+1);
    resultadoBusqueda.push(characters[idRandom]);
    mostrar(resultadoBusqueda);
}
//Crea el Nodo card que muestra el personaje
const createNode = ({ name, img, char_id, status, portrayed, nickname, birthday, occupation }) => {
    const node =
        `<div name='card' class='marco-card' id="${char_id}">
            <button id="btn-cerrar" onClick="borrarCard(${char_id})">X</button>
            <div class='cont-desc'>
                <div class='img-content'>
                    <img class='char-img' src='${img}'/>
                </div>
                <div class='descripcion'>
                    <h2>${name}</h2>
                    <p>Actor: ${portrayed}</p>
                    <p>Alias: ${nickname}</p>
                    <p>Status: ${status}</p>
                    <p>Roles:${occupation.map(e=>` ${e}`)}.</p>
                    <p>Cumpleaños: ${birthday}</p>
                </div>
            </div>
        </div>`
    return node;
}
//Muestra solo lo que se manda por array.
const mostrar = (array) => {
    characters.map((e) => {
        if (document.getElementById(e.char_id))
            document.getElementById(e.char_id).remove();//Elimina del DOM
    });
    array.map(elemento => {
        const html = createNode(elemento);
        document.getElementById('marco-cards').insertAdjacentHTML('beforeend', html);
    });
}

//Inicia al cargar el DOM
const start = async () => {
    await apiFetch(url); //Carga la data en characters
    document.getElementById('input-buscar').addEventListener('change', () => buscar());
    document.getElementById('btn-random').addEventListener('click', () => random1());
    document.getElementById('btn-recargar').addEventListener('click', () => mostrar(characters));
    mostrar(characters);
}
window.onload = start();