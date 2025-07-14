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
    loadGameDetails(gameId);
  } else {
    // Si no hay ID en la URL, mostrar un mensaje de error o redirigir
    document.getElementById('game-title').textContent = "Juego no encontrado.";
    document.getElementById('game-info').innerHTML = "<p>No se ha especificado un ID de juego válido.</p>";
  }
});

async function loadGameDetails(id) {
  try {
    // Carga los datos de games-data.json
    const response = await fetch('games-data.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const games = await response.json();

    // Busca el juego por ID
    const game = games.find(g => g.id === id);

    if (game) {
      // Rellena los elementos HTML con la información del juego
      document.getElementById('game-title').textContent = game.title;
      document.getElementById('game-main-image').src = game.image_main;
      document.getElementById('game-main-image').alt = game.title;
      document.getElementById('game-short-description').textContent = game.description;
      document.getElementById('game-full-description').textContent = game.long_description;
      document.getElementById('game-category').textContent = game.category;
      document.getElementById('game-genre').textContent = game.genre;
      document.getElementById('game-requirements').textContent = game.requirements;
      document.getElementById('game-features').textContent = game.features.join(', '); // Une las características con coma
      document.getElementById('game-download-link').href = game.download_link;
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