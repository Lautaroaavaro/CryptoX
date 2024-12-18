<template>
  <div class="investment-analysis">
    <h2>Análisis de Inversiones</h2>
    <div v-if="loading" class="loading">Cargando información...</div>
    <div v-else>
      <table class="crypto-table">
        <thead>
          <tr>
            <th>Criptomoneda</th>
            <th>Resultado</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(result, cripto_code) in resultadosInversion" :key="cripto_code">
            <td>{{ cripto_code.toUpperCase() }}</td>
            <td :class="{'positive-result': result >= 0, 'negative-result': result < 0}">
              {{ result.toLocaleString() }} ARS
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>


<script>
import axios from "axios";

export default {
  name: "AnalisisInversion",
  data() {
    return {
      transactions: [],
      resultadosInversion: {},
      loading: true,
    };
  },
  methods: {
    async obtenerTransacciones() {
      const userId = localStorage.getItem("username"); 
      try {
        const apiClient = axios.create({
          baseURL: 'https://laboratorio-ab82.restdb.io/rest',
          headers: { "x-apikey": '650b525568885487530c00bb' },
        });

        const response = await apiClient.get(`/transactions?q={"user_id": "${userId}"}`);
        this.transactions = response.data;
        this.calculateresultadosInversion();
      } catch (error) {
        alert("Error al obtener el historial de transacciones.");
      }
    },
    async calculateresultadosInversion() {
  const saldos = {};
  const precios = {};

  this.transactions.forEach((transaction) => {
    const { cripto_code, crypto_amount, money, action } = transaction;

    if (!cripto_code || !crypto_amount || !money) {
      console.warn("Transacción inválida:", transaction);
      return;
    }

    const amount = parseFloat(crypto_amount);
    const price = parseFloat(money);

    if (!saldos[cripto_code]) {
      saldos[cripto_code] = { purchaseAmount: 0, purchaseTotal: 0, saleAmount: 0, saleTotal: 0 };
    }

    if (action === "purchase") {
      saldos[cripto_code].purchaseAmount += amount;
      saldos[cripto_code].purchaseTotal += price;
    } else if (action === "sale") {
      saldos[cripto_code].saleAmount += amount;
      saldos[cripto_code].saleTotal += price;
    }
  });

  const cryptoCodes = Object.keys(saldos);
  const pricePromises = cryptoCodes.map(async (cripto_code) => {
    try {
      const response = await axios.get(`https://criptoya.com/api/satoshitango/${cripto_code}/ars`);
      precios[cripto_code] = parseFloat(response.data.bid || 0);
    } catch (error) {
      alert(`Error al obtener precio para ${cripto_code}.`);
      precios[cripto_code] = 0;
    }
  });

  await Promise.all(pricePromises);

  const results = {};
  cryptoCodes.forEach((cryptoCode) => {
    const { purchaseAmount, purchaseTotal, saleAmount, saleTotal } = saldos[cryptoCode];
    const currentPrice = precios[cryptoCode] || 0;

    let result = 0;

    if (saleAmount > 0) {
      const purchasePricePerUnit = purchaseAmount > 0 ? purchaseTotal / purchaseAmount : 0;
      const salePrice = saleTotal;
      result = salePrice - purchasePricePerUnit * saleAmount;
    } else if (purchaseAmount > 0) {
      result = (currentPrice * purchaseAmount) - purchaseTotal;
    }

    results[cryptoCode] = result;
  });

  this.resultadosInversion = results;
  this.loading = false;
},

},
  mounted() {
    this.obtenerTransacciones();
  },
};
</script>

<style scoped>

.investment-analysis {
  margin: 20px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #f9f9f9;
}

.crypto-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.crypto-table th,
.crypto-table td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: left;
}

.crypto-table th {
  background-color: #007bff;
  color: white;
}

.crypto-table tr:nth-child(even) {
  background-color: #f2f2f2;
}

.crypto-table .positive-result {
  color: green;
}

.crypto-table .negative-result {
  color: red;
}

.loading {
  text-align: center;
  font-size: 1.2em;
  color: #555;
}
</style>
