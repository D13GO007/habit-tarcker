<template>
  <div class="glass-card quest-forge">
    <div class="section-title">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M2 12 L10 4 M8 2 L12 6 M10 4 L12 2 M4 10 L2 12 L4 12 L4 10Z" stroke="#f1c40f" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
        <circle cx="11" cy="3" r="1.5" fill="#f1c40f"/>
      </svg>
      FORJAR MISIÓN
    </div>

    <form @submit.prevent="handleSubmit" class="forge-form">
      <div class="input-wrapper">
        <svg class="input-icon" width="20" height="20" viewBox="0 0 14 14" fill="none">
          <circle cx="7" cy="7" r="5.5" fill="none" stroke="#555" stroke-width="1"/>
          <path d="M7 4v3l2 1" stroke="#555" stroke-width="1" stroke-linecap="round"/>
        </svg>
        <input v-model="habitStore.formData.title" placeholder="¿Cuál es tu próximo reto?" required />
      </div>

      <div class="forge-row">
        <div class="type-selector">
          <button
            v-for="t in questTypes" :key="t.value"
            type="button"
            class="type-btn"
            :class="{ active: habitStore.formData.type === t.value }"
            @click="habitStore.formData.type = t.value"
          >
            <svg :viewBox="t.viewBox" width="16" height="16" fill="none" v-html="t.icon"></svg>
            <span class="type-label">{{ t.label }}</span>
            <span class="type-hint">{{ t.hint }}</span>
          </button>
        </div>

        <div class="oracle-section">
          <button type="button" @click="oracleOpen = true" class="btn-oracle" :disabled="!habitStore.formData.title.trim()">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" stroke-width="1.2"/>
              <path d="M6 8C6 5.5 7.5 3.5 10 3.5C12.5 3.5 14 5.5 14 8C14 10 12.5 11.5 11.5 12.5C10.8 13.2 10.2 14 10.2 15" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
              <circle cx="10.5" cy="16" r="1.2" fill="currentColor"/>
              <path d="M5 5L7 3M15 3L13 5M5 15L7 17M15 17L13 15" stroke="currentColor" stroke-width="1" stroke-linecap="round"/>
            </svg>
            <div class="oracle-btn-text">
              <span class="oracle-title">El Oráculo</span>
              <span class="oracle-desc">Evalúa la dificultad de tu misión</span>
            </div>
          </button>
          <div v-if="habitStore.oracleResult" class="oracle-badge" :class="'badge-' + habitStore.formData.difficulty.toLowerCase()">
            {{ habitStore.formData.difficulty }}
          </div>
        </div>
      </div>

      <div class="category-row">
        <button
          v-for="cat in CATEGORIES" :key="cat"
          type="button"
          class="cat-btn"
          :class="{ active: habitStore.formData.category === cat }"
          @click="habitStore.formData.category = cat"
        >{{ cat }}</button>
      </div>

      <div class="dynamic-inputs">
        <div v-if="habitStore.formData.type === 'Diaria'" class="input-group">
          <label>Tiempo diario (min):</label>
          <input type="number" v-model="habitStore.formData.target_time" min="1" class="input-dark" />
        </div>
        <div v-if="habitStore.formData.type === 'Semanal'" class="input-group split">
          <div>
            <label>Minutos por sesión:</label>
            <input type="number" v-model="habitStore.formData.target_time" min="1" class="input-dark" />
          </div>
          <div>
            <label>Días a la semana:</label>
            <input type="number" v-model="habitStore.formData.target_days" min="1" max="7" class="input-dark" />
          </div>
        </div>
        <div v-if="habitStore.formData.type === 'Unica'" class="input-group split">
          <div>
            <label>Horas estimadas:</label>
            <input type="number" v-model="habitStore.formData.target_time" min="1" class="input-dark" />
          </div>
          <div>
            <label>Fecha límite:</label>
            <input type="date" v-model="habitStore.formData.deadline" class="input-dark" />
          </div>
        </div>
      </div>

      <div class="forge-actions">
        <button type="submit" class="btn-forge"
          :disabled="!habitStore.formData.title.trim() || !habitStore.oracleResult"
          :title="!habitStore.oracleResult ? 'Consulta al Oráculo primero' : (habitStore.isEditing ? 'Guardar cambios' : 'Forjar misión')">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 2v10M2 7h10" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
          </svg>
        </button>
        <button v-if="habitStore.isEditing" type="button" @click="confirmCancel" class="btn-cancel" title="Cancelar">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        </button>
      </div>
    </form>

    <OracleModal
      :open="oracleOpen"
      :quest-title="habitStore.formData.title"
      @close="oracleOpen = false"
      @evaluated="onOracleResult"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useHabitStore } from '../stores/habit.store'
import { useUserStore } from '../stores/user.store'
import OracleModal from './OracleModal.vue'
import { CATEGORIES } from '../data/characterData'

const habitStore = useHabitStore()
const userStore = useUserStore()
const oracleOpen = ref(false)

const questTypes = [
  {
    value: 'Diaria',
    label: 'Diaria',
    hint: 'Cada día',
    viewBox: '0 0 16 16',
    icon: `<circle cx="8" cy="8" r="6.5" stroke="currentColor" stroke-width="1.2"/>
           <path d="M8 4.5v3.5l2.5 1.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>`
  },
  {
    value: 'Semanal',
    label: 'Semanal',
    hint: 'Varios días',
    viewBox: '0 0 16 16',
    icon: `<rect x="2" y="3" width="12" height="11" rx="1.5" stroke="currentColor" stroke-width="1.2"/>
           <path d="M5 2v2M11 2v2M2 7h12" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>`
  },
  {
    value: 'Unica',
    label: 'Única',
    hint: 'Una vez',
    viewBox: '0 0 16 16',
    icon: `<polygon points="8,2 10,6 14,6.5 11,9.5 11.5,14 8,12 4.5,14 5,9.5 2,6.5 6,6" stroke="currentColor" stroke-width="1.2"/>`
  }
]

function onOracleResult(difficulty) {
  habitStore.formData.difficulty = difficulty
  habitStore.oracleResult = true
  oracleOpen.value = false
}

function confirmCancel() {
  if (confirm('¿Descartar los cambios de esta misión?')) habitStore.cancelEdit()
}

async function handleSubmit() {
  await habitStore.submitForm(userStore.user.id)
}
</script>

<style scoped>
.quest-forge { flex-shrink: 0; }

.input-wrapper { position: relative; margin-bottom: 8px; }
.input-icon { position: absolute; left: 10px; top: 50%; transform: translateY(-50%); pointer-events: none; }
.forge-form input[type="text"],
.forge-form input:not([type]) {
  width: 100%;
  background: rgba(0,0,0,0.4);
  border: 1px solid rgba(255,255,255,0.07);
  color: #e0e0e0;
  padding: clamp(10px, 1vw, 16px) clamp(10px, 1vw, 16px) clamp(10px, 1vw, 16px) 40px;
  border-radius: 10px;
  font-size: clamp(13px, 1.1vw, 18px);
  box-sizing: border-box;
  transition: border-color 0.2s;
  font-family: inherit;
}
.forge-form input:not([type]):focus { outline: none; border-color: rgba(241,196,15,0.35); }
.forge-form input:not([type])::placeholder { color: #444; }

.forge-row { display: flex; gap: 6px; align-items: center; flex-wrap: wrap; }

.category-row { display: flex; gap: 5px; margin-bottom: 8px; flex-wrap: wrap; }
.cat-btn {
  flex: 1; min-width: 0;
  padding: 6px 8px; border-radius: 8px;
  background: rgba(0,0,0,0.25); border: 1px solid rgba(255,255,255,0.07);
  color: #555; font-size: 11px; font-weight: 700; letter-spacing: 0.5px;
  cursor: pointer; transition: all 0.15s; font-family: inherit;
}
.cat-btn:hover { border-color: rgba(155,89,182,0.3); color: #999; }
.cat-btn.active { background: rgba(155,89,182,0.12); border-color: rgba(155,89,182,0.5); color: #9b59b6; }

.type-selector {
  display: flex;
  gap: 6px;
  flex: 1;
}
.type-btn {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  padding: clamp(6px, 0.6vw, 10px) 6px;
  background: rgba(0,0,0,0.3);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 10px;
  color: #555;
  cursor: pointer;
  transition: all 0.18s;
  font-family: inherit;
}
.type-btn:hover {
  border-color: rgba(241,196,15,0.25);
  color: #999;
  background: rgba(255,255,255,0.03);
}
.type-btn.active {
  border-color: rgba(241,196,15,0.5);
  background: rgba(241,196,15,0.08);
  color: #f1c40f;
}
.type-label {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
}
.type-hint {
  font-size: 10px;
  opacity: 0.6;
  letter-spacing: 0.3px;
}

.oracle-section { display: flex; align-items: center; gap: 10px; width: 100%; }
.btn-oracle {
  display: flex; align-items: center; gap: 10px;
  padding: 10px 14px;
  background: linear-gradient(135deg, #8e44ad, #9b59b6);
  border: none; border-radius: 10px; color: #fff;
  cursor: pointer; transition: all 0.2s; flex: 1;
}
.btn-oracle:hover:not(:disabled) { background: linear-gradient(135deg, #9b59b6, #a569bd); transform: translateY(-1px); }
.btn-oracle:disabled { opacity: 0.4; cursor: not-allowed; }
.oracle-btn-text { display: flex; flex-direction: column; align-items: flex-start; gap: 2px; }
.oracle-title { font-size: 13px; font-weight: 700; letter-spacing: 0.5px; }
.oracle-desc { font-size: 10px; opacity: 0.8; }

.oracle-badge { padding: 8px 16px; border-radius: 8px; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; flex-shrink: 0; }
.oracle-badge.badge-fácil { background: rgba(39,174,96,0.15); color: #27ae60; border: 1px solid rgba(39,174,96,0.3); }
.oracle-badge.badge-medio { background: rgba(243,156,18,0.15); color: #f39c12; border: 1px solid rgba(243,156,18,0.3); }
.oracle-badge.badge-difícil { background: rgba(231,76,60,0.15); color: #e74c3c; border: 1px solid rgba(231,76,60,0.3); }

.dynamic-inputs { margin-top: 10px; background: rgba(0,0,0,0.2); padding: 10px; border-radius: 6px; border: 1px dashed rgba(241,196,15,0.3); }
.input-group label { display: block; font-size: 11px; color: #aaa; margin-bottom: 5px; text-transform: uppercase; }
.input-dark {
  background: rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.1);
  color: #fff; padding: 10px; border-radius: 6px;
  box-sizing: border-box; width: 100%; font-family: inherit;
}
.split { display: flex; gap: 10px; }
.split > div { flex: 1; }

.forge-actions { display: flex; gap: 8px; margin-top: 10px; }
.btn-forge {
  width: 52px; height: 52px;
  background: #f1c40f; border: none; border-radius: 10px;
  color: #000; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0; transition: all 0.2s;
}
.btn-forge:hover:not(:disabled) { background: #f4d03f; transform: scale(1.05); }
.btn-forge:disabled { opacity: 0.4; cursor: not-allowed; }

.btn-cancel {
  width: 52px; height: 52px;
  background: rgba(231,76,60,0.1); border: 1px solid rgba(231,76,60,0.3);
  border-radius: 10px; color: #e74c3c; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: all 0.2s;
}
.btn-cancel:hover { background: rgba(231,76,60,0.2); border-color: #e74c3c; }
</style>
