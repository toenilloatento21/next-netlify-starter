import React, { useState } from 'react';

const Home = () => {
  const [connected, setConnected] = useState(false);
  const [address, setAddress] = useState('');
  const [btcAmount, setBtcAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const connectWallet = async () => {
    setLoading(true);
    try {
      // Llama a la función para conectar la billetera UniSat
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
    if (!btcAmount) {
      console.error('Por favor ingresa una cantidad válida de BTC');
      return;
    }

    setLoading(true);
    try {
      // Llama a la función proporcionada por UniSat para realizar la compra
      const txid = await window.unisat.sendBitcoin("bc1pwf9pscqyy65dy94cc7zlvttza92kvqgg7jmzthqzkp8gauafwfgsntlmm7", parseInt(btcAmount));
      console.log('Compra exitosa de', btcAmount, 'BTC. TXID:', txid);
    } catch (error) {
      console.error('Error al realizar la compra de BTC:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAmountChange = (event) => {
    setBtcAmount(event.target.value);
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
