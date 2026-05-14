<template>
  <div class="quest-card"
    :class="{
      done: habit.completed,
      'diff-easy': habit.difficulty === 'Fácil',
      'diff-med':  habit.difficulty === 'Medio',
      'diff-hard': habit.difficulty === 'Difícil',
      'deadline-warn':   deadlineUrgency === 'warn',
      'deadline-danger': deadlineUrgency === 'danger'
    }">
    <div class="diff-bar"></div>

    <div class="quest-body">
      <div class="quest-meta">
        <span class="type-badge">
          <svg v-if="habit.type === 'Diaria'" width="9" height="9" viewBox="0 0 9 9" fill="none">
            <circle cx="4.5" cy="4.5" r="3.5" fill="none" stroke="currentColor" stroke-width="1"/>
            <path d="M4.5 2.5v2l1.2 1" stroke="currentColor" stroke-width="0.8" stroke-linecap="round"/>
          </svg>
          <svg v-else-if="habit.type === 'Semanal'" width="9" height="9" viewBox="0 0 9 9" fill="none">
            <rect x="1" y="2" width="7" height="6" rx="1" fill="none" stroke="currentColor" stroke-width="1"/>
            <path d="M3 1v2M6 1v2M1 4.5h7" stroke="currentColor" stroke-width="0.8" stroke-linecap="round"/>
          </svg>
          <svg v-else width="9" height="9" viewBox="0 0 9 9" fill="none">
            <polygon points="4.5,1 5.8,3.5 8.5,3.9 6.5,5.8 7,8.5 4.5,7.2 2,8.5 2.5,5.8 0.5,3.9 3.2,3.5" fill="none" stroke="currentColor" stroke-width="0.8"/>
          </svg>
          {{ habit.type }}
        </span>

        <span v-if="habit.type === 'Diaria' && habit.streak > 0" class="streak-badge">
          <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
            <path d="M4.5 1C4.5 1 7 3 7 5.5A2.5 2.5 0 0 1 2 5.5C2 4 3 3 3 3C3 3 3.5 4.5 4.5 5C4.5 5 4 3.5 4.5 1Z" fill="#e67e22"/>
          </svg>
          {{ habit.streak }}
        </span>

        <span v-if="habit.type === 'Semanal'" class="progress-badge">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <rect x="1" y="2" width="10" height="9" rx="1" fill="none" stroke="currentColor" stroke-width="1"/>
            <path d="M3 1v2M6 1v2M9 1v2M1 5h10" stroke="currentColor" stroke-width="1" stroke-linecap="round"/>
          </svg>
          {{ habit.current_days }}/{{ habit.target_days }}
        </span>
      </div>

      <h4 class="quest-title">{{ habit.title }}</h4>

      <div class="quest-info">
        <span v-if="habit.type === 'Diaria'">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="5" fill="none" stroke="currentColor" stroke-width="1"/><path d="M6 3v3l2 1.5" stroke="currentColor" stroke-width="1" stroke-linecap="round"/></svg>
          {{ habit.target_time }} min/día
        </span>
        <span v-else-if="habit.type === 'Semanal'">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="5" fill="none" stroke="currentColor" stroke-width="1"/><path d="M6 3v3l2 1.5" stroke="currentColor" stroke-width="1" stroke-linecap="round"/></svg>
          {{ habit.target_time }} min
        </span>
        <span v-else-if="habit.type === 'Unica'">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="5" fill="none" stroke="currentColor" stroke-width="1"/><path d="M6 3v3l2 1.5" stroke="currentColor" stroke-width="1" stroke-linecap="round"/></svg>
          {{ habit.target_time }}h
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><rect x="1" y="2" width="10" height="9" rx="1" fill="none" stroke="currentColor" stroke-width="1"/><path d="M3 1v2M6 1v2M9 1v2M1 5h10" stroke="currentColor" stroke-width="1" stroke-linecap="round"/></svg>
          {{ habit.deadline ? new Date(habit.deadline).toLocaleDateString() : 'Sin fecha' }}
        </span>
      </div>

      <div class="quest-diff-label">{{ habit.difficulty }}</div>
    </div>

    <div class="quest-controls" v-if="!habit.completed">
      <button @click="$emit('complete', habit.id)" class="btn-action btn-complete" title="Completar">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M2.5 7L5.5 10L11.5 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      <button @click="$emit('edit', habit)" class="btn-action btn-edit" title="Editar">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M10 2l2 2-7 7H3v-2l7-7z" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      <button @click="$emit('fail', habit.id)" class="btn-action btn-fail" title="Fallar">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M7 3v5M7 9.5v1" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <circle cx="7" cy="7" r="5.5" fill="none" stroke="currentColor" stroke-width="1.2"/>
        </svg>
      </button>
      <button @click="$emit('delete', habit.id)" class="btn-action btn-delete" title="Abandonar">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M3 4h8M5 4V3h4v1M5.5 6.5v4M8.5 6.5v4" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
          <path d="M4 4l.5 7h5l.5-7" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>

    <div v-else class="done-stamp">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M3 8l4 4 6-7" stroke="#27ae60" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      CUMPLIDA
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({ habit: { type: Object, required: true } })
defineEmits(['complete', 'fail', 'edit', 'delete'])

const deadlineUrgency = computed(() => {
  if (props.habit.type !== 'Unica' || !props.habit.deadline || props.habit.completed) return null
  const ms = new Date(props.habit.deadline) - Date.now()
  if (ms < 0) return 'danger'
  if (ms < 24 * 3600 * 1000) return 'danger'
  if (ms < 48 * 3600 * 1000) return 'warn'
  return null
})
</script>

<style scoped>
.quest-card {
  display: flex; align-items: center; gap: 14px;
  background: rgba(0,0,0,0.2);
  border: 1px solid rgba(255,255,255,0.04);
  border-radius: 12px;
  padding: 14px 14px 14px 0;
  transition: all 0.2s; position: relative; overflow: hidden;
}
.quest-card:hover { border-color: rgba(255,255,255,0.08); background: rgba(255,255,255,0.02); }
.quest-card.done { opacity: 0.35; }
.quest-card.deadline-warn   { border-color: rgba(243,156,18,0.4); background: rgba(243,156,18,0.04); }
.quest-card.deadline-danger { border-color: rgba(231,76,60,0.5);  background: rgba(231,76,60,0.05); animation: deadline-pulse 1.5s ease-in-out infinite; }
@keyframes deadline-pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(231,76,60,0); }
  50%       { box-shadow: 0 0 8px 2px rgba(231,76,60,0.25); }
}

.diff-bar { width: 3px; align-self: stretch; border-radius: 0 2px 2px 0; flex-shrink: 0; }
.diff-easy .diff-bar { background: #27ae60; }
.diff-med  .diff-bar { background: #f39c12; }
.diff-hard .diff-bar { background: #e74c3c; }

.quest-body { flex: 1; min-width: 0; }
.quest-meta { display: flex; align-items: center; gap: 10px; margin-top: 6px; }

.type-badge {
  display: inline-flex; align-items: center; gap: 5px;
  font-size: 11px; font-weight: 700; letter-spacing: 1px; color: #888;
  background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.06);
  padding: 4px 8px; border-radius: 5px;
}
.streak-badge { display: inline-flex; align-items: center; gap: 5px; font-size: 12px; font-weight: 700; color: #e67e22; }
.progress-badge { display: inline-flex; align-items: center; gap: 4px; font-size: 12px; color: #888; }

.quest-title { font-size: 17px; font-weight: 600; color: #ddd; margin: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.quest-info { font-size: 12px; color: #555; margin-top: 4px; display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }
.quest-diff-label { font-size: 12px; color: #666; margin-top: 4px; letter-spacing: 1px; }
.diff-easy .quest-diff-label { color: #1e8449; }
.diff-med  .quest-diff-label { color: #b7770d; }
.diff-hard .quest-diff-label { color: #922b21; }

.quest-controls { display: flex; gap: 4px; flex-shrink: 0; padding-right: 4px; }
.btn-action {
  width: 44px; height: 44px;
  border: 1px solid transparent; border-radius: 10px;
  cursor: pointer; display: flex; align-items: center; justify-content: center;
  transition: all 0.15s;
}
.btn-complete { background: rgba(39,174,96,0.1); border-color: rgba(39,174,96,0.2); color: #27ae60; }
.btn-complete:hover { background: rgba(39,174,96,0.25); border-color: #27ae60; }
.btn-edit { background: rgba(52,152,219,0.08); border-color: rgba(52,152,219,0.15); color: #3498db; }
.btn-edit:hover { background: rgba(52,152,219,0.2); border-color: #3498db; }
.btn-fail { background: rgba(231,76,60,0.08); border-color: rgba(231,76,60,0.15); color: #e74c3c; }
.btn-fail:hover { background: rgba(231,76,60,0.2); border-color: #e74c3c; }
.btn-delete { background: rgba(255,255,255,0.03); border-color: rgba(255,255,255,0.06); color: #555; }
.btn-delete:hover { background: rgba(255,255,255,0.07); color: #888; }

.done-stamp { display: flex; align-items: center; gap: 4px; font-size: 8px; font-weight: 800; letter-spacing: 1.5px; color: #27ae60; padding-right: 8px; flex-shrink: 0; }
</style>
