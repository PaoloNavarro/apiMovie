import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import Navbar from './components/Navbar';
import InicioComponent from './Pages/Inicio/InicioComponent';
import PeliculasComponent from './Pages/Peliculas/PeliculasComponent';
import GenerosComponent from './Pages/Generos/GenerosComponent';
import ActoresComponent from './Pages/Actores/ActoresComponent';
import CrearRegistroComponent from './components/CrearRegistroComponent ';
import EditarRegistroComponent from './components/EditarRegistroComponent ';
import CrearDetallePelicula from './components/CrearDetallePelicula';
import Footer from './components/Footer';
import './css/stylos.css';

function App() {

  return (

    <Router>
      <Navbar />
      <TransitionGroup className="route-container">
        <CSSTransition key={window.location.key} timeout={300} classNames="route" unmountOnExit>
          
            <Routes>
                <Route path="/" element={<InicioComponent />} />
                <Route path="/peliculas" element={<PeliculasComponent />} />
                <Route path="/generos" element={<GenerosComponent />} />
                <Route path="/actores" element={<ActoresComponent />} />
                <Route path="/actores/crear" element={<CrearRegistroComponent formData={{ tabla: 'actores', nombre: '' }} />} />
                <Route path="/peliculas/crear" element={<CrearRegistroComponent formData={{ tabla: 'peliculas', titulo: '', anio: '',descripcion: '' }} />} />
                <Route path="/generos/crear" element={<CrearRegistroComponent formData={{ tabla: 'generos', nombre: '' }} />} />
                <Route path="/:tabla/editar/:id" element={<EditarRegistroComponent />} />
                <Route path="/pelicula/detallecrear" element={<CrearDetallePelicula />} />
              
              

            </Routes>
        </CSSTransition>
  
      </TransitionGroup>

      <Footer />
    </Router>
  );
}

export default App;
