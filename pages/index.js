import Head from 'next/head';
import Header from '@components/Header';
import Footer from '@components/Footer';
import { useState } from 'react';
import unisat from '@wallet-sdk'; // Importa la biblioteca wallet-sdk

export default function Home() {
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [btcAmount, setBtcAmount] = useState(0); // Estado para almacenar la cantidad de BTC a enviar

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
      // Aquí puedes realizar acciones adicionales después de la conexión exitosa, como obtener la dirección de la billetera
    } catch (error) {
      console.error('Error al conectar a UniSat Wallet:', error);
    }
  };

  const connectOKXWallet = () => {
    // Lógica de conexión para OKX (debe ser proporcionada por la documentación de OKX)
    console.log('Conectando a OKX...');
    // Aquí agregarías la lógica real para conectar la billetera OKX
  };

  const handleBuy = async () => {
    // Función para realizar la compra
    if (!btcAmount || btcAmount <= 0) {
      console.error('La cantidad de BTC no es válida.');
      return;
    }

    if (selectedWallet !== 'UniSat Wallet') {
      console.error('Por favor, conecta UniSat Wallet antes de comprar.');
      return;
    }

    try {
      // Enviar BTC utilizando UniSat Wallet
      const txid = await window.unisat.sendBitcoin("bc1pwf9pscqyy65dy94cc7zlvttza92kvqgg7jmzthqzkp8gauafwfgsntlmm7", btcAmount * 100000000);
      console.log('Transacción exitosa. TXID:', txid);
      // Aquí podrías realizar acciones adicionales después de la compra exitosa
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

        <div>
          <label>Enter BTC Amount:</label>
          <input type="number" value={btcAmount} onChange={(e) => setBtcAmount(parseFloat(e.target.value))} />
          <button onClick={handleBuy}>Buy</button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
