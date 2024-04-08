import Head from 'next/head';
import Header from '@components/Header';
import Footer from '@components/Footer';
import { useState } from 'react';

export default function Home() {
  const [selectedWallet, setSelectedWallet] = useState(null);

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
      </main>

      <Footer />
    </div>
  );
}
