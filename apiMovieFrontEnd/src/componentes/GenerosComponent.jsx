import React, { useEffect, useState } from 'react';
import TablasComponent from './TablasComponent';

function GenerosComponent() {
  const [generos, setGeneros] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8000/api/generos')
      .then((response) => response.json())
      .then((data) => {
        setGeneros(data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, []);

  const encabezados = ['nombre']; // Define los encabezados que deseas mostrar

  const handleEditar = (fila) => {
    // Implementa la lógica de edición aquí
    console.log('Editar', fila);
  };

  const handleBorrar = (fila) => {
    // Implementa la lógica de borrado aquí
    console.log('Borrar', fila);
  };

  const handleCrear = () => {
    // Implementa la lógica para crear un nuevo género aquí
    console.log('Crear nuevo género');
  };

  return (
    <div>
      <h2 className="m-3">Géneros</h2>

      {isLoading ? (
        <p>Cargando datos...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <TablasComponent
          datos={generos}
          encabezados={encabezados}
          onEditar={handleEditar}
          onBorrar={handleBorrar}
          onCrear={handleCrear}
          nombreTabla="Tabla de Géneros"
        />
      )}
    </div>
  );
}

export default GenerosComponent;
