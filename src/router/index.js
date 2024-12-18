import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import TradeView from '@/views/TradeView.vue'
import MovimientosView from '@/views/MovimientosView.vue'
import EstadoActualView from '@/views/EstadoActualView.vue'
import EditarTransaccion from '@/components/EditarTransaccion.vue'
import AnalisisInversionView from '@/views/AnalisisInversionView.vue'


const routes = [
  {
    path: '/',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/home',
    name: 'Home',
    component: HomeView,
    beforeEnter: (to, from, next) => {
      if (!localStorage.getItem('username')) {
        next('/');  
      } else {
        next();  
      }
    }
  },
  {
    path: '/trade',
    name: 'Trade',
    component: TradeView,
    beforeEnter: (to, from, next) => {
      if (!localStorage.getItem('username')) {
        next('/');  
      } else {
        next();  
      }
    }
  },
  {
    path: '/movimientos',
    name: 'Movimientos',
    component: MovimientosView,
    beforeEnter: (to, from, next) => {
      if (!localStorage.getItem('username')) {
        next('/');  
      } else {
        next();  
      }
    }
  },
  {
    path: '/estado-actual',
    name: 'EstadoActual',
    component: EstadoActualView,
    beforeEnter: (to, from, next) => {
      if (!localStorage.getItem('username')) {
        next('/');  
      } else {
        next();  
      }
    }
  },
  {
    path: '/analisis-inversion',
    name: 'AnalisisInversion',
    component: AnalisisInversionView,
    beforeEnter: (to, from, next) => {
      if (!localStorage.getItem('username')) {
        next('/');  
      } else {
        next();  
      }
    }
  },
  {
    path:'/editar/:id',
    name:'EditarTransaccion',
    component: EditarTransaccion,
    props: true,
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('username');
  // Si el usuario está autenticado y está intentando acceder al login, redirigir al home
  if (to.name === 'Login' && isAuthenticated) {
    next('/home');  // Redirige al home si ya está autenticado
  } else {
    next();  // Permite la navegación
  }
});

export default router
