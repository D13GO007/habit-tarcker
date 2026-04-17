<template>
  <div class="auth-container">
    <div class="auth-card">
      <div class="auth-header">
        <h2>{{ isRegister ? 'Crear Cuenta' : 'Iniciar Sesión' }}</h2>
        <p class="auth-subtitle">{{ isRegister ? 'Únete a la aventura' : 'Bienvenido de vuelta, héroe' }}</p>
      </div>

      <form @submit.prevent="isRegister ? handleRegister() : handleLogin()">
        <div v-if="isRegister" class="input-group">
          <input v-model="name" type="text" placeholder="Nombre de héroe" required />
        </div>
        <div class="input-group">
          <input v-model="email" type="email" placeholder="Email" required />
        </div>
        <div class="input-group">
          <input v-model="password" type="password" placeholder="Contraseña" required />
        </div>
        <button type="submit" class="btn-auth">
          {{ isRegister ? 'Registrarse' : 'Entrar' }}
        </button>
      </form>

      <div class="auth-toggle">
        <span v-if="!isRegister">¿No tienes cuenta?</span>
        <span v-else>¿Ya tienes cuenta?</span>
        <button type="button" @click="isRegister = !isRegister" class="btn-link">
          {{ isRegister ? 'Iniciar sesión' : 'Regístrate' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const name = ref('');
const isRegister = ref(false);
const router = useRouter();

const handleLogin = async () => {
  try {
    const response = await axios.post('http://localhost:3000/api/users/login', {
      email: email.value,
      password: password.value
    });
    localStorage.setItem('user', JSON.stringify(response.data.user));
    alert('¡Bienvenido, ' + response.data.user.name + '!');
    router.push('/home');
  } catch (error) {
    alert('Error: ' + (error.response?.data?.message || 'No se pudo conectar al servidor'));
  }
};

const handleRegister = async () => {
  try {
    const response = await axios.post('http://localhost:3000/api/users/register', {
      name: name.value,
      email: email.value,
      password: password.value
    });
    localStorage.setItem('user', JSON.stringify(response.data.user));
    alert('¡Cuenta creada! ¡Bienvenido, ' + response.data.user.name + '!');
    router.push('/home');
  } catch (error) {
    alert('Error: ' + (error.response?.data?.message || 'No se pudo registrar'));
  }
};
</script>

<style scoped>
.auth-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 100%);
  padding: 20px;
}

.auth-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 32px;
  width: 100%;
  max-width: 360px;
  backdrop-filter: blur(10px);
}

.auth-header {
  text-align: center;
  margin-bottom: 28px;
}

.auth-header h2 {
  margin: 0;
  font-size: 24px;
  font-weight: 700;
  color: #f1c40f;
  letter-spacing: 1px;
}

.auth-subtitle {
  margin: 8px 0 0;
  font-size: 13px;
  color: #888;
}

.input-group {
  margin-bottom: 16px;
}

.input-group input {
  width: 100%;
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #e0e0e0;
  padding: 14px 16px;
  border-radius: 10px;
  font-size: 14px;
  box-sizing: border-box;
  transition: border-color 0.2s;
}

.input-group input:focus {
  outline: none;
  border-color: rgba(241, 196, 15, 0.4);
}

.input-group input::placeholder {
  color: #666;
}

.btn-auth {
  width: 100%;
  background: linear-gradient(135deg, #f1c40f, #f39c12);
  border: none;
  color: #000;
  padding: 14px;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
  margin-top: 8px;
}

.btn-auth:hover {
  background: linear-gradient(135deg, #f4d03f, #f1c40f);
  transform: translateY(-2px);
}

.auth-toggle {
  text-align: center;
  margin-top: 24px;
  font-size: 13px;
  color: #888;
}

.btn-link {
  background: none;
  border: none;
  color: #9b59b6;
  font-size: 13px;
  cursor: pointer;
  padding: 0 4px;
  text-decoration: underline;
}

.btn-link:hover {
  color: #a569bd;
}
</style>
