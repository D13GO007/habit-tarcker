<template>
  <div style="max-width: 300px; margin: auto;">
    <h2>Iniciar Sesión</h2>
    <form @submit.prevent="handleLogin">
      <input v-model="email" type="email" placeholder="Email" required style="display: block; width: 100%; margin-bottom: 10px;"/>
      <input v-model="password" type="password" placeholder="Contraseña" required style="display: block; width: 100%; margin-bottom: 10px;"/>
      <button type="submit" style="width: 100%;">Entrar</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const router = useRouter();

const handleLogin = async () => {
  try {
    const response = await axios.post('http://localhost:3000/api/users/login', {
      email: email.value,
      password: password.value
    });
    localStorage.setItem('user', JSON.stringify(response.data.user));
    alert('¡Bienvenido, ' + response.data.user.name + '!');
    router.push('/home'); // Redirige al inicio tras loguearse
  } catch (error) {
    alert('Error: ' + (error.response?.data?.message || 'No se pudo conectar al servidor'));
  }
};
</script>
