import React from 'react';
import { NavLink } from 'react-router-dom';
import '../css/stylos.css'; // Asegúrate de tener la ruta correcta a tu archivo CSS

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <a className="navbar-brand" href="/">
            <img src="https://cdn4.iconfinder.com/data/icons/iconsimple-logotypes/512/youtube-512.png" alt="LOGOAPIMOVIE" width="30" height="30" />
           ApiMovie
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink exact to="/" className="nav-link" activeClassName="active">
                Inicio
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/peliculas" className="nav-link" activeClassName="active">
                Películas
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/generos" className="nav-link" activeClassName="active">
                Géneros
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/actores" className="nav-link" activeClassName="active">
                Actores
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
