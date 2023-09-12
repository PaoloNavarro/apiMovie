import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Table, Button } from 'react-bootstrap';
import Select from 'react-select';

function CrearDetallePelicula() {
  const [actorOptions, setActorOptions] = useState([]);
  const [generoOptions, setGeneroOptions] = useState([]);
  const [selectedActor, setSelectedActor] = useState(null);
  const [selectedGenero, setSelectedGenero] = useState(null);
  const [actoresSeleccionados, setActoresSeleccionados] = useState([]);
  const [generosSeleccionados, setGenerosSeleccionados] = useState([]);
  const [mostrarAgregarPelicula, setMostrarAgregarPelicula] = useState(false);

  // Cargar opciones de actores y géneros al montar el componente
  useEffect(() => {
    fetch('http://localhost:8000/api/actores')
      .then((response) => response.json())
      .then((data) => {
        const actorData = data.data || [];
        setActorOptions(actorData.map((actor) => ({ value: actor.id, label: actor.nombre })));
      });

    fetch('http://localhost:8000/api/generos')
      .then((response) => response.json())
      .then((data) => {
        const generoData = data.data || [];
        setGeneroOptions(generoData.map((genero) => ({ value: genero.id, label: genero.nombre })));
      });
  }, []);

  const handleAddActor = () => {
    if (selectedActor) {
      setActoresSeleccionados([...actoresSeleccionados, selectedActor]);
      setSelectedActor(null);
    }
  };

  const handleAddGenero = () => {
    if (selectedGenero) {
      setGenerosSeleccionados([...generosSeleccionados, selectedGenero]);
      setSelectedGenero(null);
    }
  };

  const handleMostrarAgregarPelicula = () => {
    setMostrarAgregarPelicula(true);
  };

  // Agregar lógica para crear una película aquí

  return (
    <div className="m-3">
      <h3>Crear Detalles de Película</h3>
      <Row>
        <Col>
          <Form>
            <label>Selecciona un Actor:</label>
            <Select
              options={actorOptions}
              value={selectedActor}
              onChange={(selected) => setSelectedActor(selected)}
              isSearchable={true}
              menuMaxHeight={150}
            />
            <Button className="mt-3" variant="primary" onClick={handleAddActor}>
              Agregar Actor
            </Button>
          </Form>
        </Col>
        <Col>
          <Form>
            <label>Selecciona un Género:</label>
            <Select
              options={generoOptions}
              value={selectedGenero}
              onChange={(selected) => setSelectedGenero(selected)}
              isSearchable={true}
              menuMaxHeight={150}
            />
            <Button className="mt-3" variant="primary" onClick={handleAddGenero}>
              Agregar Género
            </Button>
          </Form>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <h4>Actores Seleccionados</h4>
          <Table>
            <thead>
              <tr>
                <th>Nombre</th>
              </tr>
            </thead>
            <tbody>
              {actoresSeleccionados.map((actor, index) => (
                <tr key={index}>
                  <td>{actor.label}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
        <Col>
          <h4>Géneros Seleccionados</h4>
          <Table>
            <thead>
              <tr>
                <th>Nombre</th>
              </tr>
            </thead>
            <tbody>
              {generosSeleccionados.map((genero, index) => (
                <tr key={index}>
                  <td>{genero.label}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
      {mostrarAgregarPelicula ? (
        // Mostrar la parte para agregar una película aquí
        <div>
          <h3>Agregar Película</h3>
          {/* Agregar campos de formulario y lógica para crear la película */}
        </div>
      ) : (
        <Button className="mt-3" variant="success" onClick={handleMostrarAgregarPelicula}>
          Agregar Película
        </Button>
      )}
    </div>
  );
}

export default CrearDetallePelicula;
