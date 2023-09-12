import React, { useEffect, useState } from 'react';
import TablasComponent from '../../components/TablasComponent';
import { useNavigate } from 'react-router-dom';
import { borrarRegistro } from '../../utilities/api';

function GenerosComponent() {
  const [generos, setGeneros] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

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
      <button onClick={handleCrear} className="btn btn-success m-3">
        Crear Nuevo Género
      </button>

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
          nombreTabla="Tabla de generos"
        />
      )}
    </div>
  );
}

export default GenerosComponent;
