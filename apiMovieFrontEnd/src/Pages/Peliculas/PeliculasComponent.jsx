import React, { useEffect, useState } from 'react';
import TablasComponent from '../../components/TablasComponent';
import { useNavigate } from 'react-router-dom';
import { borrarRegistro } from '../../utilities/api';

function PeliculasComponent() {
  const [peliculas, setPeliculas] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

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

  const encabezados = ['titulo', 'anio'];

  const handleEditar = (fila) => {
    console.log('Editar', fila);
    // Implementa la lógica para editar una película aquí
  };

  const handleBorrar = (peliculaId) => {
    // Utiliza la función borrarRegistro para borrar el registro
    borrarRegistro(peliculaId, 'peliculas') // Proporciona el nombre correcto de la tabla
      .then(() => {
        // Actualiza el estado de películas después de borrar
        setPeliculas((prevPeliculas) =>
          prevPeliculas.filter((pelicula) => pelicula.id !== peliculaId)
        );
      })
      .catch((error) => {
        // Puedes manejar el error aquí si es necesario
      });
  };

  const handleCrear = () => {
    console.log('Crear nueva película');
    // Implementa la lógica para crear una nueva película aquí
    navigate('/peliculas/detallecrear');
  };

  return (
    <div>
      <h2 className="m-3">Peliculas</h2>
      <button onClick={handleCrear} className="btn btn-success m-3">
        Crear Nueva Película
      </button>

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
          nombreTabla="Tabla de peliculas"
        />
      )}
    </div>
  );
}

export default PeliculasComponent;
