<template>
  <div style="max-width: 300px; margin: auto;">
    <h2>Crear Cuenta</h2>
    <form @submit.prevent="handleRegister">
      <input v-model="name" type="text" placeholder="Nombre completo" required style="display: block; width: 100%; margin-bottom: 10px;"/>
      <input v-model="email" type="email" placeholder="Email" required style="display: block; width: 100%; margin-bottom: 10px;"/>
      <input v-model="password" type="password" placeholder="Contraseña" required style="display: block; width: 100%; margin-bottom: 10px;"/>
      <button type="submit" style="width: 100%;">Registrarse</button>
    </form>
    <p>¿Ya tienes cuenta? <RouterLink to="/login">Inicia sesión</RouterLink></p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const name = ref('');
const email = ref('');
const password = ref('');
const router = useRouter();

const handleRegister = async () => {
  try {
    await axios.post('http://localhost:3000/api/users', {
      name: name.value,
      email: email.value,
      password: password.value
    });
    alert('Usuario creado con éxito. Ahora inicia sesión.');
    router.push('/login');
  } catch (error) {
    alert('Error al registrar: ' + (error.response?.data?.message || 'Error de conexión'));
  }
};
</script>
