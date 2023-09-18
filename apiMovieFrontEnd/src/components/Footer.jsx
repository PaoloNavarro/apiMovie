import React from 'react';

const Footer = () => {
  return (
    <footer className="mt-5 bg-dark text-light text-center py-3">
      Hecho por Paolo Navarro &copy; {new Date().getFullYear()}
    </footer>
  );
};

export default Footer;