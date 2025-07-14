document.addEventListener('DOMContentLoaded', () => {
  // Lógica para el toggle de tema (si lo quieres también en esta página)
  const toggleThemeBtn = document.getElementById('toggle-theme');
  if (toggleThemeBtn) {
    toggleThemeBtn.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
    });
  }

  const urlParams = new URLSearchParams(window.location.search);
  const gameId = urlParams.get('id'); // Obtiene el ID del juego de la URL

  if (gameId) {
  async function loadGameDetails(id) {
  try {
    const response = await fetch('games-data.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const games = await response.json();

    const game = games.find(g => g.id === id);

    if (game) {
      // 1. Rellenar información básica
      document.getElementById('game-title').textContent = game.title;
      document.getElementById('game-main-image').src = game.image_main;
      document.getElementById('game-main-image').alt = game.title;
      document.getElementById('game-short-description').textContent = game.description;
      document.getElementById('game-full-description').textContent = game.long_description;

      // 2. Rellenar metadatos
      document.getElementById('game-category').textContent = game.category;
      document.getElementById('game-genre').textContent = game.genre;
      document.getElementById('game-requirements').textContent = game.requirements;
      document.getElementById('game-features').textContent = game.features.join(', ');

      // 3. Establecer el enlace de descarga
      document.getElementById('game-download-link').href = game.download_link;

      // 4. Cargar Trailer de YouTube (si existe)
      const gameTrailerContainer = document.getElementById('game-trailer');
      if (game.youtube_trailer_id) {
        const iframe = document.createElement('iframe');
        iframe.width = "560"; // Puedes ajustar el tamaño o usar CSS para responsividad
        iframe.height = "315";
        iframe.src = `https://www.youtube.com/embed/${game.youtube_trailer_id}`;
        iframe.title = `${game.title} Trailer`;
        iframe.frameBorder = "0";
        iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
        iframe.allowFullscreen = true;
        gameTrailerContainer.appendChild(iframe);
      } else {
        gameTrailerContainer.innerHTML = "<p>No hay trailer disponible.</p>";
      }

      // 5. Cargar Galería de Imágenes (screenshots)
      const gameScreenshotsContainer = document.getElementById('game-screenshots');
      if (game.screenshots && game.screenshots.length > 0) {
        game.screenshots.forEach(screenshotPath => {
          const img = document.createElement('img');
          img.src = screenshotPath;
          img.alt = `${game.title} Screenshot`;
          img.classList.add('screenshot-thumbnail'); // Añade una clase para aplicar estilos
          gameScreenshotsContainer.appendChild(img);
        });
      } else {
        gameScreenshotsContainer.innerHTML = "<p>No hay capturas de pantalla disponibles.</p>";
      }

    } else {
      document.getElementById('game-title').textContent = "Juego no encontrado.";
      document.getElementById('game-info').innerHTML = "<p>El juego solicitado no existe.</p>";
    }
  } catch (error) {
    console.error("Error al cargar los detalles del juego:", error);
    document.getElementById('game-title').textContent = "Error al cargar los detalles.";
    document.getElementById('game-info').innerHTML = "<p>Hubo un problema al cargar la información del juego. Inténtalo de nuevo más tarde.</p>";
  }
}