import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

function TablasComponent({ datos, encabezados, onEditar, onBorrar, nombreTabla }) {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10; // Definido como 10 de forma estática

  useEffect(() => {
    // Cuando cambia el número de ítems por página, volvemos a la primera página
    setCurrentPage(0);
  }, []);

  // Función para cambiar de página
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  // Calcula el índice inicial y final de los datos a mostrar en la página actual
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const datosPaginados = datos.slice(startIndex, endIndex);

  // Verifica si hay datos antes de renderizar la tabla
  if (!Array.isArray(datosPaginados) || datosPaginados.length === 0) {
    return <p>No hay datos disponibles.</p>;
  }

  // Obtener el tercer valor después del espacio en blanco en nombreTabla
  const tablaParts = nombreTabla.split(' ');
  const nombreTablaCorto = tablaParts.length >= 3 ? tablaParts[2] : nombreTabla;

  // Verifica si el nombre de la tabla es "Tabla de Películas"
  const esTablaDePeliculas = nombreTablaCorto === 'peliculas';

  return (
    <div>
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
                {datosPaginados.map((fila, rowIndex) => (
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
                          handleBorrar(fila.id);
                        }}
                      >
                        Borrar
                      </button>
                      {esTablaDePeliculas && (
                        <button
                          onClick={() => {
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

      {/* Paginación */}
      <div className="row justify-content-center">
        <div className="col-md-12">
          <ReactPaginate
                     previousLabel={<button className="me-3 btn btn-primary">Anterior</button>} 
                     nextLabel={<button className="ms-3 btn btn-primary">Siguiente</button>}
            breakLabel={'...'}
            pageCount={Math.ceil(datos.length / itemsPerPage)}
            onPageChange={handlePageClick}
            containerClassName={'pagination justify-content-center'}
            pageClassName={'page-item me-1'} 
            pageLinkClassName={'page-link'}
      
            forcePage={currentPage}
          />
        </div>
      </div>
    </div>
  );
}

export default TablasComponent;
