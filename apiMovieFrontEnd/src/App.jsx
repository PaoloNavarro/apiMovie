import { useState } from 'react'
import Navbar from './Navbar';
import InicioComponent from './componentes/InicioComponent';
import PeliculasComponent from './componentes/PeliculasComponent';
import GenerosComponent from './componentes/GenerosComponent';
 import ActoresComponent from './componentes/ActoresComponent';

function App() {
  const [selectedOption, setSelectedOption] = useState('Inicio'); // Estado para realizar un seguimiento de la opción seleccionada

  // Función para cambiar la opción seleccionada
  const handleOptionChange = (option) => {
  setSelectedOption(option);
  };

  return (
    <>
     <Navbar onOptionChange={handleOptionChange} /> {/* Pasar la función como prop al Navbar */}
      {/* Renderizar contenido según la opción seleccionada */}
      {selectedOption === 'Inicio' && <InicioComponent />}
      {selectedOption === 'Peliculas' && <PeliculasComponent />}
      {selectedOption === 'Generos' && <GenerosComponent />}
      {selectedOption === 'Actores' && <ActoresComponent />}
    </>
  )
}

export default App
