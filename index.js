const parroquias = [
  { nombre: "El Sagrario", url: "parroquias/urbanas/el_sagrario.html" },
  { nombre: "Sucre", url: "parroquias/urbanas/sucre.html" },
  { nombre: "El Valle", url: "parroquias/urbanas/el_valle.html" },
  { nombre: "San Sebastián", url: "parroquias/urbanas/san_sebastian.html" },
  { nombre: "Punzara", url: "parroquias/urbanas/punzara.html" },
  { nombre: "Carigán", url: "parroquias/urbanas/carigan.html" },
  { nombre: "Chantaco", url: "parroquias/rurales/chantaco.html" },
  { nombre: "Chuquiribamba", url: "parroquias/rurales/chuquiribamba.html" },
  { nombre: "El Cisne", url: "parroquias/rurales/el_cisne.html" },
  { nombre: "Gualel", url: "parroquias/rurales/gualel.html" },
  { nombre: "Jimbilla", url: "parroquias/rurales/jimbilla.html" },
  { nombre: "Malacatos", url: "parroquias/rurales/malacatos.html" },
  { nombre: "Quinara", url: "parroquias/rurales/quinara.html" },
  { nombre: "San Lucas", url: "parroquias/rurales/san_lucas.html" },
  { nombre: "San Pedro de Vilcabamba", url: "parroquias/rurales/san_pedro_de_vilcabamba.html" },
  { nombre: "Santiago", url: "parroquias/rurales/santiago.html" },
  { nombre: "Taquil", url: "parroquias/rurales/taquil.html" },
  { nombre: "Vilcabamba", url: "parroquias/rurales/vilcabamba.html" },
  { nombre: "Yangana", url: "parroquias/rurales/yangana.html" }
];

document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('buscador');
  const lista = document.getElementById('listaparroquias');
  if (input && lista) {
    const ocultarLista = () => lista.classList.add('hidden');
    const mostrarLista = () => lista.classList.remove('hidden');

    const mostrarResultados = (resultados) => {
      lista.innerHTML = '';
      if (resultados.length === 0) {
        const li = document.createElement('li');
        li.textContent = 'No se encontraron lugares.';
        lista.appendChild(li);
        return;
      }
      resultados.forEach(({ nombre, url }) => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.textContent = nombre;
        a.href = url;
        a.style.textDecoration = 'none';
        a.style.color = 'inherit';
        li.appendChild(a);
        lista.appendChild(li);
      });
    };

    input.addEventListener('input', () => {
      const texto = input.value.trim().toLowerCase();
      if (texto === '') {
        ocultarLista();
        lista.innerHTML = '';
        return;
      }
      const resultados = parroquias.filter(p =>
        p.nombre.toLowerCase().includes(texto)
      );
      mostrarResultados(resultados);
      mostrarLista();
    });

    input.addEventListener('focus', () => {
      if (input.value.trim() !== '') mostrarLista();
    });

    document.addEventListener('click', (e) => {
      if (!input.contains(e.target) && !lista.contains(e.target)) {
        ocultarLista();
      }
    });
  }
});


let slideIndex = 0;
const slides = document.querySelectorAll('.carrusel-slide');
const nextBtn = document.getElementById('nextCarrusel');
const prevBtn = document.getElementById('prevCarrusel');

function showSlide(n) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === n);
  });
}
function nextSlide() {
  slideIndex = (slideIndex + 1) % slides.length;
  showSlide(slideIndex);
}
function prevSlide() {
  slideIndex = (slideIndex - 1 + slides.length) % slides.length;
  showSlide(slideIndex);
}
if (nextBtn && prevBtn) {
  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlide);
}
setInterval(nextSlide, 5000);

function revealOnScroll() {
  document.querySelectorAll('.fade-scroll').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 60) {
      el.classList.add('visible');
    }
  });
}
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('DOMContentLoaded', revealOnScroll);


document.addEventListener("DOMContentLoaded", function () {
  actualizarEstadoBoton();
});
function actualizarEstadoBoton() {
  const permiso = Notification.permission;
  const texto = document.getElementById("textoNotificacion");
  const icono = document.getElementById("iconoNotificacion");
  if (permiso === "granted") {
    texto.textContent = "Bloquear notificaciones";
    icono.textContent = "notifications_active";
  } else {
    texto.textContent = "Activar notificaciones";
    icono.textContent = "notification_important";
  }
}
function gestionarNotificaciones() {
  const permiso = Notification.permission;
  if (permiso === "default") {

    Notification.requestPermission().then(function (permisoNuevo) {
      if (permisoNuevo === "granted") {
        new Notification("Notificaciones activadas", {
          body: "Recibirás alertas importantes del sitio.",
          icon: "https://cdn-icons-png.flaticon.com/512/1827/1827392.png"
        });
      }
      actualizarEstadoBoton();
    });
  } else if (permiso === "granted") {
    alert("No es posible desactivar las notificaciones desde aquí. Por favor, hazlo desde la configuración del navegador.");
  } else if (permiso === "denied") {
    alert("Has bloqueado las notificaciones. Para volver a activarlas, cambia los permisos en tu navegador.");
  }
}