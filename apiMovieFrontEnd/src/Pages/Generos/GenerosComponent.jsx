import React, { useEffect, useState } from 'react';
import TablasComponent from '../../components/TablasComponent';
import { useNavigate } from 'react-router-dom';
import { obtenerDatos, borrarRegistro } from '../../utilities/api'; // Ajusta la importación según tu estructura de carpetas
import Spinner from 'react-bootstrap/Spinner'; // Importa el componente Spinner
import '../../css/stylos.css';


function GenerosComponent() {
  const [generos, setGeneros] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    obtenerDatos('generos') // Llama a la función obtenerDatos con el nombre de la tabla 'generos'
      .then((dataObtenida) => {
        setGeneros(dataObtenida);
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
    // Implementa la lógica de edición aquí
  };

  const handleBorrar = (generoId) => {
    // Utiliza la función borrarRegistro para borrar el registro
    borrarRegistro(generoId, 'generos') // Proporciona el nombre correcto de la tabla
      .then(() => {
        // Actualiza el estado de generos después de borrar
        setGeneros((prevGeneros) =>
          prevGeneros.filter((genero) => genero.id !== generoId)
        );
      })
      .catch((error) => {
        // Puedes manejar el error aquí si es necesario
      });
  };

  const handleCrear = () => {
    console.log('Crear nuevo género');
    // Implementa la lógica para crear un nuevo género aquí
    navigate('/generos/crear');
  };

  return (
    <div>
      <h2 className="m-3">Géneros</h2>
      <button onClick={handleCrear} className="btn btn-success add-movie-button  m-3">
      <i className="fas fa-plus"></i>Crear Nuevo Género
      </button>
      

      {isLoading ? (
        <div className="text-center">
        <Spinner animation="border" variant="primary" />
        <p>Cargando datos...</p>
      </div>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <TablasComponent
          datos={generos}
          encabezados={encabezados}
          onEditar={handleEditar}
          onBorrar={handleBorrar}
          nombreTabla="Tabla de generos"
          
          
        />
      )}
    </div>
  );
}

export default GenerosComponent;
