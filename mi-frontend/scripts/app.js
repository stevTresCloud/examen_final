// Ajusta esta URL según tu host/puerto/path:
const API_URL = 'http://localhost:9090/usuarios/api/stevenluna/users';

document.addEventListener('DOMContentLoaded', () => {
  loadUsers();

  const userForm = document.getElementById('user-form');
  const cancelButton = document.getElementById('cancel-button');

  userForm.addEventListener('submit', handleSubmit);
  cancelButton.addEventListener('click', resetForm);
});

/**
 * Carga la lista de usuarios (GET)
 */
function loadUsers() {
  fetch(API_URL)
    .then(response => response.json())
    .then(data => {
      renderUserList(data);
    })
    .catch(error => {
      console.error('Error al cargar usuarios:', error);
    });
}

/**
 * Muestra la lista de usuarios usando una tabla de Bootstrap
 */
function renderUserList(users) {
  const userListDiv = document.getElementById('user-list');
  userListDiv.innerHTML = '';

  let html = '<h2 class="mb-3">Lista de Usuarios</h2>';

  if (!users || users.length === 0) {
    html += '<p>No hay usuarios registrados.</p>';
  } else {
    html += `
      <div class="table-responsive">
        <table class="table table-striped align-middle">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Email</th>
              <th>Password</th>
              <th>Teléfono</th>
              <th style="width: 150px;">Acciones</th>
            </tr>
          </thead>
          <tbody>
    `;

    users.forEach(user => {
      html += `
        <tr>
          <td>${user.id}</td>
          <td>${user.nombre}</td>
          <td>${user.apellido}</td>
          <td>${user.email}</td>
          <td>${user.password}</td>
          <td>${user.telefono}</td>
          <td>
            <button class="btn btn-sm btn-warning me-2" onclick="editUser(${user.id})">
              Editar
            </button>
            <button class="btn btn-sm btn-danger" onclick="deleteUser(${user.id})">
              Eliminar
            </button>
          </td>
        </tr>
      `;
    });

    html += `
          </tbody>
        </table>
      </div>
    `;
  }

  userListDiv.innerHTML = html;
}

/**
 * Maneja el submit del formulario para crear o actualizar
 */
function handleSubmit(event) {
  event.preventDefault();

  const idField = document.getElementById('id');
  const nombreField = document.getElementById('nombre');
  const apellidoField = document.getElementById('apellido');
  const emailField = document.getElementById('email');
  const passwordField = document.getElementById('password');
  const telefonoField = document.getElementById('telefono');

  const user = {
    nombre: nombreField.value.trim(),
    apellido: apellidoField.value.trim(),
    email: emailField.value.trim(),
    password: passwordField.value.trim(),
    telefono: telefonoField.value.trim()
  };

  // Si existe id, es UPDATE, si no, CREATE
  const userId = idField.value;
  if (userId) {
    // PUT
    fetch(`${API_URL}/${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al actualizar usuario');
        }
        return response.json();
      })
      .then(updatedUser => {
        console.log('Usuario actualizado:', updatedUser);
        resetForm();
        loadUsers();
      })
      .catch(error => console.error('Error en PUT:', error));
  } else {
    // POST
    fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al crear usuario');
        }
        return response.json();
      })
      .then(createdUser => {
        console.log('Usuario creado:', createdUser);
        resetForm();
        loadUsers();
      })
      .catch(error => console.error('Error en POST:', error));
  }
}

/**
 * Obtiene un usuario (GET /:id) para editar
 */
function editUser(userId) {
  document.getElementById('form-title').textContent = 'Editar Usuario';
  document.getElementById('cancel-button').style.display = 'inline-block';

  fetch(`${API_URL}/${userId}`)
    .then(response => response.json())
    .then(user => {
      document.getElementById('id').value = user.id;
      document.getElementById('nombre').value = user.nombre;
      document.getElementById('apellido').value = user.apellido;
      document.getElementById('email').value = user.email;
      document.getElementById('password').value = user.password;
      document.getElementById('telefono').value = user.telefono;
    })
    .catch(error => console.error('Error al obtener usuario:', error));
}

/**
 * Elimina un usuario (DELETE /:id)
 */
function deleteUser(userId) {
  if (!confirm('¿Estás seguro de eliminar este usuario?')) {
    return;
  }

  fetch(`${API_URL}/${userId}`, {
    method: 'DELETE'
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al eliminar usuario');
      }
      console.log('Usuario eliminado con ID:', userId);
      loadUsers();
    })
    .catch(error => console.error('Error en DELETE:', error));
}

/**
 * Restablece el formulario
 */
function resetForm() {
  document.getElementById('user-form').reset();
  document.getElementById('id').value = '';
  document.getElementById('form-title').textContent = 'Crear Usuario';
  document.getElementById('cancel-button').style.display = 'none';
}
