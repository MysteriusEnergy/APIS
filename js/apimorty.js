const API_ALBUM = 'https://rickandmortyapi.com/api/character';

function getAlbum(api) {
    fetch(api).then((response)=> response.json())
    .then((json)=>{
        dataFull(json.results), pagination(json.info);
    })
    .catch((error) =>{
        console.log(error, "Error al consumir la API");
        
    })
}

function dataFull(results) {
    let cards = '';
    for (let i = 0; i < 10; i++) {
        cards += `<div class="col">
        <div class = "card h-100" style = "width: 12rem;">
        <img src="${results[i].image}" class="card-img-top" alt="img-personaje de ricky">
        <h2 class="card-title" > ${results[i].name} </h2>
        <div class="card-body">
        <h5 class="card-title">Status: ${results[i].status}</h5>
        <h5 class="card-title">Species: ${results[i].species}</h5>
        </div>
        </div>
        </div>
        
        `
    }

    document.getElementById("dataAlbum").innerHTML = cards;
}

function pagination(info) {
    let prevDisabled ="";
    let nextDisabled ="";

    if(!info.prev) {
        prevDisabled = "disabled"
    } 
    if(!info.next) {
        nextDisabled = "disabled"
    }

    let html = `
    <li class="page-item ${prevDisabled}"><a class="page-link" onclick="getAlbum('${info.prev}')" >prev</a></li> 
    <li class="page-item ${nextDisabled}"><a class="page-link" onclick="getAlbum('${info.next}')" >next</a></li>

    `;

    document.getElementById("pagination").innerHTML = html;
}

getAlbum(API_ALBUM)
