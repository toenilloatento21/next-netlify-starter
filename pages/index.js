import React, { useState, useEffect } from 'react';
import { getProviders, getProviderById } from 'sats-connect';
import './globals.css'; 

const Home = () => {
  const [connected, setConnected] = useState(false);
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [walletProviders, setWalletProviders] = useState([]);
  const [selectedProviderId, setSelectedProviderId] = useState('');

  // Carga inicial para obtener proveedores de wallet
  useEffect(() => {
    const fetchWalletProviders = async () => {
      const providers = await getProviders();
      setWalletProviders(providers);
    };

    fetchWalletProviders();
  }, []);

  // Conectar a la wallet seleccionada
  const connectWallet = async () => {
    if (!selectedProviderId) {
      console.error('No se ha seleccionado ningún proveedor de billetera.');
      return;
    }
    setLoading(true);
    try {
      const providerObject = await getProviderById(selectedProviderId);
      const accounts = await providerObject.request({ method: 'eth_requestAccounts' });
      setConnected(true);
      setAddress(accounts[0]);
    } catch (error) {
      console.error('Error al conectar la billetera:', error);
    } finally {
      setLoading(false);
    }
  };

  // Mostrar modal de conexión a la billetera (simulado para este ejemplo)
  const openConnectWalletModal = () => {
    console.log('Abriendo modal de conexión a la billetera...');
    // Aquí puedes añadir la lógica para abrir un modal real si es necesario
    connectWallet();
  };

  return (
    <div className="main-container">
      {!connected ? (
        <div className="connection-section">
          <button className="connect-button" onClick={openConnectWalletModal} disabled={loading}>
            {loading ? 'Conectando...' : 'Conectar Wallet'}
          </button>
          {walletProviders.map((provider) => (
            <div key={provider.id}>
              <span>{provider.name}</span>
              <button onClick={() => setSelectedProviderId(provider.id)}>Seleccionar</button>
            </div>
          ))}
        </div>
      ) : (
        <div className="connected-section">
          <p className="connected-info">Conectado a la billetera. Dirección: <span>{address}</span></p>
          {/* Agregar lógica de compra o interacción posterior aquí */}
        </div>
      )}
    </div>
  );
};

export default Home;
