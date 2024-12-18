<template>
  <div class="navbar">
    <ul class="navbar-links">
      <li><RouterLink to="/home" class="nav-link logo">X</RouterLink></li>
      <li><RouterLink to="/trade" class="nav-link">Compra/Venta</RouterLink></li>
      <li><RouterLink to="/movimientos" class="nav-link">Movimientos</RouterLink></li>
      <li><RouterLink to="/estado-actual" class="nav-link">Estado Actual</RouterLink></li>
      <li><RouterLink to="/analisis-inversion" class="nav-link">Análisis Inversión</RouterLink></li>
    </ul>
    <div class="navbar-auth">
      <button @click="logout" class="logout-btn">Cerrar Sesión</button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      localStorage.removeItem('username');
      this.$router.replace('/');
    }
  }
}
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #1e1e2f;
  padding: 15px 25px;
  color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.navbar-links {
  display: flex;
  list-style-type: none;
  margin: 0;
  padding: 0;
  gap: 15px;
  align-items: center; 
}

.navbar-links li {
  margin: 0;
}

.nav-link {
  color: white;
  text-decoration: none;
  font-weight: 500;
  padding: 8px 12px;
  border-radius: 4px;
  transition: background-color 0.3s ease, transform 0.2s ease;
  display: flex; 
  align-items: center; 
}

.nav-link:hover {
  background-color: #444;
  transform: scale(1.1); 
}

.navbar-auth {
  margin-left: 20px;
}

.logout-btn {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 20px;
  font-weight: 600;
  transition: background-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); 
}

.logout-btn:hover {
  background-color: #c0392b;
  transform: scale(1.05); 
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3); 
}

@media (max-width: 768px) {
  .navbar {
    flex-direction: column;
    align-items: flex-start;
  }

  .navbar-links {
    justify-content: flex-start;
    gap: 10px;
  }

  .navbar-auth {
    margin-left: 0;
    margin-top: 10px;
  }
}

.logo {
  font-size: 30px;
  font-weight: bold;
  color: #007bff;
  text-decoration: none;
  display: flex;
  align-items: center; 
  justify-content: center;
  width: 50PX; 
  height: 50px;
  border-radius: 50%;
  background-color: #f8f9fa;
  box-shadow: 0 4px 6px rgba(255, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s ease;
}

.logo:hover {
  transform: scale(1.5);
}

</style>