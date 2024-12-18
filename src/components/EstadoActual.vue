<template>
  <div class="financial-analysis">
    <h2>Análisis de tu Estado Actual</h2>
    <div v-if="loading" class="loading">Cargando información...</div>
    <div v-else>
      <table class="crypto-table">
        <thead>
          <tr>
            <th>Criptomoneda</th>
            <th>Cantidad</th>
            <th>Dinero</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="transaction in agregarCryptos" :key="transaction.cripto_code">
            <td>{{ transaction.cripto_code }}</td>
            <td>{{ transaction.total_amount }}</td>
            <td>{{ transaction.total_value.toLocaleString() }} ARS </td> 
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="2"><strong>Total</strong></td>
            <td class="total-value"><strong>{{valorTotal.toLocaleString()}}</strong></td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "EstadoActual",
  data() {
    return {
      transactions: [],
      agregarCryptos: [],
      valorTotal: 0,
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
        this.calcularInversiones(); 

      } catch (error) {
        alert("Error al obtener el historial de movimientos:");
      }
    },  
    async calcularInversiones() {
      const saldos = {};

      this.transactions.forEach((transaction) => {
        const { cripto_code, crypto_amount, action } = transaction;
        const amount = parseFloat(crypto_amount);

        if (!saldos[cripto_code]) {
          saldos[cripto_code] = 0;
        }
        saldos[cripto_code] += action === "purchase" ? amount : -amount;
      });

      const cryptoPromises = Object.entries(saldos)
        .filter(([_, totalAmount]) => totalAmount > 0)
        .map(async ([cripto_code, total_amount]) => {
          const response = await axios.get(`https://criptoya.com/api/satoshitango/${cripto_code}/ars`);
          const currentPrice = response.data.bid;
        return {
          cripto_code,
          total_amount: total_amount,
          total_value: parseFloat((total_amount * currentPrice).toFixed(2)),
        };
    });

      const results = await Promise.all(cryptoPromises);
      this.agregarCryptos = results;

      this.valorTotal = results.reduce((sum, transaction) => sum + transaction.total_value, 0);
      this.loading = false;
    },
  },
  mounted() {
    this.obtenerTransacciones();
  },
};
</script>

<style scoped>
.financial-analysis {
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

.crypto-table tfoot {
  font-weight: bold;
}

.loading {
  text-align: center;
  font-size: 1.2em;
  color: #555;
}
</style>

  