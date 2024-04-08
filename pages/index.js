import Head from 'next/head';
import Header from '@components/Header';
import Footer from '@components/Footer';
import { useState } from 'react';
import bitcoin from 'bitcoinjs-lib'; // Importar bitcoinjs-lib para la billetera BTC Unisat Xverse

export default function Home() {
  const [selectedWallet, setSelectedWallet] = useState(null);

  const connectWallet = (wallet) => {
    // Función para conectar la billetera seleccionada
    if (wallet === 'BTC Unisat Xverse') {
      connectBTCWallet(); // Conectar a la billetera BTC Unisat Xverse
    } else if (wallet === 'OKX') {
      connectOKXWallet(); // Conectar a la billetera OKX
    }
  };

  const connectBTCWallet = () => {
    // Lógica de conexión para BTC Unisat Xverse usando bitcoinjs-lib
    const network = bitcoin.networks.bitcoin; // O la red correcta para BTC Unisat Xverse
    const wallet = bitcoin.ECPair.makeRandom({ network });
    const { address } = bitcoin.payments.p2pkh({ pubkey: wallet.publicKey, network });

    console.log('Conectado a la billetera BTC Unisat Xverse. Dirección:', address);
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
          <button onClick={() => setSelectedWallet('BTC Unisat Xverse')}>Connect BTC Unisat Xverse</button>
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
