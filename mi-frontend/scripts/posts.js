// scripts/posts.js

// Ajusta esta URL según tu host/puerto/path:
const POST_API_URL = 'http://localhost:9090/publicaciones/api/stevenluna/posts';

document.addEventListener('DOMContentLoaded', () => {
  loadPosts();

  const postForm = document.getElementById('post-form');
  const cancelButton = document.getElementById('cancel-button');

  postForm.addEventListener('submit', handleSubmit);
  cancelButton.addEventListener('click', resetForm);
});

/**
 * Carga la lista de publicaciones (GET)
 */
function loadPosts() {
  fetch(POST_API_URL)
    .then(response => response.json())
    .then(data => {
      renderPostList(data);
    })
    .catch(error => {
      console.error('Error al cargar publicaciones:', error);
    });
}

/**
 * Muestra la lista de publicaciones usando una tabla de Bootstrap
 */
function renderPostList(posts) {
  const postListDiv = document.getElementById('post-list');
  postListDiv.innerHTML = '';

  let html = '<h2 class="mb-3">Lista de Publicaciones</h2>';

  if (!posts || posts.length === 0) {
    html += '<p>No hay publicaciones registradas.</p>';
  } else {
    html += `
      <div class="table-responsive">
        <table class="table table-striped align-middle">
          <thead>
            <tr>
              <th>Título</th>
              <th>Contenido</th>
              <th>Fecha Creación</th>
              <th>ID Usuario</th>
              <th style="width: 150px;">Acciones</th>
            </tr>
          </thead>
          <tbody>
    `;

    posts.forEach(post => {
      html += `
        <tr>
          <td>${post.titulo}</td>
          <td>${post.contenido}</td>
          <td>${post.fechaCreacion ? post.fechaCreacion : 'No registrado'}</td>
          <td>${post.userId ? post.userId : '---'}</td>
          <td>
            <button 
              class="btn btn-sm btn-warning me-2" 
              onclick="editPost('${post.id}')"
            >
              Editar
            </button>
            <button 
              class="btn btn-sm btn-danger" 
              onclick="deletePost('${post.id}')"
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

  postListDiv.innerHTML = html;
}

/**
 * Maneja el submit del formulario para crear o actualizar
 */
function handleSubmit(event) {
  event.preventDefault();

  const idField = document.getElementById('post-id');
  const tituloField = document.getElementById('titulo');
  const contenidoField = document.getElementById('contenido');
  const userIdField = document.getElementById('userId');

  // Objeto con los datos de la publicación
  const post = {
    titulo: tituloField.value.trim(),
    contenido: contenidoField.value.trim(),
    userId: userIdField.value.trim()
  };

  // Si existe id, es UPDATE, si no, CREATE
  const postId = idField.value;
  if (postId) {
    // PUT
    fetch(`${POST_API_URL}/${postId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(post)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al actualizar la publicación');
        }
        return response.json();
      })
      .then(updatedPost => {
        console.log('Publicación actualizada:', updatedPost);
        resetForm();
        loadPosts();
      })
      .catch(error => console.error('Error en PUT:', error));
  } else {
    // POST
    fetch(POST_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(post)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al crear la publicación');
        }
        return response.json();
      })
      .then(createdPost => {
        console.log('Publicación creada:', createdPost);
        resetForm();
        loadPosts();
      })
      .catch(error => console.error('Error en POST:', error));
  }
}

/**
 * Obtiene una publicación (GET /:id) para editar
 */
function editPost(postId) {
  document.getElementById('form-title').textContent = 'Editar Publicación';
  document.getElementById('cancel-button').style.display = 'inline-block';

  fetch(`${POST_API_URL}/${postId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al obtener la publicación');
      }
      return response.json();
    })
    .then(post => {
      // Rellenamos los campos
      document.getElementById('post-id').value = post.id;
      document.getElementById('titulo').value = post.titulo;
      document.getElementById('contenido').value = post.contenido;
      document.getElementById('userId').value = post.userId || '';
    })
    .catch(error => console.error('Error al obtener la publicación:', error));
}

/**
 * Elimina una publicación (DELETE /:id)
 */
function deletePost(postId) {
  if (!confirm('¿Estás seguro de eliminar esta publicación?')) {
    return;
  }

  fetch(`${POST_API_URL}/${postId}`, {
    method: 'DELETE'
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al eliminar la publicación');
      }
      console.log('Publicación eliminada con ID:', postId);
      loadPosts();
    })
    .catch(error => console.error('Error en DELETE:', error));
}

/**
 * Restablece el formulario
 */
function resetForm() {
  document.getElementById('post-form').reset();
  document.getElementById('post-id').value = '';
  document.getElementById('form-title').textContent = 'Crear Publicación';
  document.getElementById('cancel-button').style.display = 'none';
}
