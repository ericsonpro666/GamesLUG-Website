document.getElementById("toggle-theme").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

const buscador = document.getElementById("buscador-juegos");
const juegos = document.querySelectorAll(".juego");

buscador.addEventListener("input", () => {
  const valor = buscador.value.toLowerCase();
  juegos.forEach(juego => {
    const texto = juego.querySelector("h3").textContent.toLowerCase();
    juego.style.display = texto.includes(valor) ? "block" : "none";
  });
});
// ... código anterior ...

// Nuevas constantes para el botón y el contenedor de filtros
const btnFiltros = document.querySelector('.btn-filtros');
const filtrosContainer = document.getElementById('filtros-dropdown-container');

// Event listener para el botón "Filtros"
btnFiltros.addEventListener('click', () => {
  // Toggle la clase 'visible' para mostrar/ocultar
  filtrosContainer.classList.toggle('visible');
});

// ... el resto de tu código para el carrusel ...
document.addEventListener("DOMContentLoaded", () => {
  const carruselInner = document.querySelector(".carrusel-inner");
  const carruselItems = document.querySelectorAll(".carrusel-item");
  // Las siguientes líneas están comentadas porque los botones del carrusel fueron eliminados del HTML
  // const prevBtn = document.querySelector(".carrusel-btn.prev");
  // const nextBtn = document.querySelector(".carrusel-btn.next");

  let currentIndex = 0;
  let isDragging = false;
  let startPos = 0;
  let currentTranslate = 0;
  let prevTranslate = 0;
  let animationID;

  // Función para mover el carrusel
  function setPositionByIndex() {
    currentTranslate = currentIndex * -carruselInner.clientWidth;
    setSliderTransform();
  }

  function setSliderTransform() {
    carruselInner.style.transform = `translateX(${currentTranslate}px)`;
  }

  function activateItem(index) {
    carruselItems.forEach((item, i) => {
      item.classList.toggle('active', i === index);
    });
  }

  // Inicializar el carrusel
  activateItem(currentIndex);
  setPositionByIndex();

  // Funcionalidad de arrastre (swipe)
  carruselInner.addEventListener("touchstart", touchStart);
  carruselInner.addEventListener("touchend", touchEnd);
  carruselInner.addEventListener("touchmove", touchMove);

  carruselInner.addEventListener("mousedown", touchStart);
  carruselInner.addEventListener("mouseup", touchEnd);
  carruselInner.addEventListener("mousemove", touchMove);
  carruselInner.addEventListener("mouseleave", touchEnd); // Para cuando el mouse sale sin soltar

  function touchStart(event) {
    if (event.type === "touchstart") {
      startPos = event.touches[0].clientX;
    } else {
      startPos = event.clientX;
      event.preventDefault(); // Evita arrastrar imágenes por defecto del navegador
    }
    isDragging = true;
    prevTranslate = currentTranslate;
    carruselInner.style.transition = 'none'; // Desactiva la transición durante el arrastre
    cancelAnimationFrame(animationID); // Detiene cualquier animación pendiente
  }

  function touchMove(event) {
    if (!isDragging) return;

    let currentPosition;
    if (event.type === "touchmove") {
      currentPosition = event.touches[0].clientX;
    } else {
      currentPosition = event.clientX;
    }

    const diff = currentPosition - startPos;
    currentTranslate = prevTranslate + diff;

    setSliderTransform();
  }

  function touchEnd() {
    cancelAnimationFrame(animationID);
    isDragging = false;
    carruselInner.style.transition = 'transform 0.5s ease-in-out'; // Reactiva la transición

    const movedBy = currentTranslate - prevTranslate;

    // Detectar si se movió lo suficiente para cambiar de imagen (umbral de 50px de arrastre)
    if (movedBy < -50 && currentIndex < carruselItems.length - 1) { // Arrastre a la izquierda para ir a la siguiente
      currentIndex += 1;
    } else if (movedBy > 50 && currentIndex > 0) { // Arrastre a la derecha para ir a la anterior
      currentIndex -= 1;
    }

    setPositionByIndex(); // Ajusta la posición final
    activateItem(currentIndex);
  }
});