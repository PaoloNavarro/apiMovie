import React, { useEffect, useState } from 'react';
import '../../css/stylos.css';
import Select from 'react-select';
import { obtenerDatos, filtrarPeliculas } from '../../utilities/api';
import ReactPaginate from 'react-paginate';
import 'bootstrap/dist/css/bootstrap.min.css';
import Spinner from 'react-bootstrap/Spinner'; // Importa el Spinner component

function InicioComponent() {
  const [peliculasData, setPeliculasData] = useState([]);
  const [actores, setActores] = useState([]);
  const [generos, setGeneros] = useState([]);
  const [anios, setAnios] = useState([]);
  const [nombresPeliculas, setNombresPeliculas] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [filtroGenero, setFiltroGenero] = useState(null);
  const [filtroActor, setFiltroActor] = useState(null);
  const [filtroCalificacion, setFiltroCalificacion] = useState('');
  const [filtroFavoritas, setFiltroFavoritas] = useState(false);
  const [filtroAnio, setFiltroAnio] = useState('');
  const [filtroNombrePelicula, setFiltroNombrePelicula] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const perPage = 6;

  const startIndex = currentPage * perPage;
  const endIndex = startIndex + perPage;
  const peliculasPaginadas = peliculasData.slice(startIndex, endIndex);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const opcionesCalificacion = [
    { value: '1', label: '1 Estrella' },
    { value: '2', label: '2 Estrellas' },
    { value: '3', label: '3 Estrellas' },
    { value: '4', label: '4 Estrellas' },
    { value: '5', label: '5 Estrellas' },
  ];

  const closeLoadingModal = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);

    obtenerDatos('actores')
      .then((data) => {
        const opcionesActores = data.map((actor) => ({
          value: actor.nombre,
          label: actor.nombre,
        }));
        setActores(opcionesActores);
        closeLoadingModal();
      })
      .catch((error) => {
        console.error('Error al obtener actores:', error);
        closeLoadingModal();
      });

    obtenerDatos('generos')
      .then((data) => {
        const opcionesGeneros = data.map((genero) => ({
          value: genero.nombre,
          label: genero.nombre,
        }));
        setGeneros(opcionesGeneros);
        closeLoadingModal();
      })
      .catch((error) => {
        console.error('Error al obtener géneros:', error);
        closeLoadingModal();
      });

    obtenerDatos('peliculas')
      .then((data) => {
        const aniosUnicos = [...new Set(data.map((pelicula) => pelicula.anio))];
        const opcionesAnios = aniosUnicos.map((anio) => ({
          value: anio,
          label: anio.toString(),
        }));

        const nombresPeliculasUnicos = [...new Set(data.map((pelicula) => pelicula.titulo))];
        const opcionesNombresPeliculas = nombresPeliculasUnicos.map((nombrePelicula) => ({
          value: nombrePelicula,
          label: nombrePelicula,
        }));

        setAnios(opcionesAnios);
        setNombresPeliculas(opcionesNombresPeliculas);

        setPeliculasData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, []);

  const cargarPeliculas = () => {
    setIsLoading(true);

    obtenerDatos('peliculas')
      .then((data) => {
        setPeliculasData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  };

  const aplicarFiltros = async () => {
    setIsLoading(true);

    try {
      const filtros = {};

      if (filtroGenero) {
        filtros.genero = filtroGenero.value;
      }

      if (filtroActor) {
        filtros.actor = filtroActor.value;
      }

      if (filtroCalificacion) {
        filtros.calificacion = filtroCalificacion;
      }

      if (filtroFavoritas) {
        filtros.favorito = filtroFavoritas ? 's' : 'n';
      }

      if (filtroAnio) {
        filtros.anio = filtroAnio.value;
      }

      if (filtroNombrePelicula) {
        filtros.nombrePelicula = filtroNombrePelicula.value;
      }

      const peliculasFiltradas = await filtrarPeliculas(filtros);
      setPeliculasData(peliculasFiltradas);

      setIsLoading(false);
    } catch (error) {
      console.error('Error al filtrar películas:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    aplicarFiltros();
  }, [filtroGenero, filtroActor, filtroCalificacion, filtroFavoritas, filtroAnio, filtroNombrePelicula]);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Peliculas por filtro</h2>

      {/* Controles de filtro */}
      <div className="row mb-3">
        <div className="col-md-3">
          <h4>Filtrar por Género:</h4>
          <Select
            options={generos}
            value={filtroGenero}
            onChange={(selectedOption) => setFiltroGenero(selectedOption)}
            isClearable
          />
        </div>
        <div className="col-md-3">
          <h4>Filtrar por Actor:</h4>
          <Select
            options={actores}
            value={filtroActor}
            onChange={(selectedOption) => setFiltroActor(selectedOption)}
            isClearable
          />
        </div>
        <div className="col-md-3">
          <h4>Filtrar por Calificación:</h4>
          <Select
            options={opcionesCalificacion}
            value={filtroCalificacion}
            onChange={(selectedOption) => setFiltroCalificacion(selectedOption)}
            isClearable
          />
        </div>
        <div className="col-md-3">
          <h4>Filtrar por Favoritas:</h4>
          <input
            type="checkbox"
            checked={filtroFavoritas}
            onChange={() => setFiltroFavoritas(!filtroFavoritas)}
          />
        </div>
      </div>
      <div className="row mb-5">
        {/* Campo de filtro por año */}
        <div className="col-md-3">
          <h4>Filtrar por Año:</h4>
          <Select
            options={anios}
            value={filtroAnio}
            onChange={(selectedOption) => setFiltroAnio(selectedOption)}
            isClearable
          />
        </div>

        {/* Campo de filtro por Nombre de Película */}
        <div className="col-md-4">
          <h4>Filtrar por Nombre de Película:</h4>
          <Select
            options={nombresPeliculas}
            value={filtroNombrePelicula}
            onChange={(selectedOption) => setFiltroNombrePelicula(selectedOption)}
            isClearable
          />
        </div>
      </div>

      {isLoading ? (
        // Muestra el spinner mientras se cargan los datos
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
          <p>Cargando datos...</p>
        </div>
        ) : peliculasPaginadas.length === 0 ? (
           <p>No se encontraron películas que coincidan con los filtros.</p>
      ) : (
        <div className="row mb-3">
          {peliculasPaginadas.map((pelicula) => (
            <div className="col-md-4 mb-3" key={pelicula.id}>
              <div className="card zoom-card" style={{ boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)' }}>
                <img src={pelicula.imagen} alt={pelicula.titulo} className="card-img-top" />
                <div className='card-body'>
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
                    <p className="card-text">
                  <strong>Puntuación:</strong> {pelicula.puntuacion} Estrellas
                </p>
                </div>
            
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="row justify-content-center">
        <div className="col-md-12">
          <ReactPaginate
            previousLabel={<button className="me-3 btn btn-primary">Anterior</button>}
            nextLabel={<button className="ms-3 btn btn-primary">Siguiente</button>}
            breakLabel={'...'}
            pageCount={Math.ceil(peliculasData.length / perPage)}
            onPageChange={handlePageClick}
            containerClassName={'pagination justify-content-center'}
            pageClassName={'page-item me-1'}
            pageLinkClassName={'page-link'}
          />
        </div>
      </div>
    </div>
  );
}

export default InicioComponent;
