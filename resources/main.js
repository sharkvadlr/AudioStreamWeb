document.addEventListener("DOMContentLoaded", () => {
    const canciones = [
        { titulo: "Alone - Alan Walker", archivo: "resources/songs/Alone - Alan Walker (320).mp3", portada: "resources/img/alone - alan walker.jpg" },
        { titulo: "Desesperado - José José", archivo: "resources/songs/Desesperado - José José (320).mp3", portada: "resources/img/Desesperado.jpg" },
        { titulo: "Dynamite", archivo: "resources/songs/Dynamite.mp3", portada: "resources/img/dynamite.png" },
        { titulo: "Fly Me To The Moon", archivo: "resources/songs/Fly Me To The Moon pero lo canta Ozuna.mp3", portada: "resources/img/fly to the moon.jpg" },
        { titulo: "In And Out Of Love", archivo: "resources/songs/In_And_Out_Of_Love_Slowed_Version_Armin_van_Buuren_Sharon_den_Adel.mp3", portada: "resources/img/in and out of love.jpg" },
        { titulo: "OIIA OIIA", archivo: "resources/songs/OIIA OIIA (Spinning Cat) - WW (320).mp3", portada: "resources/img/OIIA OIIA.jpg" },
        { titulo: "Preso - José José", archivo: "resources/songs/Preso - José José (320).mp3", portada: "resources/img/Preso.jpg" },
        { titulo: "Quiero Perderme Contigo", archivo: "resources/songs/Quiero Perderme Contigo - José José (320).mp3", portada: "resources/img/quiero perderme contigo.jpg" },
        { titulo: "The Spectre - Alan Walker", archivo: "resources/songs/The Spectre - Alan Walker (320).mp3", portada: "resources/img/the spectre.jpg" },
        { titulo: "Too Many Chances", archivo: "resources/songs/Too Many Chances.mp3", portada: "resources/img/too many chances.jpg" }
    ];

    const audioPlayer = document.getElementById("audio-player");
    const listaUI = document.getElementById("lista-canciones");
    const tituloTxt = document.getElementById("titulo");
    const imagenCancion = document.getElementById("imagen-cancion");
    const btnPlayPause = document.getElementById("btn-play-pause");
    const btnAnteriorRep = document.getElementById("btn-anterior-reproductor");
    const btnSiguienteRep = document.getElementById("btn-siguiente-reproductor");
    const rangoVolumen = document.getElementById("volumen");
    const barraProgreso = document.getElementById("barra-progreso");
    const tiempoActualTxt = document.getElementById("tiempo-actual");
    const duracionTotalTxt = document.getElementById("duracion-total");
    let indiceActual = 0;
    let actualizandoProgreso = false;

    function formatearTiempo(segundos) {
        if (isNaN(segundos)) return "0:00";
        const minutos = Math.floor(segundos / 60);
        const segsRestantes = Math.floor(segundos % 60);
        return `${minutos}:${segsRestantes < 10 ? '0' : ''}${segsRestantes}`;
    }

    function cargarCancion(index) {
        tituloTxt.textContent = canciones[index].titulo;
        audioPlayer.src = canciones[index].archivo;
        if (canciones[index].portada) {
            imagenCancion.src = canciones[index].portada;
            imagenCancion.style.display = "inline-block";
        } else {
            imagenCancion.style.display = "none";
        }
        audioPlayer.play();
        btnPlayPause.textContent = "⏸";
        btnPlayPause.className = "btn btn-warning btn-sm px-4";
    }

    canciones.forEach((cancion, index) => {
        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center py-2";
        li.textContent = cancion.titulo;
        li.addEventListener("click", () => {
            indiceActual = index;
            cargarCancion(indiceActual);
        });
        listaUI.appendChild(li);
    });

    btnPlayPause.addEventListener("click", () => {
        if (!audioPlayer.src) {
            cargarCancion(indiceActual);
            return;
        }
        if (audioPlayer.paused) {
            audioPlayer.play();
            btnPlayPause.textContent = "⏸";
            btnPlayPause.className = "btn btn-warning btn-sm px-4";
        } else {
            audioPlayer.pause();
            btnPlayPause.textContent = "▶";
            btnPlayPause.className = "btn btn-success btn-sm px-4";
        }
    });

    function siguienteCancion() {
        indiceActual = (indiceActual + 1) % canciones.length;
        cargarCancion(indiceActual);
    }

    function anteriorCancion() {
        indiceActual = (indiceActual - 1 + canciones.length) % canciones.length;
        cargarCancion(indiceActual);
    }

    btnSiguienteRep.addEventListener("click", siguienteCancion);
    btnAnteriorRep.addEventListener("click", anteriorCancion);

    rangoVolumen.addEventListener("input", (e) => {
        audioPlayer.volume = e.target.value;
    });

    audioPlayer.addEventListener("loadedmetadata", () => {
        duracionTotalTxt.textContent = formatearTiempo(audioPlayer.duration);
        barraProgreso.max = audioPlayer.duration;
    });

    audioPlayer.addEventListener("timeupdate", () => {
        if (!actualizandoProgreso) {
            barraProgreso.value = audioPlayer.currentTime;
            tiempoActualTxt.textContent = formatearTiempo(audioPlayer.currentTime);
        }
    });

    barraProgreso.addEventListener("mousedown", () => {
        actualizandoProgreso = true;
    });

    barraProgreso.addEventListener("input", () => {
        tiempoActualTxt.textContent = formatearTiempo(barraProgreso.value);
    });

    barraProgreso.addEventListener("mouseup", () => {
        audioPlayer.currentTime = barraProgreso.value;
        actualizandoProgreso = false;
    });

    barraProgreso.addEventListener("touchstart", () => {
        actualizandoProgreso = true;
    });

    barraProgreso.addEventListener("touchend", () => {
        audioPlayer.currentTime = barraProgreso.value;
        actualizandoProgreso = false;
    });
});