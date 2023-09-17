import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function BuscarPelicula() {
  const [movieTitle, setMovieTitle] = useState('');
  const [movieInfo, setMovieInfo] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [requestBodyJSON, setRequestBodyJSON] = useState('');

  const addMovieToLocalAPI = async () => {
    if (movieInfo) {
      const generos = movieInfo.Genre.split(',').map((item) => item.trim());
      const actores = movieInfo.Actors.split(',').map((item) => item.trim());

      const requestBody = {
        titulo: movieInfo.Title,
        anio: movieInfo.Year,
        descripcion: movieInfo.Plot,
        generos: generos,
        actores: actores,
      };

      // Mostrar el JSON en el área de previsualización antes de enviarlo
      setRequestBodyJSON(JSON.stringify(requestBody, null, 2));

      try {
        const response = await fetch('http://localhost:8000/api/detalles', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });

        if (response.ok) {
          console.log('Película almacenada con éxito en tu API.');
          setErrorMessage('');
        } else {
          console.error('Error al almacenar la película en tu API.');
          setErrorMessage('Error al almacenar la película en tu API.');
        }
      } catch (error) {
        console.error('Error al almacenar película en tu API:', error);
        setErrorMessage('Error al conectar con la API.');
      }
    }
  };

  useEffect(() => {
    const searchMoviesByTitle = async () => {
      if (movieTitle.trim() === '') {
        setMovieInfo(null);
        return;
      }

      const apiKey = 'f0a244b1'; // Reemplaza con tu API Key de OMDB
      const apiUrl = `http://www.omdbapi.com/?t=${encodeURI(
        movieTitle
      )}&apikey=${apiKey}`;

      try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.Response === 'True') {
          setMovieInfo(data);
          setErrorMessage('');
        } else {
          setMovieInfo(null);
          setErrorMessage('Película no encontrada.');
        }
      } catch (error) {
        console.error('Error al buscar película por título:', error);
        setErrorMessage('Error al conectar con la API.');
      }
    };

    searchMoviesByTitle();
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
          {errorMessage && (
            <div className="alert alert-danger" role="alert">
              {errorMessage}
            </div>
          )}
        </div>
        {movieInfo && (
          <div className="col-md-6">
            <div className="card" style={{ maxWidth: '40rem' }}>
              {movieInfo.Poster && (
                <img
                  src={movieInfo.Poster}
                  className="card-img"
                  alt={`Poster de ${movieInfo.Title}`}
                  style={{ maxHeight: '400px' }}
                />
              )}
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
                <button
                  className="btn btn-primary"
                  onClick={addMovieToLocalAPI}
                >
                  Agregar Película
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      {requestBodyJSON && (
        <div className="row mt-3">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">JSON del Cuerpo de la Solicitud:</h5>
                <pre>{requestBodyJSON}</pre>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BuscarPelicula;
