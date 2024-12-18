<template>
  <div class="home">
    <div class="welcome-message">
      <h2>Bienvenido a CryptoX, {{ usuario }}</h2>
      <p>¡Aquí podrás gestionar tus compras, ventas y consultar el historial de tus transacciones!</p>
    </div>
    
    <div class="crypto-info">
      <div class="crypto-item">
        <img src="https://cryptologos.cc/logos/bitcoin-btc-logo.png" alt="Bitcoin" class="crypto-logo" />
        <div class="crypto-details">
          <h3>Bitcoin (BTC)</h3>
          <p>La criptomoneda original, famosa por su descentralización y escasez.</p>
        </div>
      </div>

      <div class="crypto-item">
        <img src="https://cryptologos.cc/logos/ethereum-eth-logo.png" alt="Ethereum" class="crypto-logo" />
        <div class="crypto-details">
          <h3>Ethereum (ETH)</h3>
          <p>Plataforma para contratos inteligentes y aplicaciones descentralizadas.</p>
        </div>
      </div>

      <div class="crypto-item">
        <img src="https://cryptologos.cc/logos/litecoin-ltc-logo.png" alt="Litecoin" class="crypto-logo" />
        <div class="crypto-details">
          <h3>Litecoin (LTC)</h3>
          <p>Criptomoneda de pago rápido, similar a Bitcoin, pero con tiempos de transacción más rápidos.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      usuario: localStorage.getItem('username')
    };
  },
};
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f4f9;
}

.welcome-message {
  text-align: center;
  font-family: 'Roboto', sans-serif;
}

.crypto-info {
  display: flex;
  justify-content: center;
  gap: 40px;
  margin-top: 40px;
  flex-wrap: wrap;
}

.crypto-item {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  padding: 20px;
  width: 200px;
  transition: transform 0.3s ease, box-shadow 0.3s ease; 
  animation: fadeIn 1s ease-out; 
  
}

.crypto-item:hover {
  transform: scale(1.1); 
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); 
}

.crypto-logo {
  width: 60px;
  height: 60px;
  margin-bottom: 10px;
  transition: transform 0.3s ease; 
}

.crypto-item:hover .crypto-logo {
  transform: rotate(360deg) scale(1.2); 
}

.crypto-details h3 {
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

.crypto-details p {
  font-size: 14px;
  color: #666;
}


@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
