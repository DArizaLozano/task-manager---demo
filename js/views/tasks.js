export default function loadTasks() {
  const mainContent = document.getElementById('main-content');

  const editingTaskIndex = localStorage.getItem('editingTask');
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const taskToEdit = tasks[editingTaskIndex];

  mainContent.innerHTML = `
    <div class="tasks-container">
      <h2 id="tasks-title">${editingTaskIndex !== null ? 'Editar Tarea' : 'Agregar Tarea'}</h2>
      <form id="task-form">
        <div>
          <label for="task-name" id="label-name">Nombre de la tarea</label>
          <input type="text" id="task-name" placeholder="Ingrese el nombre de la tarea" value="${taskToEdit ? taskToEdit.name : ''}" required />
        </div>
        <div>
          <label for="task-date" id="label-date">Fecha de vencimiento</label>
          <input type="date" id="task-date" value="${taskToEdit ? taskToEdit.date : ''}" required />
        </div>
        <div>
          <label for="task-time" id="label-time">Hora de vencimiento</label>
          <input type="time" id="task-time" value="${taskToEdit ? taskToEdit.time || '' : ''}" required />
        </div>
        <div>
          <label for="task-priority" id="label-priority">Prioridad</label>
          <select id="task-priority" required>
            <option value="Alta" ${taskToEdit && taskToEdit.priority === 'Alta' ? 'selected' : ''}>Alta</option>
            <option value="Media" ${taskToEdit && taskToEdit.priority === 'Media' ? 'selected' : ''}>Media</option>
            <option value="Baja" ${taskToEdit && taskToEdit.priority === 'Baja' ? 'selected' : ''}>Baja</option>
          </select>
        </div>
        <div>
          <label for="task-description" id="label-description">Descripción</label>
          <textarea id="task-description" placeholder="Ingrese la descripción de la tarea">${taskToEdit ? taskToEdit.description : ''}</textarea>
        </div>
        <button type="submit" id="submit-btn">${editingTaskIndex !== null ? 'Actualizar' : 'Guardar'} tarea</button>
      </form>
    </div>
  `;

  const form = document.getElementById('task-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const taskName = document.getElementById('task-name').value;
    const taskDate = document.getElementById('task-date').value;
    const taskTime = document.getElementById('task-time').value;
    const taskPriority = document.getElementById('task-priority').value;
    const taskDescription = document.getElementById('task-description').value;

    const newTask = {
      name: taskName,
      date: taskDate,
      time: taskTime,
      priority: taskPriority,
      description: taskDescription,
    };

    if (editingTaskIndex !== null) {
      tasks[editingTaskIndex] = newTask;
    } else {
      tasks.push(newTask);
    }

    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.removeItem('editingTask');
    window.location.hash = '#dashboard';
  });

  const translations = {
    es: {
      titleAdd: "Agregar Tarea",
      titleEdit: "Editar Tarea",
      name: "Nombre de la tarea",
      date: "Fecha de vencimiento",
      time: "Hora de vencimiento",
      priority: "Prioridad",
      description: "Descripción",
      save: "Guardar tarea",
      update: "Actualizar tarea",
      high: "Alta",
      medium: "Media",
      low: "Baja"
    },
    en: {
      titleAdd: "Add Task",
      titleEdit: "Edit Task",
      name: "Task Name",
      date: "Due Date",
      time: "Due Time",
      priority: "Priority",
      description: "Description",
      save: "Save Task",
      update: "Update Task",
      high: "High",
      medium: "Medium",
      low: "Low"
    }
  };

  function applyTranslations(lang) {
    const t = translations[lang];
    const isEditing = editingTaskIndex !== null;

    document.getElementById('tasks-title').innerText = isEditing ? t.titleEdit : t.titleAdd;
    document.getElementById('label-name').innerText = t.name;
    document.getElementById('label-date').innerText = t.date;
    document.getElementById('label-time').innerText = t.time;
    document.getElementById('label-priority').innerText = t.priority;
    document.getElementById('label-description').innerText = t.description;
    document.getElementById('submit-btn').innerText = isEditing ? t.update : t.save;

    // Opciones del select
    const prioritySelect = document.getElementById('task-priority');
    prioritySelect.options[0].text = t.high;
    prioritySelect.options[1].text = t.medium;
    prioritySelect.options[2].text = t.low;
  }

  const savedLanguage = localStorage.getItem('language') || 'es';
  applyTranslations(savedLanguage);
}
