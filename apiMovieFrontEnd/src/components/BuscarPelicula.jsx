import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa los estilos de Bootstrap

function BuscarPelicula() {
  const [movieTitle, setMovieTitle] = useState('');
  const [movieInfo, setMovieInfo] = useState(null);

  useEffect(() => {
    // Realizar la búsqueda de películas automáticamente cuando el título cambia
    const searchMoviesByTitle = async () => {
      if (movieTitle.trim() === '') {
        setMovieInfo(null);
        return;
      }

      const apiKey = 'f0a244b1'; // Reemplaza con tu API Key de OMDB
      const apiUrl = `http://www.omdbapi.com/?t=${encodeURI(movieTitle)}&apikey=${apiKey}`;

      try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.Response === 'True') {
          setMovieInfo(data);
        } else {
          setMovieInfo(null);
        }
      } catch (error) {
        console.error('Error al buscar película por título:', error);
      }
    };

    searchMoviesByTitle(); // Realizar la búsqueda al cargar el componente
  }, [movieTitle]);

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <h3>Buscar Películas</h3>
          <div className="form-group d-flex">
            <input
              type="text"
              className="form-control"
              placeholder="Escribe el título de una película..."
              value={movieTitle}
              onChange={(e) => setMovieTitle(e.target.value)}
            />
          </div>
        </div>
        {movieInfo && (
          <div className="col-md-6">
            <div className="card" style={{ maxWidth: '40rem' }}> {/* Aumenta el maxWidth */}
              <div className="row no-gutters">
                <div className="col-md-4">
                  {movieInfo.Poster && (
                    <img
                      src={movieInfo.Poster}
                      className="card-img"
                      alt={`Poster de ${movieInfo.Title}`}
                      style={{ maxHeight: '400px' }} // Establecer un alto máximo para la imagen
                    />
                  )}
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">{movieInfo.Title}</h5>
                    <p className="card-text">
                      <strong>Año:</strong> {movieInfo.Year}
                    </p>
                    <p className="card-text">
                      <strong>Género:</strong> {movieInfo.Genre}
                    </p>
                    <p className="card-text">
                      <strong>Actores:</strong> {movieInfo.Actors}
                    </p>
                    <p className="card-text">
                      <strong>Trama:</strong> {movieInfo.Plot}
                    </p>
                    {/* Agrega más detalles de la película según tus necesidades */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BuscarPelicula;
