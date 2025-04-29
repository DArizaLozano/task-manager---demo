// Importar el sidebar para ser renderizado en todas las vistas
import { renderSidebar } from '../components/sidebar.js';

// Función para cambiar la vista de la página
function loadView(view) {
  const mainContent = document.getElementById('main-content');
  mainContent.innerHTML = ''; // Limpiar el contenido actual

  // Aplicar tema (claro u oscuro) según localStorage
  applyTheme();

  // Renderizar el sidebar en todas las vistas
  renderSidebar();

  // Cargar el archivo de la vista correspondiente
  switch (view) {
    case 'home':
      import('./views/home.js').then(module => {
        module.default();
      }).catch(err => console.error('Error al cargar home:', err));
      break;
    case 'dashboard':
      import('./views/dashboard.js').then(module => {
        module.default();
      }).catch(err => console.error('Error al cargar dashboard:', err));
      break;
    case 'tasks':
      import('./views/tasks.js').then(module => {
        module.default();
      }).catch(err => console.error('Error al cargar tasks:', err));
      break;
    case 'configuracion':
      import('./views/configuracion.js').then(module => {
        module.default();
      }).catch(err => console.error('Error al cargar configuracion:', err));
      break;
    default:
      import('./views/home.js').then(module => {
        module.default();
      }).catch(err => console.error('Error al cargar home por defecto:', err));
      break;
  }
}

// Nueva función para aplicar el tema automáticamente
function applyTheme() {
  const savedTheme = localStorage.getItem('theme');
  document.body.classList.remove('light-theme', 'dark-theme'); // Limpiar clases anteriores

  if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
  } else {
    document.body.classList.add('dark-theme');
  }
}

// Función para manejar el cambio de ruta
function handleRoute() {
  const hash = window.location.hash || '#home'; // Si no hay hash, cargar home
  const route = hash.substring(1);
  loadView(route);
}

// Escuchar eventos
window.addEventListener('load', handleRoute);
window.addEventListener('hashchange', handleRoute);

// Llamada inicial
handleRoute();
