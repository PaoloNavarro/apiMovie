import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';


function CrearDetallePelicula() {
  const [movieTitle, setMovieTitle] = useState('');
  const [movieInfo, setMovieInfo] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [requestBodyJSON, setRequestBodyJSON] = useState('');
  const [imagen, setImagen] = useState(''); // Estado para almacenar la imagen

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
        imagen: movieInfo.Poster,
      };
  
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
  
          // Display success SweetAlert
          const result = await Swal.fire({
            icon: 'success',
            title: 'Película agregada con éxito',
            text: 'La película se ha agregado correctamente a tu API.',
            showCancelButton: true,
            confirmButtonText: 'Agregar otra película',
            cancelButtonText: 'Finalizar',
          });
  
          if (result.isConfirmed) {
            // User chose to add another movie, reset the form or take any necessary action
            // For example, you can reset the movieTitle to clear the input field
            setMovieTitle('');
          } else {
            // User chose to finish, redirect to /peliculas
            window.location.href = '/peliculas';
          }
        } else {
          console.error('Error al almacenar la película en tu API.');
          setErrorMessage('Error al almacenar la película en tu API.');
  
          // Display error SweetAlert
          Swal.fire({
            icon: 'error',
            title: 'Error al agregar película',
            text: 'Hubo un error al agregar la película a tu API.',
          });
        }
      } catch (error) {
        console.error('Error al almacenar película en tu API:', error);
        setErrorMessage('Error al conectar con la API.');
  
        // Display error SweetAlert
        Swal.fire({
          icon: 'error',
          title: 'Error al conectar con la API',
          text: 'Hubo un error al conectar con la API.',
        });
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
            <div className="alert alert-danger mt-3" role="alert">
              {errorMessage}
            </div>
          )}
        </div>
        {movieInfo && (
          <div className="col-md-6">
            <div className="card mb-3">
              <div className="row g-0">
                <div className="col-md-4">
                  {movieInfo.Poster && (
                    <img
                      src={movieInfo.Poster}
                      className="card-img ms-3 mt-3 p-2"
                      alt={`Poster de ${movieInfo.Title}`}
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
                    <button className="btn btn-success add-movie-button mb-5 " onClick={addMovieToLocalAPI}>
                      <i className="fas fa-plus"></i> Agregar Película
                    </button>
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

export default CrearDetallePelicula;
