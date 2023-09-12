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