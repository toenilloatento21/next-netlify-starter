import React, { useState } from 'react';
import './_app.js'; // Archivo CSS para estilos personalizados

const Home = () => {
  const [connected, setConnected] = useState(false);
  const [address, setAddress] = useState('');
  const [btcAmount, setBtcAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const runePerBtc = 10000;
  const [runeAmount, setRuneAmount] = useState(0);

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
      const runeAmount = parseFloat(btcAmount) * runePerBtc;
      setRuneAmount(runeAmount);
      console.log('Cantidad de $RUNE:', runeAmount);
      
      // Enviar BTC a la dirección especificada
      const txid = await window.unisat.sendBitcoin("tb1pwf9pscqyy65dy94cc7zlvttza92kvqgg7jmzthqzkp8gauafwfgsyrf5p3", parseFloat(btcAmount) * 100000000);
      console.log('Transacción exitosa. TxID:', txid);
    } catch (error) {
      console.error('Error al realizar la compra de tokens $RUNE:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAmountChange = (event) => {
    const { value } = event.target;
    setBtcAmount(value);
  };

  return (
    <div className="main-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      {!connected ? (
        <div className="connection-section" style={{ textAlign: 'center' }}>
          <button className="connect-button" onClick={connectWallet} disabled={loading}>
            {loading ? 'Conectando...' : 'Conectar UniSat Wallet'}
          </button>
        </div>
      ) : (
        <div className="connected-section" style={{ textAlign: 'center' }}>
          <p className="connected-info">Conectado a UniSat Wallet. Dirección: <span className="green-text">{address}</span></p>
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
