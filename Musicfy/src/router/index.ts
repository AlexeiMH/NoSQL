import { createRouter, createWebHistory } from 'vue-router'

import InicioSesion from '@/Frontend/InicioSesion.vue';
import IncioGeneral from '@/Frontend/InicioGeneral.vue';
import RegistroUsuario from '@/Frontend/RegistroUsuario.vue';
import EditarPerfil from '@/Frontend/EditarPerfil.vue';

import Pruebas from '@/Frontend/Pruebas.vue';
import borrador from '@/Frontend/borrador.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    {
      path: '/',
      name: 'Login',
      component: () => import('../Frontend/InicioSesion.vue')
    },

    {
      path: '/registro',
      name: 'RegistroUsuario',
      component: () => import('../Frontend/RegistroUsuario.vue')
    },

    {
      path: '/inicio',
      name: 'InicioGeneral',
      component: () => import('../Frontend/InicioGeneral.vue')
    },

    {
      path: '/editarperfil',
      name: 'EditarPerfil',
      component: () => import('../Frontend/EditarPerfil.vue')
    },

    // ignorar esto, es solo para pruebas
    {
      path: '/pruebas',
      name: 'Pruebas',
      component: () => import('../Frontend/Pruebas.vue')
    },

    {
      path: '/borrador',
      name: 'Borrador',
      component: () => import('../Frontend/borrador.vue')
    }

  ],
})

export default router
