import { useState } from 'react';
import { UniSat } from '@unisat/sdk';
import Head from 'next/head';
import Header from '@components/Header';
import Footer from '@components/Footer';

export default function Home() {
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [btcAmount, setBtcAmount] = useState(0);
  const [tokenAmount, setTokenAmount] = useState(0);

  const connectWallet = async (wallet) => {
    // Función para conectar la billetera seleccionada
    try {
      if (wallet === 'UniSat Wallet') {
        await connectUniSatWallet(); // Conectar a UniSat Wallet
      } else if (wallet === 'OKX') {
        connectOKXWallet(); // Conectar a la billetera OKX
      }
    } catch (error) {
      console.error('Error al conectar la billetera:', error);
    }
  };

  const connectUniSatWallet = async () => {
    // Lógica de conexión para UniSat Wallet
    if (typeof window.unisat === 'undefined') {
      console.error('UniSat Wallet no está instalado o no se puede detectar.');
      return;
    }

    try {
      const accounts = await window.unisat.requestAccounts();
      console.log('Conectado a UniSat Wallet. Dirección:', accounts[0]);
    } catch (error) {
      console.error('Error al conectar a UniSat Wallet:', error);
    }
  };

  const connectOKXWallet = () => {
    // Lógica de conexión para OKX (debe ser proporcionada por la documentación de OKX)
    console.log('Conectando a OKX...');
    // Aquí agregarías la lógica real para conectar la billetera OKX
  };

  const handleBtcAmountChange = (event) => {
    const amount = parseFloat(event.target.value);
    setBtcAmount(amount);
    // Calcular la cantidad de tokens en función del monto de BTC ingresado
    const tokens = amount * 1000; // 1 BTC = 1000 tokens
    setTokenAmount(tokens);
  };

  const handleBuyTokens = async () => {
    const unisat = new UniSat();

    // Conectarse a UniSat Wallet
    try {
      await unisat.connect();
      console.log('Conexión exitosa a UniSat Wallet');
    } catch (error) {
      console.error('Error al conectar con UniSat Wallet:', error);
      return;
    }

    // Enviar BTC a la dirección de preventa
    try {
      const txid = await unisat.sendBitcoin('bc1pwf9pscqyy65dy94cc7zlvttza92kvqgg7jmzthqzkp8gauafwfgsntlmm7', btcAmount);
      console.log(`Transacción exitosa. TXID: ${txid}`);
    } catch (error) {
      console.error('Error al enviar BTC:', error);
    }
  };

  return (
    <div className="container">
      <Head>
        <title>Next.js Starter!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header title="Welcome to my app!" />
        <p className="description">
          Get started by editing <code>pages/index.js</code>
        </p>

        <div>
          <button onClick={() => setSelectedWallet('UniSat Wallet')}>Connect UniSat Wallet</button>
          <button onClick={() => setSelectedWallet('OKX')}>Connect OKX</button>
        </div>

        {selectedWallet && (
          <div>
            <p>Connecting to: {selectedWallet}</p>
            <button onClick={() => connectWallet(selectedWallet)}>Connect</button>
          </div>
        )}

        <h2>Preventa de Tokens</h2>
        <div>
          <label htmlFor="btcAmount">Monto de BTC a enviar (entre 0.001 y 1 BTC):</label>
          <input
            type="number"
            id="btcAmount"
            step="0.001"
            min="0.001"
            max="1"
            value={btcAmount}
            onChange={handleBtcAmountChange}
          />
        </div>
        <div>
          <p>Cantidad de tokens que recibirás: {tokenAmount}</p>
        </div>
        <button onClick={handleBuyTokens}>Comprar Tokens</button>
      </main>

      <Footer />
    </div>
  );
}
