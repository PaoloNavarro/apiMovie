import React from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function TablasComponent({ datos, encabezados, onEditar, onBorrar, nombreTabla }) {
  const navigate = useNavigate();

  // Verifica si hay datos antes de renderizar la tabla
  if (!Array.isArray(datos) || datos.length === 0) {
    return <p>No hay datos disponibles.</p>;
  }

  // Obtener el tercer valor después del espacio en blanco en nombreTabla
  const tablaParts = nombreTabla.split(' ');
  const nombreTablaCorto = tablaParts.length >= 3 ? tablaParts[2] : nombreTabla;

  // Verifica si el nombre de la tabla es "Tabla de Películas"
  const esTablaDePeliculas = nombreTablaCorto === 'peliculas';

  return (
    <div className="card m-3">
      <div className="card-body">
        <h5 className="card-title">Contenido</h5>

        <div className="table-responsive">
          <table className="table table-bordered">
            <thead className="thead-dark">
              <tr>
                {encabezados.map((encabezado, index) => (
                  <th key={`header-${index}`}>{encabezado}</th>
                ))}
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {datos.map((fila, rowIndex) => (
                <tr key={`row-${rowIndex}`}>
                  {encabezados.map((encabezado, colIndex) => (
                    <td key={`col-${colIndex}`}>{fila[encabezado]}</td>
                  ))}
                  <td>
                    <button 
                      onClick={() => {
                        navigate(`/${nombreTablaCorto}/editar/${fila.id}`);
                      }}
                      className="btn btn-primary btn-sm me-3"
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => {
                        Swal.fire({
                          title: '¿Estás seguro?',
                          text: 'Esta acción no se puede deshacer.',
                          icon: 'warning',
                          showCancelButton: true,
                          confirmButtonColor: '#d33',
                          cancelButtonColor: '#3085d6',
                          confirmButtonText: 'Sí, borrar',
                          cancelButtonText: 'Cancelar',
                        }).then((result) => {
                          if (result.isConfirmed) {
                            onBorrar(fila.id);
                          }
                        });
                      }}
                    >
                      Borrar
                    </button>
                    {esTablaDePeliculas && (
               
                    <button
                      onClick={() => {
                        // Agregar aquí la lógica para redirigir a la página de agregar detalle de película
                        navigate(`/pelicula/detallecrear`);
                      }}
                      className="btn btn-success btn-sm"
                    >
                      Agregar Detalle de Película
                    </button>
              
              )}
                  </td>
                </tr>
              ))}

              
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default TablasComponent;
