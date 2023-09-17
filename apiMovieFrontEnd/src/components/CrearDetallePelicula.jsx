import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Table, Button } from 'react-bootstrap';
import Select from 'react-select';
import BuscarPelicula from './BuscarPelicula';// Ajusta la ruta de importación según tu estructura de archivos

function CrearDetallePelicula() {
  const [actorOptions, setActorOptions] = useState([]);
  const [generoOptions, setGeneroOptions] = useState([]);
  const [selectedActor, setSelectedActor] = useState(null);
  const [selectedGenero, setSelectedGenero] = useState(null);
  const [actoresSeleccionados, setActoresSeleccionados] = useState([]);
  const [generosSeleccionados, setGenerosSeleccionados] = useState([]);
  const [mostrarAgregarPelicula, setMostrarAgregarPelicula] = useState(false);
  const [peliculaAgregada, setPeliculaAgregada] = useState(false); // Nuevo estado
  const [peliculaInfo, setPeliculaInfo] = useState(null); // Nuevo estado para almacenar la información de la película

  // Resto del código...

  const handleAgregarPelicula = () => {
    // Agregar lógica para crear una película aquí

    // Una vez que la película se ha agregado, establecer el estado de película agregada en true
    setPeliculaAgregada(true);
  };

  return (
    <div className="m-3">
      {!peliculaAgregada ? (
        <div>
          <h3>Agregar Película</h3>
          <BuscarPelicula setPeliculaInfo={setPeliculaInfo} />
          <Button className="mt-3" variant="primary" onClick={handleAgregarPelicula}>
            Agregar Película
          </Button>
        </div>
      ) : (
        <div>
          <h3>Crear Detalles de Película</h3>
          {/* Resto del código para actores y géneros*/}
        </div>
      )}
    </div>
  );
}

export default CrearDetallePelicula;
