<template>
  <div style="text-align: center; margin-top: 50px;">
    <h1>Mis Hábitos</h1>
    <p>¡Bienvenido al sistema de seguimiento!</p>
    <button @click="logout">Cerrar Sesión</button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();

const logout = () => {
  router.push('/login');
};
</script>
