const API = "https://pokeapi.co/api/v2/pokemon?limit=10&offset=0";

// Función principal para obtener los Pokémon
function album(api) {
    fetch(api)
        .then((response) => response.json())
        .then((json) => {
            dataFull(json.results);
            // La paginación no tiene `info`, ajustamos
            pagination({
                prev: json.previous,
                next: json.next,
            });
        })
        .catch((error) => {
            console.error(error, "Error al consumir la API");
        });
}

// Función para procesar y mostrar los detalles de cada Pokémon
function dataFull(results) {
    let cards = "";
    results.forEach((pokemon) => {
        fetch(pokemon.url)
            .then((response) => response.json())
            .then((data) => {
                // Construir la tarjeta del Pokémon
                cards += `
                    <div class="col">
                        <div class="card h-100" style="width: 12rem;">
                            <img src="${data.sprites.front_default}" class="card-img-top" alt="${data.name}">
                            <div class="card-body">
                                <h2 class="card-title">${data.name}</h2>
                                <h5 class="card-title">Status: HP ${data.stats[0].base_stat}</h5>
                                <h5 class="card-title">Ataque: ${data.stats[1].base_stat}</h5>
                                <h5 class="card-title">Specie: ${data.species.name}</h5>
                            </div>
                        </div>
                    </div>`;
                // Actualizar las tarjetas en el DOM
                document.getElementById("dataAlbum").innerHTML = cards;
            })
            .catch((error) => console.error("Error al obtener datos del Pokémon:", error));
    });
}

// Función para la paginación
function pagination(info) {
    let prevDisabled = info.prev ? "" : "disabled";
    let nextDisabled = info.next ? "" : "disabled";

    let html = `
        <li class="page-item ${prevDisabled}">
            <a class="page-link" onclick="album('${info.prev}')">Prev</a>
        </li>
        <li class="page-item ${nextDisabled}">
            <a class="page-link" onclick="album('${info.next}')">Next</a>
        </li>`;
    document.getElementById("pagination").innerHTML = html;
}

// Inicializar con la API
album(API);

