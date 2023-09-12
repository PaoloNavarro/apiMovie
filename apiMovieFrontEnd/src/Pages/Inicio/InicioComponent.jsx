import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa los estilos de Bootstrap

function InicioComponent() {
  const [movieTitle, setMovieTitle] = useState('');
  const [movieInfo, setMovieInfo] = useState(null);

  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

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

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Página de Inicio</h2>

      <div className="row">
        <div className="col-md-6">
          <h3>Buscar Películas</h3>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Escribe el título de una película..."
              value={movieTitle}
              onChange={(e) => {
                setMovieTitle(e.target.value);
                searchMoviesByTitle();
              }}
            />
          </div>
        </div>
      </div>

      {movieInfo && (
        <div className="mt-4">
          <h3>Información de la película</h3>
          <p><strong>Título:</strong> {movieInfo.Title}</p>
          <p><strong>Año:</strong> {movieInfo.Year}</p>
          <p><strong>Género:</strong> {movieInfo.Genre}</p>
          <p><strong>Actores:</strong> {movieInfo.Actors}</p>
          <p><strong>Trama:</strong> {movieInfo.Plot}</p>
          {/* Agrega más detalles de la película según tus necesidades */}
        </div>
      )}
    </div>
  );
}

export default InicioComponent;
