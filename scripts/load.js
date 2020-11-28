const menu = document.getElementById("botonMenu");
const botonOscuro = document.getElementById("dark");
const botonClaro = document.getElementById("light");
const mostrarMenu = document.getElementById("menuDesp");
const crear = document.getElementById("button1");
const comenzar = document.getElementById("botonDosInterno");
const gifInterno = document.getElementById("gifInterno");
const capturar = document.getElementById("botonFotoDos");
const capturar2 = document.getElementById("botonFoto");
const listo = document.getElementById("botonFotoListo");
const gif = document.getElementById("gif");
const apiUpload = 'https://upload.giphy.com/v1/gifs';
const apiKey = "bOtJLXAnc1IxJ1NBHGIWKNWom0Nm2VaN";
const defaultUrl = 'https://api.giphy.com/v1/gifs';
const botonesListo = document.getElementById("botonesListoOculto");
const botonesChequeo = document.getElementsByClassName("botonesChequeo")[0];
const mostrar = document.getElementById("contenedorCarga");
const opciones = document.getElementsByClassName("opciones")[0];
const mostrarOtro = document.getElementsByClassName("contenedorChequeo")[0];
const previewGif = document.getElementById("gif_preview");
const contPreview = document.getElementsByClassName("contenedorPreview")[0];
const repetir = document.getElementById("botonRepetir");
const subir = document.getElementById("botonSubir");
const confyrep = document.getElementById("botonesConfirmaryRepetir");
const titulo = document.getElementsByClassName("tituloInner")[0];
const contenedorGif = document.getElementsByClassName("contenedorGifos")[0];
const progressBar1cont = document.querySelector('#bar1');
const progressBar2cont = document.querySelector('#bar2');
const progressBar1 = document.querySelectorAll('#bar1 .progressBarPart');
const contenedorSubiendo = document.getElementById('contenedorSubiendo');
const contenedorFinal = document.getElementsByClassName("contenedorFinal")[0];
const otroGif = document.getElementById("otroGif");
const ultimoBoton = document.getElementById("ultimoBoton");
const botonCancelar = document.getElementById("botonCancelar");
const botonAdentro2 = document.getElementById("botonAdentro2");
const botonAdentro1 = document.getElementById("botonAdentro1");
var stream, recorder, blob;

window.addEventListener("load", () => {
    recorrerStorage();
})

menu.addEventListener('click', () => {
    mostrarMenu.style.display === "none" ?  mostrarMenu.style.display = "block" : mostrarMenu.style.display = "none";
})

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

crear.addEventListener('click', () => {
    mostrar.style.display = "block";
    opciones.style.display = "none";
})

comenzar.addEventListener('click', () => {
        mostrarOtro.style.display = "block";
        mostrar.style.display = "none";
        contenedorGif.style.display = "none";
        getStream();
})

capturar.addEventListener('click', () => {
    botonesListo.style.display = "block";
    botonesChequeo.style.display = "none";
    grabarGif();
})

capturar2.addEventListener('click', () => {
    botonesListo.style.display = "block";
    botonesChequeo.style.display = "none";
    grabarGif();
})

listo.addEventListener('click', () => {
    contPreview.style.display = "block";
    mostrarOtro.style.display = "none";
    stopGif();  
})

repetir.addEventListener('click', () => {
    contPreview.style.display = "none";
    mostrar.style.display = "block"
})

subir.addEventListener('click', () =>{
    confyrep.style.display = "none";
    contPreview.style.display = "none";
    progressBarEffect(progressBar1);
    contenedorSubiendo.style.display = "block";
    setTimeout(function(){ 
        contenedorSubiendo.style.display = "none";
        contenedorFinal.style.display = "block";
        }, 
    3000);
})

botonCancelar.addEventListener('click', () => {
    location.reload();
    eliminarGif();
})

function getStream () { 
    navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
            height: { 
                max: 434,
            }
        }
    })
    .then(function(respuesta) {
        stream = respuesta;
        gifInterno.srcObject = stream;
        gifInterno.play()
    })
    .catch(() => 
        alert("Necesitas una cámara para continuar"));
}


const grabarGif = () => {
    recorder = RecordRTC(stream, {
        type: 'gif',
        frameRate: 1,
        quality: 10,
        width: 360,
        hidden: 240,
        onGifRecordingStarted: () => {
        console.log('started')
        },
    })
    recorder.startRecording()
    recorder.camera = stream;
    titulo.innerHTML = "Capturando Tu Gifo";
}

function uploadGif(data){
    fetch('https://upload.giphy.com/v1/gifs' + '?api_key=' + apiKey, {
    method: 'POST', // or 'PUT'
    body: data,
  }).then(resp => {
    return resp.json();
  }).then(respuesta => {
    fetch(`https://api.giphy.com/v1/gifs/${respuesta.data.id}?api_key=${apiKey}`)
    .then(resp => {
        return resp.json();
    }).then(respuesta => {
        let gifUrl = respuesta.data.images.fixed_height.url;
        localStorage.setItem(`Gif${respuesta.data.id}`,`${gifUrl}`)
        botonAdentro1.addEventListener("click",async()=>{
        await navigator.clipboard.writeText(respuesta.data.images.fixed_height.url)
        alert("se copio el link en el clipboard")
    })
    botonAdentro2.addEventListener("click",() => {
        let a = document.createElement('a');
        a.download = 'myGif.gif';
        a.href = window.URL.createObjectURL(blob);
        a.dataset.downloadurl = ['application/octet-stream', a.download, a.href].join(':');
        a.click();
    })
    ultimoBoton.addEventListener("click",()=>{
        location.reload();
    })
  })
})
}

function recorrerStorage(){
    for(var i = 0; i < localStorage.length; i++){
        let keys = localStorage.key(i)
        if(keys.startsWith("Gif")){
            let item = localStorage.getItem(keys)
            let gifCreado = document.createElement("img");
            gifCreado.classList.add("gifCreado");
            gifCreado.src = item
            contenedorGif.appendChild(gifCreado)
        }
    }
}

function eliminarGif(){
            let item = localStorage.getItem("Gif")
            let gifsArray = nuevoArray[item];
            let gifCorrecto = nuevoArray.pop();
}

function stopRecordingCallBack(){
    recorder.camera.stop();
    blob = recorder.getBlob();
    previewGif.src = URL.createObjectURL(blob)
    otroGif.src = URL.createObjectURL(blob)
    let form = new FormData();
    form.append('file', blob, 'myGif.gif');
    recorder.destroy();
    recorder = null;
    previewGif.style.display = 'block';
    subir.addEventListener('click', () => {
    uploadGif(form);
    })
}
   


const stopGif = () => {
    recorder.stopRecording(stopRecordingCallBack);
}

function progressBarEffect(bar) {
	let cont = 0;
	setInterval(() => {
		if (cont < bar.length) {
			bar[cont].classList.toggle('progressBarPartEnabled');
			cont++;
		} else {
			cont = 0;
		}
    }, 100);
    progressBar1cont.classList.toggle("visible");
}