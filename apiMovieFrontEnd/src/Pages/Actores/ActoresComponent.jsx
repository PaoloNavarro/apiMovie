import React, { useEffect, useState } from 'react';
import TablasComponent from '../../components/TablasComponent';
import { useNavigate } from 'react-router-dom';
import { borrarRegistro } from '../../utilities/api';

function ActoresComponent() {
  const [actores, setActores] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

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
        console.error('Error al cargar los actores', error);
      });
  }, []);

  const encabezados = ['nombre'];

  const handleEditar = (fila) => {
    console.log('Editar', fila);
    // Implementa la lógica para editar un actor aquí
  };

  const handleBorrar = (actorId) => {
    // Utiliza la función borrarRegistro para borrar el registro
    borrarRegistro(actorId, 'actores') // Proporciona el nombre correcto de la tabla
      .then(() => {
        // Actualiza el estado de actores después de borrar
        setActores((prevActores) =>
          prevActores.filter((actor) => actor.id !== actorId)
        );
      })
      .catch((error) => {
        // Puedes manejar el error aquí si es necesario
      });
  };

  const handleCrear = () => {
    console.log('Crear nuevo actor');
    navigate('/actores/crear');
  };

  return (
    <div>
      <h2 className="m-3">Actores</h2>
      <button onClick={handleCrear} className="btn btn-success m-3">
        Crear Nuevo Actor
      </button>

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
          nombreTabla="Tabla de actores"
        />
      )}
    </div>
  );
}

export default ActoresComponent;
