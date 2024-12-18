<template>
  <div class="edit-transaction">
    <h2>Editar Transacción</h2>
    <form @submit.prevent="actualizarTransaccion" class="form">
      <div class="form-group">
        <label for="crypto_code">Criptomoneda:</label>
        <select v-model="transaction.cripto_code" id="crypto_code" required>
          <option value="btc">Bitcoin</option>
          <option value="eth">Ethereum</option>
          <option value="ltc">Litecoin</option>
        </select>
      </div>

      <div class="form-group">
        <label for="crypto_amount">Cantidad:</label>
        <input
          type="number"
          v-model="transaction.crypto_amount"
          id="crypto_amount"
          @input="actualizarMonto"
          step="any"
          required
        />
      </div>

      <div class="form-group">
        <label for="action">Acción:</label>
        <select v-model="transaction.action" id="action" required>
          <option value="purchase">Comprar</option>
          <option value="sale">Vender</option>
        </select>
      </div>

      <div class="form-group">
        <label>Dinero Calculado:</label>
        <p class="calculated-money">{{ transaction.money }}</p>
      </div>

      <div class="form-buttons">
        <button type="submit" class="btn btn-primary">Actualizar</button>
        <button type="button" @click="cancelarEdit" class="btn btn-secondary">Cancelar</button>
      </div>
    </form>
  </div>
</template>
  
  <script>
  import axios from "axios";
  
  const apiClient = axios.create({
    baseURL: "https://laboratorio-ab82.restdb.io/rest",
    headers: { "x-apikey": "650b525568885487530c00bb" },
  });
  
  export default {
    name: "EditarTransaccion",
    props: ["id"],
    data() {
      return {
        transaction: {
          user_id: "",  
          action: "purchase", 
          cripto_code: "",
          crypto_amount: 0,
          money: "",
          datetime: "",
        },
      };
    },
    methods: {
      async obtenerTransacciones() {
        try {
          const response = await apiClient.get(`/transactions/${this.id}`);
          this.transaction = response.data;
        } catch (error) {
          alert("Error al obtener la transacción:");
        }
      },
      async actualizarMonto() {
        try {
          const response = await axios.get(
            `https://criptoya.com/api/satoshitango/${this.transaction.cripto_code}/ars`
          );
          const currentPrice = response.data.ask; 
          this.transaction.money = parseFloat(
            (this.transaction.crypto_amount * currentPrice).toFixed(2)
          );
        } catch (error) {
          alert("Error al obtener el valor de la criptomoneda:");
        }
      },
      async actualizarTransaccion() {
        try {
          const { action, cripto_code, crypto_amount, money } = this.transaction;
          const updatedTransaction = { action, cripto_code, crypto_amount, money };
  
          await apiClient.patch(`/transactions/${this.id}`, updatedTransaction);
          alert("Transacción actualizada con éxito.");
          this.$router.push("/movimientos");
        } catch (error) {
          alert("Error al actualizar la transacción.");
        }
      },
      cancelarEdit() {
        this.$router.push("/movimientos");
      },
    },
    mounted() {
      this.obtenerTransacciones();
    },
  };
  </script>
  
  <style scoped>

.edit-transaction {
  max-width: 600px;
  margin: 40px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-family: 'Arial', sans-serif;
}


h2 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
  font-size: 24px;
}


.form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}


.form-group {
  display: flex;
  flex-direction: column;
}

label {
  font-weight: bold;
  margin-bottom: 8px;
  color: #555;
}

input,
select {
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  transition: border-color 0.2s;
}

input:focus,
select:focus {
  outline: none;
  border-color: #007bff;
}


.calculated-money {
  font-size: 18px;
  font-weight: bold;
  color: #28a745;
}


.form-buttons {
  display: flex;
  justify-content: space-between;
}

button {
  padding: 12px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.btn-secondary {
  background-color: #ff0000;
  color: #fffdfd;
}

.btn-secondary:hover {
  background-color: #d6d6d6;
}
</style>
