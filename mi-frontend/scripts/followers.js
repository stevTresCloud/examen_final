// scripts/followers.js

const FOLLOWERS_API_URL = 'http://localhost:9090/seguidores/api/stevenluna/followers';

document.addEventListener('DOMContentLoaded', () => {
  loadFollowers();

  const followerForm = document.getElementById('follower-form');
  const cancelButton = document.getElementById('cancel-button');

  followerForm.addEventListener('submit', handleSubmit);
  cancelButton.addEventListener('click', resetForm);
});

/**
 * Carga la lista de seguidores (GET)
 */
function loadFollowers() {
  fetch(FOLLOWERS_API_URL)
    .then(response => response.json())
    .then(data => {
      renderFollowerList(data);
    })
    .catch(error => {
      console.error('Error al cargar seguidores:', error);
    });
}

/**
 * Muestra la lista de seguidores en una tabla de Bootstrap
 */
function renderFollowerList(followers) {
  const followerListDiv = document.getElementById('follower-list');
  followerListDiv.innerHTML = '';

  let html = '<h2 class="mb-3">Lista de Seguidores</h2>';

  if (!followers || followers.length === 0) {
    html += '<p>No hay seguidores registrados.</p>';
  } else {
    html += `
      <div class="table-responsive">
        <table class="table table-striped align-middle">
          <thead>
            <tr>
              <th>ID Usuario</th>
              <th>ID Seguidor</th>
              <th>Fecha Seguimiento</th>
              <th>Estado</th>
              <th style="width: 150px;">Acciones</th>
            </tr>
          </thead>
          <tbody>
    `;

    followers.forEach(follower => {
      html += `
        <tr>
          <td>${follower.userId}</td>
          <td>${follower.followerUserId}</td>
          <td>${follower.followDate ? follower.followDate : '---'}</td>
          <td>${follower.status ? follower.status : '---'}</td>
          <td>
            <button 
              class="btn btn-sm btn-warning me-2" 
              onclick="editFollower('${follower.id}')"
            >
              Editar
            </button>
            <button 
              class="btn btn-sm btn-danger" 
              onclick="deleteFollower('${follower.id}')"
            >
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

  followerListDiv.innerHTML = html;
}

/**
 * Maneja el submit del formulario para crear o actualizar
 */
function handleSubmit(event) {
  event.preventDefault();

  const idField = document.getElementById('id');
  const userIdField = document.getElementById('userId');
  const followerUserIdField = document.getElementById('followerUserId');
  const followDateField = document.getElementById('followDate');
  const statusField = document.getElementById('status');

  // Objeto con los datos del seguidor
  const follower = {
    userId: userIdField.value.trim(),
    followerUserId: followerUserIdField.value.trim(),
    followDate: followDateField.value ? followDateField.value : null,
    status: statusField.value.trim()
  };

  const followerId = idField.value;
  if (followerId) {
    // PUT (actualizar)
    fetch(`${FOLLOWERS_API_URL}/${followerId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(follower)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al actualizar el seguidor');
        }
        return response.json();
      })
      .then(updatedFollower => {
        console.log('Seguidor actualizado:', updatedFollower);
        resetForm();
        loadFollowers();
      })
      .catch(error => console.error('Error en PUT:', error));
  } else {
    // POST (crear)
    fetch(FOLLOWERS_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(follower)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al crear el seguidor');
        }
        return response.json();
      })
      .then(createdFollower => {
        console.log('Seguidor creado:', createdFollower);
        resetForm();
        loadFollowers();
      })
      .catch(error => console.error('Error en POST:', error));
  }
}

/**
 * Obtiene un seguidor (GET /:id) para editar
 */
function editFollower(followerId) {
  document.getElementById('form-title').textContent = 'Editar Seguidor';
  document.getElementById('cancel-button').style.display = 'inline-block';

  fetch(`${FOLLOWERS_API_URL}/${followerId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al obtener el seguidor');
      }
      return response.json();
    })
    .then(follower => {
      // Rellenamos los campos
      document.getElementById('id').value = follower.id;
      document.getElementById('userId').value = follower.userId;
      document.getElementById('followerUserId').value = follower.followerUserId;
      document.getElementById('followDate').value = follower.followDate || '';
      document.getElementById('status').value = follower.status || '';
    })
    .catch(error => console.error('Error al obtener el seguidor:', error));
}

/**
 * Elimina un seguidor (DELETE /:id)
 */
function deleteFollower(followerId) {
  if (!confirm('¿Estás seguro de eliminar este seguidor?')) {
    return;
  }

  fetch(`${FOLLOWERS_API_URL}/${followerId}`, {
    method: 'DELETE'
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al eliminar el seguidor');
      }
      console.log('Seguidor eliminado con ID:', followerId);
      loadFollowers();
    })
    .catch(error => console.error('Error en DELETE:', error));
}

/**
 * Restablece el formulario
 */
function resetForm() {
  document.getElementById('follower-form').reset();
  document.getElementById('id').value = '';
  document.getElementById('form-title').textContent = 'Agregar Seguidor';
  document.getElementById('cancel-button').style.display = 'none';
}
