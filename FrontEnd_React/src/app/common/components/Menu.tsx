import React from 'react';

const Menu = ({ children }) => {
  return (
    <main style={{ paddingTop: '65px', paddingRight: '10px', paddingBottom: '10px' }}>
      <label htmlFor="">Hola</label>
      <div className="card" style={{ padding: '5px' }}>
        {children}
      </div>
    </main>
  );
};

export default Menu;
