import React, { useEffect, useState } from 'react';
import TablasComponent from '../../components/TablasComponent';
import { useNavigate } from 'react-router-dom';
import { obtenerDatos } from '../../utilities/api'; // Ajusta la importación según tu estructura de carpetas
import Spinner from 'react-bootstrap/Spinner'; // Importa el componente Spinner
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/stylos.css';


function ActoresComponent() {
  const [actores, setActores] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    obtenerDatos('actores') // Llama a la función obtenerDatos con el nombre de la tabla 'actores'
      .then((dataObtenida) => {
        setActores(dataObtenida);
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
      <button onClick={handleCrear} className="btn btn-success  add-movie-button m-3 ">
      <i className="fas fa-plus"></i>Crear Nuevo Actor
      </button>

      {isLoading ? (
        // Muestra el spinner mientras se cargan los datos
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
          <p>Cargando datos...</p>
        </div>
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
