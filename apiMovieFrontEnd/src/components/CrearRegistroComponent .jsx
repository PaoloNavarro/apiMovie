import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // Importa SweetAlert2

function CrearRegistroComponent({ formData, onRegistroCreado }) {
  const [formValues, setFormValues] = useState(formData);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:8000/api/${formValues.tabla}`, {
      method: 'POST',
      body: JSON.stringify(formValues),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Registro creado:', data);

        // Mostrar alerta de éxito con SweetAlert2
        Swal.fire({
          icon: 'success',
          title: 'Registro creado con éxito',
          timer: 1500,
          showConfirmButton: false,
        });

        if (onRegistroCreado) {
          onRegistroCreado(data);
        }

        setFormValues(formData);
        navigate(`/${formValues.tabla}`);
      })
      .catch((error) => {
        console.error('Error al crear el registro', error);

        // Mostrar alerta de error con SweetAlert2
        Swal.fire({
          icon: 'error',
          title: 'Error al crear el registro',
          timer: 1500,
          showConfirmButton: false,
        });
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const renderFormFields = () => {
    return Object.keys(formValues)
      .filter((fieldName) => fieldName !== 'tabla')
      .map((fieldName) => (
        <Form.Group key={fieldName} controlId={fieldName}>
          <Form.Label>{fieldName}:</Form.Label>
          <Form.Control
            type='text'
            name={fieldName}
            value={formValues[fieldName]}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
      ));
  };

  return (
    <div className='m-3'>
      <div>
        <h3>Crear Nuevo Registro en {formValues.tabla}</h3>
        <Form onSubmit={handleSubmit}>
          {renderFormFields()}
          <Button className='mt-3' variant='primary' type='submit'>
            Crear
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default CrearRegistroComponent;
