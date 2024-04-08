import React, { useState } from 'react';

const Home = () => {
  const [connected, setConnected] = useState(false);
  const [address, setAddress] = useState('');
  const [btcAmount, setBtcAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const connectWallet = async () => {
    setLoading(true);
    try {
      const accounts = await window.unisat.requestAccounts();
      setConnected(true);
      setAddress(accounts[0]);
    } catch (error) {
      console.error('Error al conectar la billetera UniSat:', error);
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
      const txid = await window.unisat.sendBitcoin(address, parseFloat(btcAmount));
      console.log('Compra exitosa de', btcAmount, 'BTC. TXID:', txid);
    } catch (error) {
      console.error('Error al realizar la compra de BTC:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAmountChange = (event) => {
    const { value } = event.target;
    setBtcAmount(value);
  };

  return (
    <div>
      {!connected ? (
        <button onClick={connectWallet} disabled={loading}>
          {loading ? 'Conectando...' : 'Conectar UniSat Wallet'}
        </button>
      ) : (
        <div>
          <p>Conectado a UniSat Wallet. Dirección: {address}</p>
          <label>Ingrese la cantidad de BTC:</label>
          <input type="number" value={btcAmount} onChange={handleAmountChange} />
          <button onClick={handleBuy} disabled={loading}>Comprar</button>
        </div>
      )}
    </div>
  );
};

export default Home;

