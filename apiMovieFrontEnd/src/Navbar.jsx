import React from "react";

export default function Navbar({ onOptionChange }) {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
        {/* ... */}
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <a
              className="nav-link active"
              aria-current="page"
              href="#"
              onClick={() => onOptionChange('Inicio')}
            >
              Inicio
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              aria-current="page"
              href="#"
              onClick={() => onOptionChange('Peliculas')}
            >
              Peliculas
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              aria-current="page"
              href="#"
              onClick={() => onOptionChange('Generos')}
            >
              Generos
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              aria-current="page"
              href="#"
              onClick={() => onOptionChange('Actores')}
            >
              Actores
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
