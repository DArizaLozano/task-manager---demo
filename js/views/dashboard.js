export default function loadDashboard() {
  const mainContent = document.getElementById('main-content');

  mainContent.innerHTML = `
    <div class="dashboard-container">
      <div class="dashboard-header">
        <h2 id="dashboard-title">Dashboard</h2>
        <div id="calendar" class="calendar-container">
          <h3 id="calendar-title">Calendario</h3>
          <div id="calendar-grid" class="calendar-grid"></div>
        </div>
      </div>

      <div class="tasks-list">
        <div class="actions">
          <button id="add-task" class="action-btn">Añadir Tarea</button>
        </div>
        <h3 id="tasks-list-title">Tareas</h3>
        <ul id="task-list"></ul>
      </div>
    </div>
  `;

  loadCalendar();
  const addTaskButton = document.getElementById('add-task');
  addTaskButton.addEventListener('click', () => {
    window.location.hash = '#tasks';
  });

  loadTasks();

  const translations = {
    es: {
      dashboardTitle: "Dashboard",
      calendarTitle: "Calendario",
      addTask: "Añadir Tarea",
      tasksTitle: "Tareas",
      due: "Vencimiento",
      priority: "Prioridad",
      edit: "Editar",
      delete: "Eliminar",
      complete: "Completar",
      uncomplete: "Desmarcar"
    },
    en: {
      dashboardTitle: "Dashboard",
      calendarTitle: "Calendar",
      addTask: "Add Task",
      tasksTitle: "Tasks",
      due: "Due",
      priority: "Priority",
      edit: "Edit",
      delete: "Delete",
      complete: "Complete",
      uncomplete: "Uncomplete"
    }
  };

  function applyTranslations(lang) {
    const t = translations[lang];
    document.getElementById('dashboard-title').innerText = t.dashboardTitle;
    document.getElementById('calendar-title').innerText = t.calendarTitle;
    document.getElementById('add-task').innerText = t.addTask;
    document.getElementById('tasks-list-title').innerText = t.tasksTitle;
  }

  const savedLanguage = localStorage.getItem('language') || 'es';
  applyTranslations(savedLanguage);
}

function loadCalendar() {
  const calendarGrid = document.getElementById('calendar-grid');
  const date = new Date();
  const currentMonth = date.getMonth();
  const currentYear = date.getFullYear();
  const firstDay = new Date(currentYear, currentMonth, 1);
  const lastDay = new Date(currentYear, currentMonth + 1, 0);

  const daysInMonth = lastDay.getDate();
  const startingDay = firstDay.getDay();

  const daysOfWeek = localStorage.getItem('language') === 'en'
    ? ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    : ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  let calendarHTML = '<div class="calendar-header">';
  for (let i = 0; i < 7; i++) {
    calendarHTML += `<div class="calendar-day">${daysOfWeek[i]}</div>`;
  }
  calendarHTML += '</div>';

  let dayCounter = 1;
  for (let i = 0; i < 6; i++) {
    calendarHTML += '<div class="calendar-row">';
    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < startingDay) {
        calendarHTML += '<div class="calendar-cell"></div>';
      } else if (dayCounter <= daysInMonth) {
        calendarHTML += `<div class="calendar-cell" data-day="${dayCounter}">${dayCounter}</div>`;
        dayCounter++;
      }
    }
    calendarHTML += '</div>';
  }

  calendarGrid.innerHTML = calendarHTML;
}

function loadTasks() {
  const taskList = document.getElementById('task-list');
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  taskList.innerHTML = '';

  const lang = localStorage.getItem('language') || 'es';
  const text = {
    es: { due: "Vencimiento", priority: "Prioridad", edit: "Editar", delete: "Eliminar", complete: "Completar", uncomplete: "Desmarcar" },
    en: { due: "Due", priority: "Priority", edit: "Edit", delete: "Delete", complete: "Complete", uncomplete: "Uncomplete" }
  };

  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.classList.add('task-item');

    if (task.completed) {
      li.classList.add('completed');
    }

    li.setAttribute('draggable', true);

    li.innerHTML = `
      <div class="task-info">
        <h4>${task.name}</h4>
        <p><strong>${text[lang].due}:</strong> ${task.date} ${task.time ? `a las ${task.time}` : ''}</p>
        <p><strong>${text[lang].priority}:</strong> ${task.priority}</p>
        <p>${task.description}</p>
      </div>
      <div class="task-actions">
        <button class="edit-btn" data-index="${index}">${text[lang].edit}</button>
        <button class="delete-btn" data-index="${index}">${text[lang].delete}</button>
        <button class="complete-btn" data-index="${index}">${task.completed ? text[lang].uncomplete : text[lang].complete}</button>
      </div>
    `;

    taskList.appendChild(li);

    const editBtn = li.querySelector('.edit-btn');
    const deleteBtn = li.querySelector('.delete-btn');
    const completeBtn = li.querySelector('.complete-btn');

    editBtn.addEventListener('click', () => {
      window.location.hash = '#tasks';
      localStorage.setItem('editingTask', index);
    });

    deleteBtn.addEventListener('click', () => {
      li.classList.add('fade-out');
      setTimeout(() => {
        tasks.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        loadTasks();
      }, 500);
    });

    completeBtn.addEventListener('click', () => {
      task.completed = !task.completed;
      localStorage.setItem('tasks', JSON.stringify(tasks));
      loadTasks();
    });

    if (task.date) {
      const [year, month, day] = task.date.split('-').map(Number);
      const calendarCell = document.querySelector(`.calendar-cell[data-day="${day}"]`);
      if (calendarCell) {
        calendarCell.classList.add('task-day');
        calendarCell.setAttribute('title', `Tarea: ${task.name}${task.time ? ` a las ${task.time}` : ''}`);
      }
    }

    // Drag and Drop
    li.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('text/plain', index);
      li.classList.add('dragging');
    });

    li.addEventListener('dragend', () => {
      li.classList.remove('dragging');
    });
  });

  taskList.addEventListener('dragover', (e) => {
    e.preventDefault();
    taskList.classList.add('drag-over');
  });

  taskList.addEventListener('dragleave', () => {
    taskList.classList.remove('drag-over');
  });

  taskList.addEventListener('drop', (e) => {
    e.preventDefault();
    const fromIndex = parseInt(e.dataTransfer.getData('text/plain'));
    const toElement = e.target.closest('.task-item');
    if (!toElement) return;

    const toIndex = Array.from(taskList.children).indexOf(toElement);

    const movedTask = tasks.splice(fromIndex, 1)[0];
    tasks.splice(toIndex, 0, movedTask);

    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks();
  });
}
