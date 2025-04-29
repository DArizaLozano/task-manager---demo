export default function loadConfiguracion() {
    const mainContent = document.getElementById('main-content');
  
    mainContent.innerHTML = `
      <div class="config-container">
        <h2 id="title-config">Configuraciones</h2>
  
        <div class="config-section">
          <h3 id="theme-label">Modo de visualización</h3>
          <button id="toggle-darkmode" class="config-btn">Cambiar Tema (Oscuro / Claro)</button>
        </div>
  
        <div class="config-section">
          <h3 id="language-label">Idioma</h3>
          <select id="language-select" class="config-select">
            <option value="es">Español</option>
            <option value="en">Inglés</option>
          </select>
        </div>
  
        <div class="config-info">
          <p id="info-text">Las configuraciones ya están activas. ¡Personaliza tu experiencia!</p>
        </div>
      </div>
    `;
  
    const toggleButton = document.getElementById('toggle-darkmode');
    const languageSelect = document.getElementById('language-select');
  
    const translations = {
      es: {
        title: "Configuraciones",
        themeLabel: "Modo de visualización",
        button: "Cambiar Tema (Oscuro / Claro)",
        languageLabel: "Idioma",
        info: "Las configuraciones ya están activas. ¡Personaliza tu experiencia!"
      },
      en: {
        title: "Settings",
        themeLabel: "Display Mode",
        button: "Change Theme (Dark / Light)",
        languageLabel: "Language",
        info: "Settings are now active. Customize your experience!"
      }
    };
  
    function applyTranslations(lang) {
      document.getElementById('title-config').innerText = translations[lang].title;
      document.getElementById('theme-label').innerText = translations[lang].themeLabel;
      toggleButton.innerText = translations[lang].button;
      document.getElementById('language-label').innerText = translations[lang].languageLabel;
      document.getElementById('info-text').innerText = translations[lang].info;
    }
  
    languageSelect.addEventListener('change', (e) => {
      const selectedLang = e.target.value;
      localStorage.setItem('language', selectedLang);
      applyTranslations(selectedLang);
  
      const event = new CustomEvent('idioma-cambiado', { detail: selectedLang });
      document.dispatchEvent(event);
    });
  
    const savedLanguage = localStorage.getItem('language') || 'es';
    languageSelect.value = savedLanguage;
    applyTranslations(savedLanguage);
  
    toggleButton.addEventListener('click', () => {
      document.body.classList.toggle('light-theme');
      const currentTheme = document.body.classList.contains('light-theme') ? 'light' : 'dark';
      localStorage.setItem('theme', currentTheme);
    });
  
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      document.body.classList.add('light-theme');
    }
  }
  