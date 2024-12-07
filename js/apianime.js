// Base de la API Jikan para buscar animes
const API_BASE = "https://api.jikan.moe/v4/anime";

// Elementos del DOM
const animeSearch = document.getElementById("animeSearch");
const searchBtn = document.getElementById("searchBtn");
const pagination = document.getElementById("pagination");
const resultsContainer = document.createElement("div");
resultsContainer.id = "dataAlbum";
resultsContainer.className = "container mt-4 d-flex flex-wrap justify-content-center";
document.body.appendChild(resultsContainer);

// Función para buscar animes
function buscarAnime(query = "", page = 1) {
    const url = query ? `${API_BASE}?q=${query}&page=${page}` : `${API_BASE}?page=${page}`;

    fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Error en la respuesta de la API");
            }
            return response.json();
        })
        .then((json) => {
            mostrarAnimes(json.data); // Mostrar los resultados
            generarPaginacion(json.pagination, query); // Generar la paginación
        })
        .catch((error) => {
            console.error("Error al consumir la API:", error);
            resultsContainer.innerHTML = "<h3>Error al obtener datos. Intenta de nuevo.</h3>";
        });
}

function mostrarAnimes(animes) {
    const dataAlbum = document.getElementById("dataAlbum");
    dataAlbum.innerHTML = ""; // Limpiar contenido previo

    animes.forEach((anime) => {
        const card = `
            <div class="col">
                <div class="card h-100">
                    <img src="${anime.images.jpg.image_url}" class="card-img-top" alt="${anime.title}">
                    <div class="card-body">
                        <h5 class="card-title">${anime.title}</h5>
                        <p class="card-text">Episodios: ${anime.episodes || "Desconocido"}</p>
                        <a href="${anime.url}" class="btn btn-primary" target="_blank">Ver más</a>
                    </div>
                </div>
            </div>`;
        dataAlbum.innerHTML += card;
    });
}

// Función para generar la paginación
function generarPaginacion(paginationData, query) {
    pagination.innerHTML = ""; // Limpiar la paginación previa
    if (paginationData.last_visible_page > 1) {
        for (let i = 1; i <= paginationData.last_visible_page; i++) {
            const pageItem = document.createElement("li");
            pageItem.className = "page-item";
            pageItem.innerHTML = `<button class="page-link">${i}</button>`;
            if (i === paginationData.current_page) {
                pageItem.classList.add("active");
            }
            pageItem.addEventListener("click", () => buscarAnime(query, i));
            pagination.appendChild(pageItem);
        }
    }
}

// Escuchar clic en el botón de búsqueda
searchBtn.addEventListener("click", () => {
    const query = animeSearch.value.trim();
    if (query) {
        buscarAnime(query);
    } else {
        alert("Por favor, ingresa el nombre de un anime.");
    }
});

// También puedes habilitar la búsqueda al presionar "Enter" en el input
animeSearch.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        searchBtn.click();
    }
});

// Búsqueda inicial al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    buscarAnime(); // Sin parámetros, buscará animes populares o genéricos
});
