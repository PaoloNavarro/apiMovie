import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function EditarRegistroComponent() {
  const { tabla, id } = useParams();
  const [formValues, setFormValues] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    // Realizar una solicitud para obtener los datos del registro a editar
    fetch(`http://localhost:8000/api/${tabla}/${id}`)
      .then((response) => response.json())
      .then((data) => {
        // Actualizar los valores en formValues con los datos del registro
        setFormValues(data.data);
        console.log(data);
      })
      .catch((error) => {
        console.error('Error al cargar los datos del registro', error);
      });
  }, [tabla, id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Realizar una solicitud para actualizar el registro
    fetch(`http://localhost:8000/api/${tabla}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(formValues),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Registro editado:', data);

        // Mostrar una alerta de éxito con SweetAlert2
        Swal.fire({
          icon: 'success',
          title: 'Registro editado con éxito',
          timer: 1500,
          showConfirmButton: false,
        });

        navigate(`/${tabla}`); // Redirigir usando la tabla correcta
      })
      .catch((error) => {
        console.error('Error al editar el registro', error);

        // Mostrar una alerta de error con SweetAlert2
        Swal.fire({
          icon: 'error',
          title: 'Error al editar el registro',
          text: 'Ocurrió un error al editar el registro.',
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
    return Object.keys(formValues).map((fieldName) => {
      // Lista de campos a ocultar
      const camposOcultos = ["id", "created_at", "updated_at"];
  
      // Verifica si el campo actual debe ocultarse
      if (!camposOcultos.includes(fieldName)) {
        return (
          <Form.Group key={fieldName} controlId={fieldName}>
            <Form.Label>{fieldName}:</Form.Label>
            <Form.Control
              type='text'
              name={fieldName}
              value={formValues[fieldName] || ''}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
        );
      }
      
      // Si el campo debe ocultarse, devuelve null para no renderizarlo
      return null;
    });
  };

  return (
    <div className='m-3'>
      <div>
        <h3>Editar Registro en {tabla}</h3>
        <Form onSubmit={handleSubmit}>
          {renderFormFields()}
          <Button className='mt-3' variant='primary' type='submit'>
            Guardar Cambios
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default EditarRegistroComponent;
