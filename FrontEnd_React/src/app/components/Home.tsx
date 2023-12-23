import React from 'react';
import Menu from '../common/components/Menu';

const Home = () => {
  return (
    <Menu>
      <div>
        <h1>Hola Mundo</h1>
        <p>Bienvenido a la página protegida. Esta página solo es accesible con un token válido.</p>
      </div>
    </Menu>
  );
};

export default Home;
