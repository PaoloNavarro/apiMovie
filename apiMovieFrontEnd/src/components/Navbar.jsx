import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <NavLink exact to="/" className="nav-link">
              Inicio
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/peliculas" className="nav-link">
              Películas
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/generos" className="nav-link">
              Géneros
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/actores" className="nav-link">
              Actores
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

