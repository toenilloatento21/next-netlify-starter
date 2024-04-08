import React, { useState } from 'react';

const Home = () => {
  const [connected, setConnected] = useState(false);
  const [address, setAddress] = useState('');

  const connectWallet = () => {
    // Simulamos la conexión a la billetera UniSat
    // En una implementación real, aquí se llamaría a una función para conectar la billetera
    setConnected(true);
    setAddress('Dirección de ejemplo'); // En una implementación real, aquí se obtendría la dirección de la billetera
  };

  const handleBuy = () => {
    // Lógica para comprar
    console.log('Comprando...');
  };

  return (
    <div>
      {!connected ? (
        <button onClick={connectWallet}>Conectar UniSat Wallet</button>
      ) : (
        <div>
          <p>Conectado a UniSat Wallet. Dirección: {address}</p>
          <label>Ingrese la cantidad de BTC:</label>
          <input type="number" />
          <button onClick={handleBuy}>Comprar</button>
        </div>
      )}
    </div>
  );
};

export default Home;
