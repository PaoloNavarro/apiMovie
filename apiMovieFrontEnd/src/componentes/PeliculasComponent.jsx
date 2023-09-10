import React, { useEffect, useState } from 'react';
import TablasComponent from './TablasComponent';

function PeliculasComponent() {
  const [peliculas, setPeliculas] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8000/api/peliculas')
      .then((response) => response.json())
      .then((data) => {
        setPeliculas(data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, []);

  const encabezados = ['titulo', 'director', 'anio']; // Define los encabezados que deseas mostrar

  const handleEditar = (fila) => {
    // Implementa la lógica de edición aquí
    console.log('Editar', fila);
  };

  const handleBorrar = (fila) => {
    // Implementa la lógica de borrado aquí
    console.log('Borrar', fila);
  };

  const handleCrear = () => {
    // Implementa la lógica para crear una nueva película aquí
    console.log('Crear nueva película');
  };

  return (
    <div>
      <h2 className="m-3">Peliculas</h2>
      {isLoading ? (
        <p>Cargando datos...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <TablasComponent
          datos={peliculas}
          encabezados={encabezados}
          onEditar={handleEditar}
          onBorrar={handleBorrar}
          onCrear={handleCrear}
          nombreTabla="Tabla de Películas"
        />
      )}
    </div>
  );
}

export default PeliculasComponent;
