const API_URL = 'http://localhost:8000/api'; // Cambia la URL a la de tu API

export function obtenerDatos(tabla) {
  return fetch(`${API_URL}/${tabla}`)
    .then((response) => response.json())
    .then((data) => {
      return data.data;
    })
    .catch((error) => {
      console.error('Error al obtener datos:', error);
      throw error;
    });
}

// Fuciones para crud basico. 
export function borrarRegistro(id, tabla) {
    return fetch(`http://localhost:8000/api/${tabla}/${id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Registro eliminado:', data);
        return data;
      })
      .catch((error) => {
        console.error('Error al eliminar el registro', error);
        throw error;
      });
}

// Función para filtrar películas
export const filtrarPeliculas = async (filtros) => {
  try {
    const response = await fetch(`${API_URL}/peliculas/filtrar`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ filtro: filtros }),
    });

    if (!response.ok) {
      throw new Error('Error al filtrar películas');
    }

    const data = await response.json();
    return data.data; // Retorna los datos de películas filtradas
  } catch (error) {
    console.error('Error al filtrar películas:', error);
    throw error; // Re-lanza el error para que se maneje donde se llame esta función
  }
};



// Función para actualizar la puntuación de una película
export const actualizarPuntuacion = (peliculaId, puntuacion) => {
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ puntuacion }), // Puedes ajustar los nombres de los campos según tu API
  };

  return fetch(`${API_URL}/peliculas/${peliculaId}/asignar-puntuacion`, requestOptions)
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error al actualizar la puntuación:', error);
      throw error;
    });
};

export const actualizarFavorito = (peliculaId, nuevoFavorito) => {
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ favorito: nuevoFavorito }), // Envía el nuevo estado de favorito en el cuerpo de la solicitud
  };
 
  return fetch(`${API_URL}/peliculas/${peliculaId}/hacer-favorito`, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      // Aquí puedes manejar la respuesta si es necesario
      return data; // Puedes retornar la respuesta del servidor si deseas
    })
    .catch((error) => {
      console.error('Error al actualizar el estado de favorito:', error);
      throw error;
    });
};




