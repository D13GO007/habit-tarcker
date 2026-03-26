<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const email = ref('');
const password = ref('');

const handleLogin = async () => {
  try {
    const response = await axios.post('http://localhost:3000/api/users/login', {
      email: email.value,
      password: password.value,
    });

    if (response.data.success) {
      router.push('/home');
    }
  } catch (error) {
    const message = error?.response?.data?.message || 'No se pudo iniciar sesión';
    alert('Error al iniciar sesión: ' + message);
  }
};
</script>

<template>
  <main class="login-container">
    <form class="login-form" @submit.prevent="handleLogin">
      <h1>Iniciar sesión</h1>

      <label for="email">Email</label>
      <input id="email" v-model="email" type="email" autocomplete="email" required />

      <label for="password">Contraseña</label>
      <input
        id="password"
        v-model="password"
        type="password"
        autocomplete="current-password"
        required
      />

      <button type="submit">Entrar</button>
    </form>
  </main>
</template>

<style scoped>
.login-container {
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 1.5rem;
}

.login-form {
  width: min(100%, 360px);
  display: grid;
  gap: 0.75rem;
}

h1 {
  margin-bottom: 0.5rem;
}

input,
button {
  padding: 0.6rem 0.7rem;
}

button {
  cursor: pointer;
}
</style>
