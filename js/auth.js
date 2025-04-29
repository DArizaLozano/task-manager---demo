// js/auth.js

// Función para registrar un nuevo usuario
function signup(event) {
    event.preventDefault();

    // Obtener los valores del formulario
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Comprobar si el usuario ya existe en localStorage
    const existingUser = JSON.parse(localStorage.getItem("users")) || [];

    // Verificar si ya existe un usuario con el mismo correo
    const userExists = existingUser.some(user => user.email === email);

    if (userExists) {
        alert("El usuario ya existe. Intenta con otro correo.");
        return;
    }

    // Crear nuevo objeto de usuario
    const newUser = { name, email, password };

    // Guardar el nuevo usuario en localStorage
    existingUser.push(newUser);
    localStorage.setItem("users", JSON.stringify(existingUser));

    // Redirigir a la página de login después de registrarse
    window.location.href = "login.html";
}

// Función para iniciar sesión
function login(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Obtener los usuarios almacenados en localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Buscar al usuario en la lista
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        // Si el usuario existe, redirigir al Dashboard
        localStorage.setItem("loggedIn", JSON.stringify(user)); // Guardar al usuario como "loggeado"
        window.location.href = "dashboard.html";
    } else {
        // Si no existe, mostrar un error
        alert("Credenciales incorrectas");
    }
}

// Asignar eventos a los formularios de login y signup
document.getElementById("login-form")?.addEventListener("submit", login);
document.getElementById("signup-form")?.addEventListener("submit", signup);
