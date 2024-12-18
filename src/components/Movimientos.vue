<template>
  <div class="transaction-history">
    <h2>Historial de Movimientos</h2>
    <div v-if="loading" class="loading">Cargando información...</div>
    <table v-if="transactions.length > 0">
      <thead>
        <tr>
          <th>Fecha y hora</th>
          <th>Criptomoneda</th>
          <th>Cantidad</th>
          <th>Dinero</th>
          <th>Acción</th>
          <th>ID Usuario</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="transaction in transactions" :key="transaction._id">
          <td>{{ formatearFecha(transaction.datetime) }}</td>
          <td>{{ transaction.cripto_code }}</td>
          <td>{{ transaction.crypto_amount }}</td>
          <td>{{ transaction.money.toLocaleString() }} ARS</td>
          <td>{{ transaction.action }}</td>
          <td>{{ transaction.user_id }}</td>
          <div>
            <button @click="editarTransaccion(transaction)">Editar</button>
            <button @click="eliminarTransaccion(transaction._id)">Eliminar</button>
          </div>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Movimientos",
  data() {
    return {
      transactions: [],
      loading: true,
    };
  },
  methods: {
    async obtenerTransacciones() {
      const userId = localStorage.getItem("username");
      try {
        const apiClient = axios.create({
          baseURL: "https://laboratorio-ab82.restdb.io/rest",
          headers: { "x-apikey": "650b525568885487530c00bb" },
        });

        const response = await apiClient.get(
          `/transactions?q={"user_id": "${userId}"}`
        );
        this.transactions = response.data;
      } catch (error) {
        alert("Error al obtener el historial de movimientos.");
      } finally {
        this.loading = false;
      }
    },
    formatearFecha(datetime) {
      const date = new Date(datetime);
      return date.toLocaleString();
    },
    editarTransaccion(transaction) {
      this.$router.push({
        name: "EditarTransaccion",
        params: { id: transaction._id },
      });
    },
    async eliminarTransaccion(transactionId) {
      const confirmDelete = confirm(
        "¿Estás seguro de eliminar esta transacción?"
      );
      if (!confirmDelete) return;

      try {
        const apiClient = axios.create({
          baseURL: "https://laboratorio-ab82.restdb.io/rest",
          headers: { "x-apikey": "650b525568885487530c00bb" },
        });

        await apiClient.delete(`/transactions/${transactionId}`);
        this.transactions = this.transactions.filter(
          (transaction) => transaction._id !== transactionId
        );
        alert("Transacción eliminada con éxito.");
      } catch (error) {
        alert("Error al eliminar la transacción:");
      }
    },
  },
  mounted() {
    this.obtenerTransacciones();
  },
};
</script>

<style scoped>
.transaction-history {
  margin: 20px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #f9f9f9;
}

table {
  width: 100%;
  border-collapse: collapse;
}

thead {
  background-color: #007bff;
  color: white;
}

th,
td {
  padding: 10px;
  text-align: left;
  border: 1px solid #ddd;
}

th {
  font-weight: bold;
}

button {
  margin: 0 5px;
  padding: 5px 10px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  background-color: #f1f50b;
  color: rgb(255, 255, 255);
}

button:hover {
  background-color: #d5d835;
}

button:last-of-type {
  background-color: #dc3545;
}

button:last-of-type:hover {
  background-color: #a71d2a;
}

p {
  text-align: center;
  color: #888;
}

.loading {
  text-align: center;
  font-size: 1.2em;
  color: #555;
}
</style>
