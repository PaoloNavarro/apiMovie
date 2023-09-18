import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  borrarRegistro,
  obtenerDatos,
  actualizarPuntuacion,
  actualizarFavorito,
} from '../../utilities/api';
import '@fortawesome/fontawesome-free/css/all.css';
import '../../css/stylos.css';
import ReactPaginate from 'react-paginate';
import Spinner from 'react-bootstrap/Spinner'; // Importa el componente Spinner


function PeliculasComponent() {
  const [peliculasData, setPeliculasData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0); // Cambiamos a 0
  const itemsPerPage = 3;
  const navigate = useNavigate();

  useEffect(() => {
    obtenerDatos('peliculas')
      .then((data) => {
        setPeliculasData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, []);

  const getHeartClass = (favorito) => {
    if (favorito === 's') {
      return 'fas fa-heart filled';
    } else {
      return 'far fa-heart';
    }
  };

  const handleEditar = (fila) => {
    console.log('Editar', fila);
      navigate(`/peliculas/editar/${fila.id}`);
    
    // Implementa la lógica para editar una película aquí
  };

  const handleBorrar = (peliculaId) => {
    borrarRegistro(peliculaId, 'peliculas')
      .then(() => {
        setPeliculasData((prevData) =>
          prevData.filter((pelicula) => pelicula.id !== peliculaId)
        );
      })
      .catch((error) => {
        // Puedes manejar el error aquí si es necesario
      });
  };

  const handleCrear = () => {
    console.log('Crear nueva película');
    // Implementa la lógica para crear una nueva película aquí
    navigate('/pelicula/detallecrear');
  };

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const renderStarRating = (pelicula) => {
    return (
      <div>
        <p className="star-rating-label">Calificación</p>
        <div className="star-rating">
          {Array.from({ length: 5 }).map((_, index) => (
            <i
              key={index}
              className={`fas fa-star${index < pelicula.puntuacion ? ' filled' : ''}`}
              onClick={() => handleCalificar(pelicula.id, index + 1)}
            ></i>
          ))}
        </div>
      </div>
    );
  };

  const handleCalificar = (peliculaId, newRating) => {
    console.log('Calificar con', newRating, 'estrellas');

    // Actualiza la puntuación en el servidor
    actualizarPuntuacion(peliculaId, newRating)
      .then(() => {
        // Actualiza la puntuación en el estado local de películas
        setPeliculasData((prevData) =>
          prevData.map((pelicula) =>
            pelicula.id === peliculaId ? { ...pelicula, puntuacion: newRating } : pelicula
          )
        );
      })
      .catch((error) => {
        // Puedes manejar el error aquí si es necesario
      });
  };

  const handleFavorito = (peliculaId, favorito) => {
    console.log('Marcar como favorito');

    // Determinar el nuevo valor de favorito
    const nuevoFavorito = favorito === 's' ? 'n' : 's';
    console.log(nuevoFavorito);

    // Cambiar el estado de favorito localmente
    setPeliculasData((prevData) =>
      prevData.map((pelicula) =>
        pelicula.id === peliculaId ? { ...pelicula, favorito: nuevoFavorito } : pelicula
      )
    );

    // Actualizar el estado de favorito en el servidor
    actualizarFavorito(peliculaId, nuevoFavorito)
      .then(() => {
        // No es necesario hacer nada aquí ya que ya hemos actualizado localmente
      })
      .catch((error) => {
        // Puedes manejar el error aquí si es necesario
      });
  };

  return (
    <div className="m-5">
      <h1>Peliculas</h1>
        <button onClick={handleCrear} className="btn btn-success add-movie-button mb-5">
          <i className="fas fa-plus"></i> Agregar Película
        </button>
     

      {isLoading ? (
        <div className="text-center">
        <Spinner animation="border" variant="primary" />
        <p>Cargando datos...</p>
        </div>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <div className="row mb-3">
          {peliculasData
            .slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
            .map((pelicula) => (
              <div className="col-md-4 mb-3" key={pelicula.id}>
                <div
                  className="card zoom-card"
                  style={{ boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)' }}
                >
                  <div className="card-body">
                    <button
                      id={`favorito-${pelicula.id}`}
                      className={`btn btn-danger btn-sm btn-favorite ${
                        pelicula.favorito === 's' ? 'favorito' : ''
                      }`}
                      onClick={() => handleFavorito(pelicula.id, pelicula.favorito)}
                    >
                      <i className={getHeartClass(pelicula.favorito)}></i>
                    </button>
                    <img
                      src={pelicula.imagen}
                      alt={pelicula.titulo}
                      className="mt-3 card-img-top"
                    />
                    <h5 className="card-title">{pelicula.titulo}</h5>
                    <p className="card-text">
                      <strong>Año:</strong> {pelicula.anio}
                    </p>
                    <p className="card-text">{pelicula.descripcion}</p>
                    <p className="card-text">
                      <strong>Géneros:</strong>{' '}
                      {pelicula.genero.map((genre) => genre.nombre).join(', ')}
                    </p>
                    <p className="card-text">
                      <strong>Actores:</strong>{' '}
                      {pelicula.actor.map((actor) => actor.nombre).join(', ')}
                    </p>
                    {renderStarRating(pelicula)}
                  </div>
                  <div className="card-footer card-footer-custom">
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleBorrar(pelicula.id)}
                    >
                      <i className="fas fa-trash"></i>
                    </button>

                    <button
                      className="btn btn-primary btn-sm ms-2"
                      onClick={() => handleEditar(pelicula)}
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
      <div className="pagination justify-content-center">
        <ReactPaginate
          previousLabel={<button className="me-3 btn btn-primary">Anterior</button>} 
          nextLabel={<button className="ms-3 btn btn-primary">Siguiente</button>}
          breakLabel={'...'}
          pageCount={Math.ceil(peliculasData.length / itemsPerPage)}
          onPageChange={handlePageClick}
          containerClassName={'pagination justify-content-center'}
          pageClassName={'page-item me-1'} 
          pageLinkClassName={'page-link'}
    
        />
      </div>
    </div>
  );
}

export default PeliculasComponent;
