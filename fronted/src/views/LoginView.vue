<template>
  <div class="auth-container">
    <AppToast />
    <div class="auth-card">
      <div class="auth-header">
        <h2>{{ isRegister ? 'Crear Cuenta' : 'Iniciar Sesión' }}</h2>
        <p class="auth-subtitle">{{ isRegister ? 'Únete a la aventura' : 'Bienvenido de vuelta, héroe' }}</p>
      </div>

      <form @submit.prevent="isRegister ? handleRegister() : handleLogin()">
        <div v-if="isRegister" class="input-group">
          <input v-model="name" type="text" placeholder="Nombre de héroe" autocomplete="name" readonly @focus="e => e.target.removeAttribute('readonly')" required />
        </div>
        <div class="input-group">
          <input v-model="email" type="email" placeholder="Email" autocomplete="email" readonly @focus="e => e.target.removeAttribute('readonly')" required />
        </div>
        <div class="input-group">
          <input v-model="password" type="password" placeholder="Contraseña" autocomplete="current-password" readonly @focus="e => e.target.removeAttribute('readonly')" required />
        </div>
        <div v-if="isRegister" class="gender-select">
          <label class="gender-option" :class="{ active: gender === 'male' }">
            <input type="radio" v-model="gender" value="male" />
            <span>⚔ Hombre</span>
          </label>
          <label class="gender-option" :class="{ active: gender === 'female' }">
            <input type="radio" v-model="gender" value="female" />
            <span>✦ Mujer</span>
          </label>
        </div>
        <label v-if="isRegister" class="hard-mode-toggle">
          <input type="checkbox" v-model="hardMode" />
          <span class="toggle-label">Modo difícil — daño doble, pierdes nivel al morir</span>
        </label>
        <button type="submit" class="btn-auth" :disabled="isLoading">
          {{ isLoading ? '...' : (isRegister ? 'Registrarse' : 'Entrar') }}
        </button>
      </form>

      <div class="auth-toggle">
        <span v-if="!isRegister">¿No tienes cuenta?</span>
        <span v-else>¿Ya tienes cuenta?</span>
        <button type="button" @click="toggleMode" class="btn-link">
          {{ isRegister ? 'Iniciar sesión' : 'Regístrate' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import AppToast from '../components/AppToast.vue';
import { loginUser, registerUser } from '../api/users';
import { useUserStore } from '../stores/user.store';
import { useToastStore } from '../stores/toast.store';

const email = ref('');
const password = ref('');
const name = ref('');
const hardMode = ref(false);
const gender = ref('male');
const isRegister = ref(false);
const isLoading = ref(false);
const router = useRouter();
const userStore = useUserStore();
const toast = useToastStore();

const toggleMode = () => {
  isRegister.value = !isRegister.value;
  email.value = '';
  password.value = '';
  name.value = '';
  hardMode.value = false;
  gender.value = 'male';
};

const handleLogin = async () => {
  isLoading.value = true;
  try {
    const res = await loginUser({ email: email.value, password: password.value });
    userStore.setToken(res.data.token);
    userStore.applyStats(res.data.user);
    router.push('/home');
  } catch (error) {
    toast.show(error.response?.data?.message || 'No se pudo conectar al servidor', 'error');
  } finally {
    isLoading.value = false;
  }
};

const handleRegister = async () => {
  isLoading.value = true;
  try {
    await registerUser({ name: name.value, email: email.value, password: password.value, hard_mode: hardMode.value, gender: gender.value });
    const loginRes = await loginUser({ email: email.value, password: password.value });
    userStore.setToken(loginRes.data.token);
    userStore.applyStats(loginRes.data.user);
    router.push('/home');
  } catch (error) {
    toast.show(error.response?.data?.message || 'No se pudo registrar', 'error');
  } finally {
    isLoading.value = false;
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

.gender-select {
  display: flex;
  gap: 10px;
  margin-bottom: 12px;
}

.gender-option {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 11px 12px;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  cursor: pointer;
  font-size: 13px;
  color: #aaa;
  transition: border-color 0.2s, color 0.2s;
}

.gender-option input[type="radio"] {
  display: none;
}

.gender-option.active {
  border-color: rgba(241, 196, 15, 0.6);
  color: #f1c40f;
  background: rgba(241, 196, 15, 0.06);
}

.hard-mode-toggle {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 12px;
  background: rgba(231,76,60,0.06);
  border: 1px solid rgba(231,76,60,0.2);
  border-radius: 10px;
  cursor: pointer;
  margin-bottom: 4px;
}
.hard-mode-toggle input[type="checkbox"] {
  width: 16px; height: 16px; flex-shrink: 0; margin-top: 1px; accent-color: #e74c3c; cursor: pointer;
}
.toggle-label {
  font-size: 12px;
  color: #c0392b;
  line-height: 1.4;
  cursor: pointer;
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
