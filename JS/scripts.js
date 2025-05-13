// Esperar a que el DOM esté completamente cargado y activar el efecto scroll del menú
/*Evento scroll si no trabajamos con addEventListener window.onscroll + funcion() 
            window.onscroll = function() {esconderMostrarMenu()}
    y para capturar la posicion del scroll
            document.documentElement.scrollTop*/
document.addEventListener('DOMContentLoaded', function () {
    // Activar parallax.js si lo descomento se oculta todo el contenido de la web
    //$('.parallax-window').parallax({imageSrc: '/path/to/image.jpg'});
    // Inicializamos la app principal de AOS Animate On Scroll
    AOS.init();
    // Elemento del modal de los efectos del scroll
    const nav = document.querySelector('nav');
    // Al hacer scroll se aplica o quita la clase 'scrolled' al nav
    window.addEventListener('scroll', function () {
        //cuando scrolly sea mayor de 50px añadimos la clase de CSS scrolled del nav
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            //cuando scrolly sea menor de 50 eliminamos la clase de CSS scrolled del nav
            nav.classList.remove('scrolled');
        }
    });
    //Elemento para pantalla completa de la galeria
    const imagenGrande = document.getElementById('imagenGrande');
    if (imagenGrande) {
        imagenGrande.addEventListener('click', function () {
            if (document.fullscreenElement === imagenGrande) {
                // Si ya está en fullscreen, salimos
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                    // Pasar a la siguiente imagen no consigo hacerlo funcionar!!
                    /*indiceActual = (indiceActual + 1) % imagenesMini.length;
                    imagenGrande.src = imagenesMini[indiceActual].src;*/
                }
            } else {
                // Si no está en fullscreen, lo activamos
                if (imagenGrande.requestFullscreen) {
                    imagenGrande.requestFullscreen();
                }
            }
        });
    }
    // Slideshow automático del hero image del encabezado aparecen imagenes sin efecto de barrido
    /*const encabezado = document.getElementById('encabezado');
    const imagenesHero = [
        "Media/imagenesTaller/heroImageEncabezado1.png",
        "Media/imagenesTaller/heroImageEncabezado2.png",
        "Media/imagenesTaller/heroImageEncabezado3.png",
        "Media/imagenesTaller/heroImageEncabezado4.png"
    ];
    let indiceHero = 0;
    setInterval(() => {
        indiceHero = (indiceHero + 1) % imagenesHero.length;
        encabezado.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('${imagenesHero[indiceHero]}')`;
    }, 5000); // cambia cada 5 segundos */

    // Elemento para gestionar la interacción de las pestañas de SERVICIOS
    // Forma parte de document.addEventListener('DOMContentLoaded', function () {
    const etiquetas = document.querySelectorAll('.etiquetaServicio');
    // Mapeamos los ID de las etiquetas con el ID del contenedor correspondiente
    const relacion = {
        etSM: 'pestMant',
        etSF: 'pestFren',
        etSRA: 'pestRA'
    };

    // Ocultar todas las pestañas al principio
    Object.values(relacion).forEach(id => {
        const contenedor = document.getElementById(id);
        contenedor.classList.add('pestOculta');
        contenedor.style.display = 'none'; // Aseguramos que estén ocultas
    });

    // Mostrar la primera por defecto
    const pestInicial = document.getElementById('pestMant');
    pestInicial.classList.remove('pestOculta');
    pestInicial.style.display = 'block'; // Mostramos la primera

    // Asignar la etiqueta activa al cargar
    document.getElementById('etSM').classList.add('etiquetaActiva');

    // Animación inicial
    document.querySelectorAll('#pestMant .servicio').forEach(serv => {
        serv.classList.remove('animServP');
        void serv.offsetWidth;
        serv.classList.add('animServP');
    });
    // refrescamos las animaciones de scroll para que interactuen las dos animaciones
    AOS.refresh();

    // Control de clic en pestañas
    etiquetas.forEach(etiqueta => {
        etiqueta.addEventListener('click', function () {
            etiquetas.forEach(e => e.classList.remove('etiquetaActiva'));
            this.classList.add('etiquetaActiva');

            // Ocultar todas
            Object.values(relacion).forEach(id => {
                const cont = document.getElementById(id);
                cont.classList.add('pestOculta');
                cont.style.display = 'none';
            });

            // Mostrar la relacionada
            const idEtiqueta = this.id;
            const idPestana = relacion[idEtiqueta];
            if (idPestana) {
                const contenedor = document.getElementById(idPestana);
                contenedor.classList.remove('pestOculta');
                contenedor.style.display = 'block';
                AOS.refresh();

                const servicios = contenedor.querySelectorAll('.servicio');
                servicios.forEach(serv => {
                    serv.classList.remove('animServP');
                    void serv.offsetWidth;
                    serv.classList.add('animServP');
                });
                AOS.refresh();
            }
        });
    });

    // Submenú que activa pestañas
    document.querySelectorAll('#subMenu a').forEach(enlace => {
        enlace.addEventListener('click', function () {
            const pestSel = this.getAttribute('pestSel');
            const etiqueta = document.getElementById(pestSel);
            if (etiqueta) {
                etiqueta.click();
            }
        });
    });
    // Acordeon de la info extra
    const btnInfo = document.getElementById('btnDesplegarInfo');
    const infoContacto = document.getElementById('infoContacto');
    // Evento para mostrar la info de contacto
    btnInfo.addEventListener('click', function () {
        if (infoContacto.classList.contains('acordeonActivo')) {
            infoContacto.classList.remove('acordeonActivo');
            infoContacto.classList.add('acordeonOculto');
            btnInfo.textContent = "Mostrar datos de contacto";
        } else {
            infoContacto.classList.remove('acordeonOculto');
            infoContacto.classList.add('acordeonActivo');
            btnInfo.textContent = "Ocultar datos de contacto";
        }
    });
});
// Gestion del modal de la Galeria
window.addEventListener('load', function () {
    // Elementos del modal de la galeria
    const modalGaleria = document.getElementById('modalGaleriaBox');
    const imagenGrande = document.getElementById('imagenGrande');
    /* Seleccionamos las fotos cargadas en la galeria */
    const imagenesMini = document.querySelectorAll('#contenedorGaleria img');
    const botonL = document.getElementById('botonGaleriaL');
    const botonR = document.getElementById('botonGaleriaR');
    let indiceActual = 0;
    // Abrir el modal al hacer clic en una miniatura
    imagenesMini.forEach((img, index) => {
        img.addEventListener('click', function () {
            imagenGrande.src = this.src; // Aquí el código sabe qué imagen mostrar en funcion de la imagen clickada
            modalGaleria.style.display = 'flex'; // Se muestra el modal
            document.body.classList.add('modalAbierto'); // Se bloquea el scroll de fondo
            indiceActual = index; // Se guarda el índice para saber qué imagen es y poder navegar
        });
    });
    // Botón izquierda
    botonL.addEventListener('click', function (e) {
        e.stopPropagation(); // evitar cerrar al hacer click en el botón
        indiceActual = (indiceActual - 1 + imagenesMini.length) % imagenesMini.length;
        imagenGrande.src = imagenesMini[indiceActual].src;
    });
    // Botón derecha
    botonR.addEventListener('click', function (e) {
        e.stopPropagation(); // Evita cerrar el modal al hacer clic en el botón
        indiceActual = (indiceActual + 1) % imagenesMini.length;
        imagenGrande.src = imagenesMini[indiceActual].src;
    });
    // Cerrar el modal al hacer clic fuera de la imagen o los botones
    let intervaloCambio; // variable para controlar el setInterval
    modalGaleria.addEventListener('click', function (e) {
        if (!imagenGrande.contains(e.target) && !e.target.closest('button')) {
            modalGaleria.style.display = 'none';
            document.body.classList.remove('modalAbierto');
            clearInterval(intervaloCambio); // detenemos el cambio automático
        }
    });
    // Iniciar el cambio automático de imagen al abrir el modal de la Galeria
    imagenesMini.forEach((img, index) => {
        img.addEventListener('click', function () {
            imagenGrande.src = this.src;
            modalGaleria.style.display = 'flex';
            document.body.classList.add('modalAbierto');
            indiceActual = index;

            // Iniciar el intervalo de cambio automático
            clearInterval(intervaloCambio); // por si ya hay uno
            intervaloCambio = setInterval(() => {
                indiceActual = (indiceActual + 1) % imagenesMini.length;
                imagenGrande.src = imagenesMini[indiceActual].src;
            }, 30000); // cada 30 segundos
        });
    });
});
// Gestion del modal del saludo de bienvenida
// Evento al cargar la pagina para mostrar el modal y pausar las animaciones
window.addEventListener('load', function () {
    // Elementos del modal del saludo de bienvenida
    const modal = document.getElementById('modalBienvenidaBox');
    const boton = document.getElementById('botonComenzar');
    const logo = document.getElementById('logoInicio');
    const frase = document.getElementById('fraseInicio');
    const nav = document.querySelector('nav');
    const fondoBase = document.getElementById('fondoBase');
    // Mostrar el modal y bloquear scroll
    modal.style.display = 'flex';
    // Añadimos la clase creada para bloquear el scroll
    document.body.classList.add('modalAbierto');
    // Pausar animaciones al principio
    logo.style.animationPlayState = 'paused';
    frase.style.animationPlayState = 'paused';
    nav.style.animationPlayState = 'paused';
    // Pausar animación de servicios
    document.querySelectorAll('.servicio').forEach(s => {
        s.style.animationPlayState = 'paused';
    });
    // Al pulsar el botón, cerrar el modal y reactivar animaciones
    boton.addEventListener('click', function () {
        modal.style.display = 'none';
        document.body.classList.remove('modalAbierto');
        // Activar las animaciones
        logo.style.animationPlayState = 'running';
        frase.style.animationPlayState = 'running';
        nav.style.animationPlayState = 'running';
        // Reanudar animación de servicios
        document.querySelectorAll('.servicio').forEach(s => {
            s.style.animationPlayState = 'running';
        });
        // Esperar 2 segundos antes de inciar slideShow de heroImage
        setTimeout(() => {
            // Mueve el fondo base hacia la izquierda 
            fondoBase.classList.add('saliente');
            // Después de 2 segundos lo ocultamos para que no interfiera
            setTimeout(() => {
                fondoBase.style.display = 'none';
                fondoBase.classList.remove('saliente');
                void fondoBase.offsetWidth; // reinicio del ciclo CSS
            }, 5000);

            // Iniciar el SlideShow con barrido lateral
            iniciarBarridoHero();
        }, 2500);
    });
});
// Gestion del modal de confirmacion de cita previa y el mensaje de confirmacion que se muestra en este modal
window.addEventListener('load', function () {
    // Elementos del modal de confirmación
    const form = document.getElementById('formCP');
    const modalConfirmacion = document.getElementById('modalConfirmacionCita');
    const botonAbrir = document.getElementById('botonEnviarCita'); // botón del formulario
    const botonCerrar = document.getElementById('botonCerrarCita');
    const mensaje = document.getElementById('mensajeSolCita');
    // Mostrar modal si el formulario es válido
    if (botonAbrir) {
        // Evento al pulsar el botón de enviar cita
        botonAbrir.addEventListener('click', function () {
            // Verificamos la validez del formulario antes de continuar
            if (form.checkValidity()) {
                // Una vez validado el formulario generamos las variables de cada input
                const nombre = document.getElementById('nombre').value.toUpperCase();
                const telefono = document.getElementById('telefono').value;
                const fecha = document.getElementById('fecha').value;
                const comentarios = document.getElementById('comentarios').value;
                mensaje.textContent = `Te contactaremos antes del ${fecha} al numero ${telefono}, un saludo ${nombre}!`;
                modalConfirmacion.style.display = 'flex';
                document.body.classList.add('modalAbierto');
            } else {
                // Si no es válido, muestra el mensaje de error en el campo del formulario
                form.reportValidity();
            }
        });
    }
    // Evento al pulsar el botón de cerrar el modal y reiniciar el formulario
    if (botonCerrar) {
        // Si se ha pulsado el botonCerrar del modal eliminamos la clase modalAbierto cambiamos el style del display a none y reiniciamos el formulario
        botonCerrar.addEventListener('click', function () {
            modalConfirmacion.style.display = 'none';
            document.body.classList.remove('modalAbierto');
            form.reset();
        });
    }
});
// Función para iniciar el slideshow con efecto de barrido lateral
let indiceHero = 0;
let intervaloHero;
// Almacenamos en fondos una colección de elementos del DOM con la clase 'fondosHero'
const fondos = document.getElementsByClassName('fondosHero');
const fondoBase = document.getElementById('fondoBase');
function iniciarBarridoHero() {
    clearInterval(intervaloHero); // para evitar duplicados
    for (let i = 0; i < fondos.length; i++) {
        fondos[i].classList.remove('visible', 'saliente');
    }
    // Aplicar clase visible al primer fondo
    fondos[indiceHero].classList.add('visible');

    intervaloHero = setInterval(() => {
        const actual = fondos[indiceHero];
        const siguienteIndice = (indiceHero + 1) % fondos.length;
        const siguiente = fondos[siguienteIndice];

        // Quitar clases previas para evitar acumulaciones
        actual.classList.remove('visible');
        actual.classList.add('saliente');

        // Resetear la clase saliente después de que termine la animación (opcional)
        setTimeout(() => {
            actual.classList.remove('saliente');
        }, 1500); // mismo tiempo que la animación en CSS

        // Posicionar siguiente en estado inicial (por si se reinicia ciclo)
        siguiente.classList.remove('saliente');
        siguiente.classList.add('visible');

        // Actualizar el índice
        indiceHero = siguienteIndice;
    }, 6000);
}
/* Evento para corregir el comportamiento del slideshow (heroImage) 
   cuando el usuario deja la ventana en segundo plano.
   Antes de aplicar esto, las imágenes se desincronizaban al volver.
   Ahora, aunque al regresar hay un pequeño fallo visual, el orden del slideshow se recupera y sigue funcionando correctamente.
*/
document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "visible") {
        // Resetear fondos del slideshow
        for (let i = 0; i < fondos.length; i++) {
            fondos[i].classList.remove('visible', 'saliente');
            fondos[i].style.transform = ''; // Reset transform
        }

        // Reiniciar fondoBase animado
        fondoBase.style.display = 'block';

        setTimeout(() => {
            // Mueve el fondo base hacia la izquierda 
            fondoBase.classList.add('saliente');
            // Después de 2 segundos lo ocultamos para que no interfiera
            setTimeout(() => {
                fondoBase.style.display = 'none';
            }, 4000);

            // Iniciar el SlideShow con barrido lateral
            iniciarBarridoHero();
        }, 3000);
    }
});

