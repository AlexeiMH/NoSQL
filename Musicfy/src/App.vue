<script setup lang="ts">
// No necesitas importar nada aquí para el RouterView, pero puedes añadir
// componentes de navegación que quieras que aparezcan en todas las páginas.
</script>

<template>
  <header>
    <nav>
      <!-- <RouterLink to="/">Inicio</RouterLink>
      <RouterLink to="/login">Iniciar Sesión</RouterLink> -->
    </nav>
  </header>

  <main>
    <RouterView /> 
  </main>
</template>

<style scoped>
/* Estilos globales para App.vue */
</style>