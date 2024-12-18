<template>
  <div class="login-container">
    <div class="login-box">
      <h2>INICIO DE SESIÓN</h2>
      <form @submit.prevent="login">
        <div class="mb-3">
          <input 
            type="text" 
            id="username" 
            class="form-control" 
            v-model="username" 
            placeholder="Ingresa tu ID alfanumérico" 
          />
        </div>
        <button type="submit" class="btn btn-primary w-100">Entrar</button>
        <p v-if="errorMessage" class="text-danger text-center mt-3">{{ errorMessage }}</p>
      </form>
    </div>
  </div>
</template>
  
<script>

  export default {
    data() {
      return {
        username: '',
        errorMessage: ''
      };
    },
    methods: {
      login() {
        if (this.username.trim() === '') {
          this.errorMessage = 'El ID no puede estar vacío.';
          return;
        }
        
        if (this.username.length < 3 || this.username.length > 15) {
        this.errorMessage = 'El ID debe tener entre 3 y 15 caracteres.';
        return;
        }
        
        const regex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z0-9]+$/;
        if (!regex.test(this.username)) {
        this.errorMessage = "El ID debe contener al menos una letra y un número.";
        return;
      }

        localStorage.setItem('username', this.username);
  
        this.$router.replace('/home');
      }
    }
  };

</script>
  
  <style scoped>
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #555;
    background-size: cover;
  }
  
  .login-box {
    background: rgba(255, 255, 255, 0.8);
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
    text-align: center;
  }
  
  h2 {
    margin-bottom: 20px;
    font-size: 2em;
    font-weight: bold;
    color: #333;
  }
  
  .form-label {
    font-weight: bold;
    color: #555;
  }
  
  button {
    font-size: 1.2em;
    font-weight: bold;
    padding: 10px;
    background-color: #072e18;
    border-color: #000000;
  }
  
  button:hover {
    background-color: #333;
  }
  
  input:focus {
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }
  </style>