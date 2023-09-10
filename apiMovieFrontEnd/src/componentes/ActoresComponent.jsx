import React, { useEffect, useState } from 'react';
import TablasComponent from './TablasComponent';
import CrearRegistroComponent from './CrearRegistroComponent '; // Importa el componente de creación

function ActoresComponent() {
  const [actores, setActores] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [mostrarFormulario, setMostrarFormulario] = useState(false); // Estado para mostrar/ocultar el formulario

  useEffect(() => {
    fetch('http://localhost:8000/api/actores')
      .then((response) => response.json())
      .then((data) => {
        setActores(data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, []);

  const encabezados = ['nombre'];

  const handleEditar = (fila) => {
    console.log('Editar', fila);
    // Implementa la lógica para editar un actor aquí
  };

  const handleBorrar = (fila) => {
    console.log('Borrar', fila);
    // Implementa la lógica para borrar un actor aquí
  };

  const handleCrear = () => {
    console.log('Crear nuevo actor');
    // Implementa la lógica para mostrar el formulario de creación
    setMostrarFormulario(true);
  };

  // Función para manejar el registro creado
  const handleRegistroCreado = (nuevoActor) => {
    // Agrega el nuevo actor a la lista de actores
    setActores([...actores, nuevoActor]);

    // Oculta el formulario después de crear el registro
    setMostrarFormulario(false);
  };

  return (
    <div>
      <h2 className="m-3">Actores</h2>

      {mostrarFormulario ? (
        <CrearRegistroComponent
          tabla="actores" // Especifica la tabla correspondiente
          onRegistroCreado={handleRegistroCreado}
        />
      ) : (
        // Botón para mostrar el formulario de creación
        <button onClick={handleCrear} className="btn btn-success m-3">
          Crear Nuevo Actor
        </button>
      )}

      {isLoading ? (
        <p>Cargando datos...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <TablasComponent
          datos={actores}
          encabezados={encabezados}
          onEditar={handleEditar}
          onBorrar={handleBorrar}
          nombreTabla="Tabla de Actores"
        />
      )}
    </div>
  );
}

export default ActoresComponent;
