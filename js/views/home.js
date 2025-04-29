export default function loadHome() {
    const mainContent = document.getElementById('main-content');
  
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;
    const pendingTasks = totalTasks - completedTasks;
  
    const nextTask = tasks
      .filter(task => !task.completed)
      .sort((a, b) => new Date(a.date) - new Date(b.date))[0];
  
    const recentActivities = tasks
      .slice(-5)
      .reverse()
      .map(task => `<li>${task.name} - ${task.completed ? 'Completada' : 'Pendiente'}</li>`)
      .join('');
  
    mainContent.innerHTML = `
      <div class="home-container">
        <h2 id="home-title">Resumen General</h2>
  
        <div class="home-summary">
          <div class="summary-card">
            <h3 id="total-tasks-label">Tareas Totales</h3>
            <p>${totalTasks}</p>
          </div>
          <div class="summary-card">
            <h3 id="completed-tasks-label">Tareas Completadas</h3>
            <p>${completedTasks}</p>
          </div>
          <div class="summary-card">
            <h3 id="pending-tasks-label">Tareas Pendientes</h3>
            <p>${pendingTasks}</p>
          </div>
        </div>
  
        <div class="home-next-task">
          <h3 id="next-task-title">Próxima tarea</h3>
          ${
            nextTask
              ? `<p id="next-task-detail"><strong>${nextTask.name}</strong> vence el <strong>${nextTask.date}</strong> a las <strong>${nextTask.time || 'Sin hora'}</strong></p>`
              : `<p id="no-next-task">No hay tareas próximas.</p>`
          }
        </div>
  
        <div class="home-activity-log">
          <h3 id="recent-activity-title">Actividad Reciente</h3>
          <ul id="recent-activity-list">
            ${recentActivities || '<li id="no-activity">No hay actividades recientes.</li>'}
          </ul>
        </div>
  
        <div class="home-add-task">
          <button id="add-task-btn">Añadir Nueva Tarea</button>
        </div>
      </div>
    `;
  
    const addTaskBtn = document.getElementById('add-task-btn');
    addTaskBtn.addEventListener('click', () => {
      window.location.hash = '#tasks';
    });
  
    // Traducciones
    const translations = {
      es: {
        homeTitle: "Resumen General",
        totalTasks: "Tareas Totales",
        completedTasks: "Tareas Completadas",
        pendingTasks: "Tareas Pendientes",
        nextTaskTitle: "Próxima tarea",
        noNextTask: "No hay tareas próximas.",
        recentActivity: "Actividad Reciente",
        noActivity: "No hay actividades recientes.",
        addTask: "Añadir Nueva Tarea"
      },
      en: {
        homeTitle: "General Overview",
        totalTasks: "Total Tasks",
        completedTasks: "Completed Tasks",
        pendingTasks: "Pending Tasks",
        nextTaskTitle: "Next Task",
        noNextTask: "No upcoming tasks.",
        recentActivity: "Recent Activity",
        noActivity: "No recent activities.",
        addTask: "Add New Task"
      }
    };
  
    function applyTranslations(lang) {
      const t = translations[lang];
  
      document.getElementById('home-title').innerText = t.homeTitle;
      document.getElementById('total-tasks-label').innerText = t.totalTasks;
      document.getElementById('completed-tasks-label').innerText = t.completedTasks;
      document.getElementById('pending-tasks-label').innerText = t.pendingTasks;
      document.getElementById('next-task-title').innerText = t.nextTaskTitle;
      if (!nextTask) document.getElementById('no-next-task').innerText = t.noNextTask;
      document.getElementById('recent-activity-title').innerText = t.recentActivity;
      if (!recentActivities) document.getElementById('no-activity').innerText = t.noActivity;
      document.getElementById('add-task-btn').innerText = t.addTask;
    }
  
    const savedLanguage = localStorage.getItem('language') || 'es';
    applyTranslations(savedLanguage);
  }
  