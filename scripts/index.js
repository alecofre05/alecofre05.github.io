const menu = document.getElementById("botonMenu");
const botonOscuro = document.getElementById("dark");
const botonClaro = document.getElementById("light");
const sugerencias = document.getElementById("suge");
const apiBaseUrl = "https://api.giphy.com/v1/gifs/";
const apiKey = "bOtJLXAnc1IxJ1NBHGIWKNWom0Nm2VaN";
const buscador = document.getElementsByClassName("buscador")[0];
const logo = document.getElementsByClassName("logo")[0];
const buscar = document.getElementById("btnBuscar");
const buscarPalabra = document.getElementById("buscarPalabra");
const contTendencias = document.getElementById("tendencias");
const barra = document.getElementsByClassName("tituloTendencias")[0];
const textoLupa = document.getElementsByClassName("textoLupa")[0];
const resultBarra = document.getElementsByClassName("resultados")[0];
const verMas = document.getElementsByClassName("verMas")[0];
const mostrar = document.getElementById("menuDesp");

//Recargar al apretar en logo//
logo.addEventListener("click", () => {
    location.reload();
})





//Evento para mostrar menu desplegable//
menu.addEventListener('click', () => {
        mostrar.style.display === "none" ?  mostrar.style.display = "block" : mostrar.style.display = "none";
})



// desplegar menu de busqueda
buscador.addEventListener('input', () => {
    var mostrarOtro = document.getElementsByClassName("resultados")[0];
    mostrarOtro.classList.remove("oculto")
})

buscador.addEventListener('focusout', () => {
    var mostrarOtro = document.getElementsByClassName("resultados")[0];
    mostrarOtro.classList.add("oculto")
})





//Evento para cambiar a modo oscuro//
botonOscuro.addEventListener('click', () => {
    document.getElementsByTagName('body')[0].classList.remove('lightmode')
    document.getElementsByTagName('body')[0].classList.add('darkmode')
})

botonClaro.addEventListener('click', () => {
    document.getElementsByTagName('body')[0].classList.remove('darkmode')
    document.getElementsByTagName('body')[0].classList.add('lightmode')
})

botonOscuro.addEventListener("click", () => {
    document.getElementsByClassName("logo")[0].src="assets/gifOF_logo_dark.png";
})

botonClaro.addEventListener("click", () => {
    document.getElementsByClassName("logo")[0].src="assets/gifOF_logo.png";
})




// funcion para buscar gif//
function getSearchResults(search) {
    const found = fetch('https://api.giphy.com/v1/gifs/search?q=' + search + '&api_key=' + apiKey)
        .then(response => {
            return response.json();
        })
        .then(data => {
            return data;
        })
        .catch(error => {
            return error;
        });
    return found;
}



//Limpiar contenedor//
function limpiar() {
    contTendencias.innerHTML = '';
}



//Obtener los gif que paso a traves del valor que mando en la barra de busqueda
// y cambiar el nombre de la barra de titulo
buscar.addEventListener("click", () => {
    let obtener = buscarPalabra.value;
        getSearchResults(obtener).then(result => {
        const gif = result.data
        limpiar();
        barra.innerHTML = `<h2>${obtener}</h2>`
        gif.forEach(element =>{
            const div = document.createElement("div")
            div.classList.add("divBusqueda")
            const img = document.createElement('img')
            img.src = element.images.fixed_height.url;
            div.appendChild(img)
            contTendencias.appendChild(div)
        })
        document.getElementsByClassName("lupa")[0].src="assets/lupa_inactive.svg";
        document.getElementsByClassName("textoLupa")[0].style.color = "#B4B4B4";
        document.getElementsByClassName("tituloSugerencias")[0].style.display = "none";
        sugerencias.style.display = "none";
        barra.scrollIntoView();
    })
})





buscar.addEventListener('click', () => {
    document.getElementsByClassName("lupa")[0].src="assets/lupa.svg";
    document.getElementsByClassName("textoLupa")[0].style.color = "black";
})

buscar.addEventListener('mouseover', () => {
    document.getElementsByClassName("lupa")[0].src="assets/lupa.svg";
    document.getElementsByClassName("textoLupa")[0].style.color = "black";
})

buscar.addEventListener('mouseout', () => {
    document.getElementsByClassName("lupa")[0].src="assets/lupa_inactive.svg";
    document.getElementsByClassName("textoLupa")[0].style.color = "#B4B4B4";
})




//Sugerencias//
const suggestedtopics = ["QuentinTarantino", "StephenKing", "PinkFloyd", "TheBeatles"]

function hardcore (suggestedtopics) {
    suggestedtopics.forEach(element => {
        getSearchResults(element).then(result =>{
            let primero = result.data[0]
            let contenedor = document.createElement("div")
            contenedor.classList.add("contenedorDiv1")
            contenedor.innerHTML = `
                <div class='tituloDiv'>
                    <p>#${element}</p>
                    <img src='assets/button close.svg' alt='boton de cerrar'/>
                </div>

                <div class='botonDiv'>
                    <img src=${primero.images.fixed_height.url}/>
                    <button id="verMas" data-search=${element}>Ver más…</button>
                </div>`
            sugerencias.appendChild(contenedor)
        })
    });
}

window.addEventListener("load", () => {
    hardcore(suggestedtopics)
})




//Traer los gif de tendencias//
function trends() {
    const found = fetch(apiBaseUrl + 'trending?api_key=' + apiKey)
        .then(response => {
            return response.json();
        })
        .then(data => {
            return data;
        })
        .catch(error => {
            return error;
        });
    return found;
}

window.addEventListener('load' , () => {
    trends().then(result => {
        const container = document.getElementById('tendencias')
        const divNames = {0: 'uno', 1: 'dos', 2: 'tres', 3: 'cuatro', 4: 'cinco', 5: 'seis', 6: 'siete', 7: 'ocho', 8: 'nueve', 9: 'diez'}
        for(let x = 0; x < 10; x++){
            const gif = result.data[x]
            const div = document.createElement('div')
            const img = document.createElement('img')
            img.src = gif.images.fixed_height.url;
            div.classList.add(divNames[x]);
            div.appendChild(img)
            container.appendChild(div);
        }   
    })
})



//Gif de las opciones debajo de la barra buscadora//
resultBarra.addEventListener('mousedown', (evento) =>{
    getSearchResults(evento.target.dataset.search).then(result =>{
        const gif = result.data
        limpiar();
        barra.innerHTML = `<h2>${evento.target.dataset.search}</h2>`
        gif.forEach(element =>{
            const div = document.createElement("div")
            div.classList.add("divBusqueda")
            const img = document.createElement('img')
            img.src = element.images.fixed_height.url;
            div.appendChild(img)
            contTendencias.appendChild(div)
        })
        barra.scrollIntoView();
    })
})


//Gif apretando botones de ver más//
sugerencias.addEventListener('mousedown', (evento) =>{
    console.log(getSearchResults(evento.target.dataset.search).then(result =>{
        const gif = result.data
        limpiar();
        barra.innerHTML = `<h2>${evento.target.dataset.search}</h2>`
        gif.forEach(element =>{
            const div = document.createElement("div")
            div.classList.add("divBusqueda")
            const img = document.createElement('img')
            img.src = element.images.fixed_height.url;
            div.appendChild(img)
            contTendencias.appendChild(div)
        })
        barra.scrollIntoView();
    }))
    
})








