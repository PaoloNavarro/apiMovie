import React from 'react';

function TablasComponent({ datos, encabezados, onEditar, onBorrar, nombreTabla }) {
  // Verifica si hay datos antes de renderizar la tabla
  if (!Array.isArray(datos) || datos.length === 0) {
    return <p>No hay datos disponibles.</p>;
  }

  return (
    <div className="card m-3">
      <div className="card-body">
        {nombreTabla && <h5 className="card-title">{nombreTabla}</h5>} {/* Muestra el nombre de la tabla si se proporciona */}
       
        <div className="table-responsive">
          <table className="table table-bordered"> {/* Agrega un margen alrededor de la tabla */}
            <thead className="thead-dark">
              <tr>
                {encabezados.map((encabezado, index) => (
                  <th key={index}>{encabezado}</th>
                ))}
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {datos.map((fila, index) => (
                <tr key={index}>
                  {encabezados.map((encabezado, index) => (
                    <td key={index}>{fila[encabezado]}</td>
                  ))}
                  <td>
                    <button
                      onClick={() => onEditar(fila)}
                      className="btn btn-primary btn-sm"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => onBorrar(fila)}
                      className="btn btn-danger btn-sm"
                    >
                      Borrar
                    </button>
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
