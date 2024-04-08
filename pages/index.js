import React, { useState, useEffect } from 'react';
import { getProviders, getProviderById } from 'sats-connect';
import './_app.js'; // Archivo CSS para estilos personalizados

const Home = () => {
  const [connected, setConnected] = useState(false);
  const [address, setAddress] = useState('');
  const [btcAmount, setBtcAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const runePerBtc = 10000;
  const [runeAmount, setRuneAmount] = useState(0);
  const [walletProviders, setWalletProviders] = useState([]);

  // Function to fetch available wallet providers
  const fetchWalletProviders = () => {
    const providers = getProviders();
    setWalletProviders(providers);
  };

  // Function to connect to a selected wallet provider
  const connectWallet = async (providerId) => {
    setLoading(true);
    try {
      const providerObject = getProviderById(providerId);
      // Perform necessary actions to connect to the selected wallet provider
      // Example: const accounts = await providerObject.request('getAccounts', null);
      // Set connected status and address accordingly
      setConnected(true);
      setAddress(accounts[0]); // Assuming accounts[0] contains the user's address
    } catch (error) {
      console.error('Error al conectar la billetera:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBuy = async () => {
    if (!btcAmount || isNaN(parseFloat(btcAmount))) {
      console.error('Por favor ingresa una cantidad válida de BTC');
      return;
    }

    setLoading(true);
    try {
      const runeAmount = parseFloat(btcAmount) * runePerBtc;
      setRuneAmount(runeAmount);
      console.log('Cantidad de $RUNE:', runeAmount);
      
      // Perform transfer operation using the connected wallet provider
      // Example: const txid = await providerObject.request('sendBitcoin', {address: "<destination_address>", amount: parseFloat(btcAmount)});
      // Replace "<destination_address>" with the actual destination address
      console.log('Transacción exitosa.');
    } catch (error) {
      console.error('Error al realizar la transferencia:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAmountChange = (event) => {
    const { value } = event.target;
    setBtcAmount(value);
  };

  useEffect(() => {
    fetchWalletProviders();
  }, []);

  return (
    <div className="main-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      {!connected ? (
        <div className="connection-section" style={{ textAlign: 'center' }}>
          <button className="connect-button" onClick={connectWallet} disabled={loading}>
            {loading ? 'Conectando...' : 'Conectar Wallet'}
          </button>
          <div>
            Available Wallet Providers:
            {walletProviders.map(provider => (
              <div key={provider.id}>
                <span>{provider.name}</span>
                <button onClick={() => connectWallet(provider.id)}>Connect</button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="connected-section" style={{ textAlign: 'center' }}>
          <p className="connected-info">Conectado a la billetera. Dirección: <span className="green-text">{address}</span></p>
          <div className="token-info">
            <div className="rune-per-btc">
              <h2>$RUNE por BTC</h2>
              <p>{runePerBtc} $RUNE</p>
            </div>
            <div className="buy-section">
              <label className="btc-label">Ingrese la cantidad de BTC:</label>
              <input className="btc-input" type="number" value={btcAmount} onChange={handleAmountChange} />
              <button className="buy-button" onClick={handleBuy} disabled={loading}>Comprar</button>
            </div>
          </div>
          <div className="purchase-info">
            <h2>Cantidad de $RUNE a comprar:</h2>
            <p>{runeAmount} $RUNE</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
