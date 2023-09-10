import React, { useState } from 'react';

function CrearRegistroComponent({ tabla, onRegistroCreado }) {
  const [nombre, setNombre] = useState(''); // Cambia 'nombre' por el campo que corresponda

  const handleSubmit = (e) => {
    e.preventDefault();

    // Realiza una solicitud POST a tu API para crear el nuevo registro en la tabla especificada
    fetch(`http://localhost:8000/api/${tabla}`, {
      method: 'POST',
      body: JSON.stringify({ nombre }), // Ajusta los datos según el campo y la tabla
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Maneja la respuesta de la API, por ejemplo, muestra un mensaje de éxito
        console.log('Registro creado:', data);
        alert('Registro creado con éxito');
        
        // Llama a la función proporcionada para notificar que se creó un nuevo registro
        if (onRegistroCreado) {
          onRegistroCreado(data);
        }
      })
      .catch((error) => {
        // Maneja los errores, por ejemplo, muestra un mensaje de error
        console.error('Error al crear el registro', error);
        alert('Error al crear el registro');
      });
  };

  return (
    <div className='m-3'>
      <h2>Crear Nuevo Registro en {tabla}</h2>
      <form onSubmit={handleSubmit}>
        {/* Agrega campos de formulario aquí */}
        <div className="form-group mb-3">
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="form-control mt-3"
            required
          />
        </div>

        {/* Agrega más campos de formulario según tus necesidades */}

        <button type="submit" className="btn btn-primary">
          Crear
        </button>
      </form>
    </div>
  );
}

export default CrearRegistroComponent;
