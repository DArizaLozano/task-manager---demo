export function renderSidebar() {
  // Eliminar sidebar anterior si existe
  const oldSidebar = document.getElementById('sidebar');
  const oldToggle = document.getElementById('sidebarToggle');
  const oldToggleBtn = document.getElementById('sidebarToggleBtn');

  if (oldSidebar) oldSidebar.remove();
  if (oldToggle) oldToggle.remove();
  if (oldToggleBtn) oldToggleBtn.remove();

  const sidebarHTML = `
    <input type="checkbox" id="sidebarToggle" class="sidebar-toggle-checkbox" />
    <label for="sidebarToggle" class="sidebar-toggle-btn" id="sidebarToggleBtn">☰</label>
    <div id="sidebar" class="sidebar">
      <ul class="sidebar-menu">
        <li><a href="#home" class="sidebar-link" id="link-home">🏠 Home</a></li>
        <li><a href="#dashboard" class="sidebar-link" id="link-dashboard">📋 Dashboard</a></li>
        <li><a href="#configuracion" class="sidebar-link" id="link-config">⚙️ Configuración</a></li>
      </ul>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', sidebarHTML);

  const toggleBtn = document.getElementById('sidebarToggleBtn');
  const toggleCheckbox = document.getElementById('sidebarToggle');

  toggleCheckbox.addEventListener('change', () => {
    if (toggleCheckbox.checked) {
      toggleBtn.classList.add('open');
    } else {
      toggleBtn.classList.remove('open');
    }
  });

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
  }

  const savedLanguage = localStorage.getItem('language') || 'es';
  applySidebarTranslations(savedLanguage);

  // 🔥 MUY IMPORTANTE: Vuelves a suscribir el evento idioma cambiado
  document.addEventListener('idioma-cambiado', (event) => {
    applySidebarTranslations(event.detail);
  });
}

export function applySidebarTranslations(lang) {
  const translations = {
    es: {
      home: "🏠 Home",
      dashboard: "📋 Dashboard",
      config: "⚙️ Configuración"
    },
    en: {
      home: "🏠 Home",
      dashboard: "📋 Dashboard",
      config: "⚙️ Settings"
    }
  };

  const t = translations[lang];
  if (document.getElementById('link-home')) {
    document.getElementById('link-home').innerText = t.home;
    document.getElementById('link-dashboard').innerText = t.dashboard;
    document.getElementById('link-config').innerText = t.config;
  }
}
