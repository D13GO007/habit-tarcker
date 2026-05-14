<template>
  <transition name="modal">
    <div v-if="open" class="oracle-overlay" @click.self="$emit('close')">
      <div class="oracle-container">

        <div class="oracle-header">
          <div class="oracle-icon">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="14" fill="none" stroke="#9b59b6" stroke-width="1.5"/>
              <path d="M10 12C10 9.5 12 7.5 16 7.5C20 7.5 22 9.5 22 12C22 14 20 15.5 18.5 16.5C17.5 17.2 17 18 17 19" stroke="#9b59b6" stroke-width="1.5" stroke-linecap="round"/>
              <circle cx="17" cy="22" r="1.5" fill="#9b59b6"/>
              <path d="M8 24L12 20M24 20L28 24M8 8L12 4M24 4L20 8" stroke="#9b59b6" stroke-width="1" stroke-linecap="round"/>
            </svg>
          </div>
          <h2>EL ORÁCULO</h2>
          <p class="oracle-subtitle">Responde y conocerás tu destino</p>
          <button class="oracle-close" @click="$emit('close')">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </button>
        </div>

        <div class="oracle-mission">
          <span class="mission-label">MISIÓN</span>
          <span class="mission-title">{{ questTitle }}</span>
        </div>

        <div class="oracle-questions">
          <div v-for="(q, qi) in questions" :key="qi" class="oracle-question" :class="{ answered: answers[qi] !== undefined }">
            <div class="question-header">
              <span class="q-number">{{ qi + 1 }}</span>
              <span class="q-text">{{ q.text }}</span>
            </div>
            <div class="question-options">
              <button v-for="(opt, oi) in q.options" :key="oi"
                class="option-btn"
                :class="{ selected: answers[qi] === oi }"
                @click="answers[qi] = oi">
                <span class="opt-marker">{{ ['Ⅰ','Ⅱ','Ⅲ','Ⅳ'][oi] }}</span>
                {{ opt }}
              </button>
            </div>
          </div>
        </div>

        <div class="oracle-progress">
          <div class="progress-info">
            <span>{{ Object.keys(answers).length }} / {{ questions.length }} respondidas</span>
          </div>
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: (Object.keys(answers).length / questions.length * 100) + '%' }"></div>
          </div>
        </div>

        <button class="oracle-evaluate"
          :disabled="Object.keys(answers).length < questions.length || evaluating"
          @click="evaluate">
          <svg v-if="!evaluating" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 1l2 5h5l-4 3 2 5-5-3-5 3 2-5-4-3h5Z" fill="currentColor"/>
          </svg>
          <span v-if="evaluating" class="spinner"></span>
          {{ evaluating ? 'Consultando los astros...' : 'Revelar Destino' }}
        </button>

      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  open: Boolean,
  questTitle: String
})
const emit = defineEmits(['close', 'evaluated'])

const questions = [
  { text: '¿Con qué frecuencia realizas esta actividad?', options: ['Nunca', 'Lo intenté antes', 'Ocasionalmente', 'Ya es rutina'] },
  { text: '¿Cuánto tiempo requiere cada vez?', options: ['<15 min', '15-45 min', '45 min-2h', '>2 horas'] },
  { text: '¿Qué nivel de esfuerzo implica?', options: ['Muy bajo', 'Moderado', 'Alto', 'Extremo'] },
  { text: '¿Requiere preparación especial?', options: ['No', 'Mínima', 'Planificación', 'Factores externos'] },
  { text: '¿Cuánta voluntad necesitas?', options: ['Poca', 'Moderada', 'Bastante', 'Mucha'] }
]

const answers = ref({})
const evaluating = ref(false)

watch(() => props.open, (val) => {
  if (val) { answers.value = {}; evaluating.value = false }
})

function evaluate() {
  evaluating.value = true
  setTimeout(() => {
    const score = Object.values(answers.value).reduce((s, v) => s + v, 0)
    const ratio = score / (questions.length * 3)
    const difficulty = ratio < 0.33 ? 'Fácil' : ratio < 0.66 ? 'Medio' : 'Difícil'
    evaluating.value = false
    emit('evaluated', difficulty)
  }, 1500)
}
</script>

<style scoped>
.oracle-overlay {
  position: fixed; inset: 0;
  background: rgba(0,0,0,0.85);
  backdrop-filter: blur(4px);
  display: flex; align-items: center; justify-content: center;
  z-index: 1000; padding: 20px;
}
.oracle-container {
  background: linear-gradient(145deg, #1a1a2e, #16213e);
  border: 1px solid rgba(155,89,182,0.3);
  border-radius: 16px;
  width: 100%; max-width: 520px; max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(155,89,182,0.1);
}
.oracle-header {
  position: relative; text-align: center;
  padding: 24px 20px 16px;
  border-bottom: 1px solid rgba(155,89,182,0.2);
}
.oracle-icon {
  width: 64px; height: 64px; margin: 0 auto 12px;
  background: rgba(155,89,182,0.1); border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  animation: pulse 2s ease-in-out infinite;
}
@keyframes pulse { 0%,100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.05); opacity: 0.8; } }
.oracle-header h2 { margin: 0; font-size: 22px; font-weight: 700; color: #9b59b6; letter-spacing: 3px; }
.oracle-subtitle { margin: 6px 0 0; font-size: 13px; color: #888; font-style: italic; }
.oracle-close { position: absolute; top: 16px; right: 16px; background: none; border: none; color: #666; cursor: pointer; padding: 4px; transition: color 0.2s; }
.oracle-close:hover { color: #fff; }
.oracle-mission { margin: 20px; padding: 16px; background: rgba(241,196,15,0.05); border: 1px solid rgba(241,196,15,0.2); border-radius: 10px; text-align: center; }
.mission-label { display: block; font-size: 10px; color: #f1c40f; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 6px; }
.mission-title { display: block; font-size: 16px; font-weight: 600; color: #fff; }
.oracle-questions { padding: 0 20px; display: flex; flex-direction: column; gap: 16px; }
.oracle-question { background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); border-radius: 10px; padding: 14px; transition: all 0.3s; }
.oracle-question.answered { border-color: rgba(155,89,182,0.3); }
.question-header { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; }
.q-number { width: 24px; height: 24px; background: linear-gradient(135deg, #8e44ad, #9b59b6); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700; color: #fff; flex-shrink: 0; }
.q-text { font-size: 13px; color: #ccc; line-height: 1.4; }
.question-options { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
.option-btn { display: flex; align-items: center; gap: 8px; padding: 10px 12px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; color: #aaa; font-size: 12px; cursor: pointer; transition: all 0.2s; text-align: left; }
.option-btn:hover { background: rgba(155,89,182,0.1); border-color: rgba(155,89,182,0.3); color: #fff; }
.option-btn.selected { background: rgba(155,89,182,0.2); border-color: #9b59b6; color: #fff; }
.opt-marker { font-size: 10px; color: #9b59b6; font-weight: 700; }
.option-btn.selected .opt-marker { color: #fff; }
.oracle-progress { padding: 20px 20px 0; }
.progress-info { font-size: 12px; color: #666; margin-bottom: 8px; }
.progress-bar { height: 4px; background: rgba(255,255,255,0.1); border-radius: 2px; overflow: hidden; }
.progress-fill { height: 100%; background: linear-gradient(90deg, #8e44ad, #9b59b6); border-radius: 2px; transition: width 0.3s ease; }
.oracle-evaluate {
  display: flex; align-items: center; justify-content: center; gap: 10px;
  width: calc(100% - 40px); margin: 20px;
  padding: 14px 20px;
  background: linear-gradient(135deg, #8e44ad, #9b59b6);
  border: none; border-radius: 10px; color: #fff;
  font-size: 14px; font-weight: 600; cursor: pointer; transition: all 0.2s;
}
.oracle-evaluate:hover:not(:disabled) { background: linear-gradient(135deg, #9b59b6, #a569bd); transform: translateY(-2px); }
.oracle-evaluate:disabled { opacity: 0.5; cursor: not-allowed; }
.spinner { width: 16px; height: 16px; border: 2px solid rgba(255,255,255,0.3); border-top-color: #fff; border-radius: 50%; animation: spin 0.8s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }

.modal-enter-active, .modal-leave-active { transition: opacity 0.2s; }
.modal-enter-from, .modal-leave-to { opacity: 0; }
</style>
